import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography, Progress } from 'antd';
import * as styles from './attachment.module.scss';
import { fileReader, getPortions, log } from 'utils/helpers';
import { connect } from 'react-redux';
import { chunk } from 'lodash';
import { MrkClientServiceClient } from 'api';

const UploadFile = ({ file, setAttachment, token }) => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const uploadMrkAttachmentPortions = async (attachmentId, portion, count, array, name) => {
      try {
        const result = await MrkClientServiceClient.uploadMrkAttachmentPortions(token, attachmentId, portion + 1, array[portion].join());
        setPercent(Math.round((portion + 1) / array.length * 100));
        if (portion + 1 === array.length) return result;
        return uploadMrkAttachmentPortions(attachmentId, portion + 1, count, array, name);
      } catch (error) {
        log(error);
      }
    };

    const upload = async (file) => {
      setLoading(true);
      const readFile = await fileReader(file);
      const portions = getPortions(file.size, readFile);
      const id = await MrkClientServiceClient.createLoadableMrkAttachment(token, null, file.name, file.size, portions.count, null);
      const array = chunk(readFile, portions.portions);
      const result = await uploadMrkAttachmentPortions(id, 0, portions.portions, array, file.name);
      setLoading(false);
      setTimeout(() => setAttachment(result), 300);
    };
    if (file !== null && !loading) upload(file);
  }, []);

  return <div className={styles.wrapper}>
    <Icon type="file" theme="twoTone" />
    <div className={styles.info}>
      <Typography.Text ellipsis>{file.name}</Typography.Text>
      <Progress
        percent={percent}
        status={percent < 100 ? 'active' : 'success'}
      />
    </div>
  </div>;
};


UploadFile.propTypes = {
  file: PropTypes.object.isRequired,
  setAttachment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token
});

export default connect(mapStateToProps)(UploadFile);
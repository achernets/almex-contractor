import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon, Typography, Progress } from 'antd';
import * as styles from './attachment.module.scss';
import { fileReader, getPortions, log } from 'utils/helpers';
import { connect } from 'react-redux';
import { DOCUMENT } from 'constants/img';
import { MrkClientServiceClient } from 'api';

const UploadFile = ({ file, setAttachment, token }) => {
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const uploadMrkAttachmentPortions = async (attachmentId, current, count, size, readFile, name) => {
      try {
        const result = await MrkClientServiceClient.uploadMrkAttachmentPortions(token, attachmentId, current + 1, readFile.substr(current * size, size));
        setPercent(Math.round(((current + 1) * size) / readFile.length * 100));
        if (current + 1 === count) return result;
        return uploadMrkAttachmentPortions(attachmentId, current + 1, count, size, readFile, name);
      } catch (error) {
        log(error);
      }
    };

    const upload = async (file) => {
      setLoading(true);
      const readFile = await fileReader(file);
      const portions = getPortions(file.size, readFile);
      const id = await MrkClientServiceClient.createLoadableMrkAttachment(token, null, file.name, file.size, portions.count, null);
      const result = await uploadMrkAttachmentPortions(id, 0, portions.count, portions.portions, readFile, file.name);
      setLoading(false);
      setTimeout(() => setAttachment(result), 300);
    };
    if (file !== null && !loading) upload(file);
  }, []);

  return <div className={styles.attachment}>
    <Icon component={() =>
      <img src={DOCUMENT} alt={'DOCUMENT'} />
    } className={styles.img} />
    <div className={styles.information}>
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
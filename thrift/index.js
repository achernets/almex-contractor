const https = require('https');
const fs = require('fs');
//const replace = require('replace-in-file');
const exec = require('child_process').exec;
const concat = require('concat-files');
const initFile = 'Mrk-api.thrift';
const host = 'https://dev.almexecm.com:8443';
const mrkUrl = '/almex-mrk-server/';
const dir = 'thrift/';
const saveUrl = `${dir}files/`;

const download = (url, name) => {
  return new Promise(function (resolve, reject) {
    const file = fs.createWriteStream(`${saveUrl}${name}`);
    https.get(`${host}${url}${name}?t=${new Date().getTime()}`, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        resolve('ok');
      });
    }).on('error', function (err) {
      reject(err);
    });
  });
};

const execPromise = (command) => {
  return new Promise(function (resolve, reject) {
    exec(command, (error) => {
      if (error) reject(error);
      resolve('ok');
    });
  });
};

const generate = async () => {
  await download(mrkUrl, initFile);
  const files_api = fs.readFileSync(`${saveUrl}${initFile}`);
  const urls = {
    core: {
      url: mrkUrl,
      modules: files_api.toString().match(/"(\w*\s+'|:?)(.*?).thrift"/g).map(item => item.replace(/"/g, ''))
    }
  };

  const arrayUrls = Object.keys(urls).reduce((array, key) => {
    return urls[key].modules.map(item => Object.assign({
      url: urls[key].url,
      name: item
    }));
  }, []);

  await (Promise.all(arrayUrls.map(async (item) => {
    return await download(item.url, item.name);
  })));

  // await (replace({
  //   files: `${saveUrl}*.thrift`,
  //   from: new RegExp('../../|core/client-thrift/', 'g'),
  //   to: ''
  // }));

  await (Promise.all([[{ name: initFile }].concat(arrayUrls).map(async (item) => {
    try {
      return await execPromise(`thrift --gen js:es6 -o ${dir} ${saveUrl}${item.name}`);
    } catch (error) {
      console.log(error);
    }
  })]));
  const files = fs.readdirSync(`${dir}gen-js/`);
  concat([`${dir}lib/thrift.js`, ...files.map(item => `${dir}gen-js/${item}`)], 'public/lib/thrift-gen.js');
};

generate();

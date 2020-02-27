import * as forge from 'utils/forge.min';
import { MrkClientServiceClient } from 'api';
import { getToken } from 'utils/helpers';
import RSA_SIGN from 'jsrsasign';

const getCertificatFromFile = async (file = null, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const p12Asn1 = forge.asn1.fromDer(file);
      try {
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);
        let privateKeyP12Pem = null;
        let encryptedPrivateKeyP12Pem = null;
        let certP12Pem = null;
        let map = {};
        for (let sci = 0; sci < p12.safeContents.length; ++sci) {
          const safeContents = p12.safeContents[sci];
          for (let sbi = 0; sbi < safeContents.safeBags.length; ++sbi) {
            const safeBag = safeContents.safeBags[sbi];
            let localKeyId = null;
            if (safeBag.attributes.localKeyId) {
              localKeyId = forge.util.bytesToHex(safeBag.attributes.localKeyId[0]);
              if (!(localKeyId in map)) {
                map[localKeyId] = {
                  privateKey: null,
                  certChain: []
                };
              }
            } else {
              continue;
            }
            if (safeBag.type === forge.pki.oids.pkcs8ShroudedKeyBag) {
              map[localKeyId].privateKey = safeBag.key;
            } else if (safeBag.type === forge.pki.oids.certBag) {
              map[localKeyId].certChain.push(safeBag.cert);
            }
          }
        }
        for (let localKeyId in map) {
          const entry = map[localKeyId];
          if (entry.privateKey) {
            privateKeyP12Pem = forge.pki.privateKeyToPem(entry.privateKey);
            encryptedPrivateKeyP12Pem = forge.pki.encryptRsaPrivateKey(entry.privateKey, password);
          }
          if (entry.certChain.length > 0) {
            const certChain = entry.certChain;
            for (let i = 0; i < certChain.length; ++i) {
              certP12Pem = forge.pki.certificateToPem(certChain[i]);
            }
          }
        }
        resolve({
          privateKey: privateKeyP12Pem,
          encryptedPrivateKey: encryptedPrivateKeyP12Pem,
          publicKey: certP12Pem
        });
      } catch (error) {
        reject({ code: 'INVALID_PASSWORD' });
      }
    } catch (error) {
      reject({ code: 'FILE_NOT_SUPPORT' });
    }
  });

};

const singData = async ({ privateKey, publicKey }, signData, hash = null) => {
  try {
    let mdHex = signData;
    if (hash === null) {
      const md = new RSA_SIGN.crypto.MessageDigest({ alg: 'sha256', prov: 'cryptojs' });
      md.updateString(signData);
      mdHex = md.digest();
    }
    const sig = new RSA_SIGN.crypto.Signature({ 'alg': 'SHA256withRSA' });
    sig.init(privateKey);
    sig.updateString(mdHex);
    const sigValueHex = sig.sign();
    const timeStamp = await MrkClientServiceClient.getTimeStampToken(getToken(), mdHex);
    const param = {
      content: { str: sigValueHex },
      //certs: [publicKey],
      signerInfos: [{
        hashAlg: 'sha256',
        sAttr: {
          SigningTime: { 'str': timeStamp }
        },
        signerCert: publicKey,
        sigAlg: 'SHA256withRSA',
        signerPrvKey: privateKey
      }]
    };
    const sd = RSA_SIGN.asn1.cms.CMSUtil.newSignedData(param);
    return sd.getContentInfoEncodedHex();
  } catch (error) {
    throw new Error({ code: 'UNKNOWN_ERROR' });
  }
};

export {
  getCertificatFromFile,
  singData
};
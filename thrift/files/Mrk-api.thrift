include "ex.thrift"
include "filter.thrift"
include "common.thrift"
include "Kaz_DocumentService.thrift"
include "Kaz_types.thrift"
include "HB.thrift"

/** Открытое api системы AlmexECM mrk version mrk-1.0.1 */
namespace java com.devtech.mrk.thrift.gen

/** Версия продукта AlmexECM mrk */
const string MRK_CURRENT_VERSION = "mrk-1.0.1";

enum MrkContactType {
  EMAIL,
  PHONE
}

struct MrkContactInfo {
  1: optional string id;
  2: optional i64 createDate;
  3: MrkContactType cType;
  4: string cValue;
  5: bool verified;
}

struct MrkClient {
  1: optional string id;
  2: optional i64 createDate;
  3: optional i64 deleteDate;
  4: string login;
  5: string firstName;
  6: string lastName;
  7: string middleName;
  8: string position;
  9: list<MrkContactInfo> contacts;
  10: string inn;
  11: i64 birthDate;
  12: bool chief;
}

struct MrkOrganization {
  1: optional string id;
  2: optional i64 createDate;
  3: string name;
  4: string edrpo;
  5: string adress;
  6: string regAdress;
 }

struct MrkAccount {
  1: string id;
  2: list<MrkClient> clientList;
  3: MrkOrganization organization;
  4: bool confirmed;
  5: bool contragent;
  6: bool blocked;
  7: bool signed;
 }

struct MrkClientSession {
  1: string id;
  2: i64 createDate;
  3: MrkClient client;
  4: MrkOrganization organization;
}

struct MrkUser {
  1: optional string id;
  2: optional i64 createDate;
  3: optional i64 deleteDate;
  4: string login;
  5: string firstName;
  6: string lastName;
  7: string middleName;
}

struct MrkUserPage {
  1: list<MrkUser> users;
  2: i32 count;
}

struct MrkUserSession {
  1: string id;
  2: i64 createDate;
  3: MrkUser user;
}

enum MrkDocumentType {
  DRAFT,
  INPUT,
  OUTPUT
}

enum MrkDocResponceType {
  /* Необязательно */
  OPTIONAL_NEW,
  /** Обязательно требуется ответ в рамках текущего документа */
  REQUIRED_SAME,
  /** Обязательно требуется ответ в виде нового документа */
  REQUIRED_NEW,
  /** Запрещен */
  PROHIBITED
}

struct MrkDocument {
  1: optional string id;
  2: optional string extId;
  3: optional string extIteration;
  4: optional string accountId;
  5: string patternId;
  6: string patternName;
  7: string name;
  8: MrkDocumentType type;
  9: optional i64 createDate;
  10: optional string parentId;
  11: bool viewed;
  12: optional i64 sendDate;
  13: optional i64 receiveDate;
  14: optional string creatorId;
  15: optional string groupNumber;
  16: optional Kaz_DocumentService.SignInSystem signInSystem;
  17: optional string extCameFrom;
  18: optional string extNumber;
  19: optional string extAuthorName;
  20: optional string extAuthorEmail;
  21: optional string extRespExecId;
  22: optional string extRespPatternId;
  23: optional MrkDocResponceType extRespReq;
  24: bool hasAttachments;
  25: bool hasDigitalSign;
}

struct MrkDocumentPage {
  1: list<MrkDocument> documentData;
  2: i32 count;
}

struct MrkAttachment {
  1: optional string id;
  2: string fileName;
  3: optional MrkAccount account;
  4: optional MrkClient creator;
  5: optional i64 createDate;
  6: i64 fSize;
  7: optional string attHash;
  8: common.AttachmentStatus status;
  9: optional common.FileType fType;
  10: bool hasDigitalSign;
  11: optional list<MrkDigitalSign> digitalSigns;
}

/** Список подписей*/
struct MrkDigitalSign {
  1: optional string id;
  /** идентификатор документа */
  2: optional string documentId;
  /** идентификатор вложения */
  3: optional string attachmentId;
  4: optional string clientId;
  /** Детальная информация о подписях (пользователь, время, сертификат)*/
  5: optional list<MrkDigitalSignDetails> signDetails;
  6: optional string signature;
}

/** Детальная информация о подписи*/
struct MrkDigitalSignDetails {
   1: optional string id;
  /** Пользователь */
   2: optional string userName;
   /** информации о публичном сертификате пользователя */
   3: optional string serialNumber;
   4: optional string issuerDN;
   5: optional string subjectDN;
   6: optional i64 signDate;
   7: optional string signInSystem;
}

struct MrkDocumentData {
  1: MrkDocument document;
  2: list<Kaz_DocumentService.ContentItem> items;
  3: list<MrkAttachment> atts;
  4: optional MrkDigitalSign documentDigitalSign;
}

enum MrkHistoryKey {
  CLIENT_LOGIN,
  CLIENT_CREATED,
  ACCOUNT_CHANGED,
  ACCOUNT_CREATED,
  ORGANIZATION_CREATED,
  DOCUMENT_UPDATE,
  DOCUMENT_CREATE,
  DOCUMENT_VIEW,
  ATTACHMENT_CREATED,
  USER_REMOVED,
  USER_CHANGED
}

struct MrkHistory {
  1: string id;
  2: i64 createDate;
  3: string accountId;
  4: MrkHistoryKey key;
  5: string clientId;
  6: string userId;
  7: string documentId;
}

struct MrkAlmexSysUser {
  1: string login;
  2: bool confirmed;
  3: bool contragent;
}

struct MrkHistoryPage {
  1: list<MrkHistory> historyData;
  2: i32 count;
}

struct MrkAlmexSysUserPage {
  1: list<MrkAlmexSysUser> almexUsersData;
    2: i32 count;
}

service MrkClientService {
  /** Метод получение времени подписания ЭЦП */
  string getTimeStampToken(1: common.AuthTokenBase64 token, 2: string data) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  
  map<string, string> getInfo();
  map<string, string> getAllLanguages() throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkClientSession authMrkClient(1: string login; 2: string password, 3: string ip, 4: string langCode, 5: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkClientSession refreshMrkClientSession(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);MrkAccount registration(1:MrkClient cl, 2: string password, 3:MrkOrganization organization) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool changePassword(1: string token, 2: string oldPassword, 3: string password, 4: string confirmation) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkAccount getFullAccountInfo(1: string token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAccount changeAccountInfo(1: string token, 2:MrkAccount mrkAccount) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string getProfileInfoForSing(1: string token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool signProfile(1: common.AuthTokenBase64 token, 2: string signature, 3: string publicKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /*
  type - тип документа
  name - название
  groupNumber - получение цепочки(int)
  */
  MrkDocumentPage getMrkDocumentPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData markMrkDocumentAsRead(1: string token, 2: string documentId, 3: bool read) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData getMrkDocumentData(1: string token, 2: string documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData createOrUpdateMrkDocument(1: string token, 2: MrkDocumentData document) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string getDocumentInfoForSing(1: string token, 2: string documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData sendDocument(1: string token, 2: string documentId, 3: string signature, 4: map<string, string> attachmentSignature, 5: string publicKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkAttachment getMrkAttachmentById(1: string token, 2: string attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  list<MrkAttachment> getAllMrkAttachments(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkAttachments(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string createLoadableMrkAttachment(1: string token, 2: string mrkDocumentId, 3: string fileName, 4: i64 totalSize, 5: i32 countPortions, 6: string attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAttachment uploadMrkAttachmentPortions(1: string token, 2: string attachmentId, 3: i32 numberPortion, 4: binary fileContentBytes) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkHistoryPage getMrkUserHistoryPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<Kaz_DocumentService.DocumentPattern> getAllDocumentPatterns(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData prepareDraftDocument(1: string token, 2:common.ID docPatternId, 3:string documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
//  attachAs
//  create
//  sign
//  send
//requestConfirmation
  bool logout(1: string token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}

service MrkUserService {
  MrkUserSession authMrkUser(1: string login; 2: string password, 3: string ip, 4: string langCode, 5: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkUserPage getMrkUserPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkUser changeMrkUser(1: string token, 2: MrkUser toUpdate, 3: string password, 4:string idToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

//пока не надо
  list<MrkClient> getAllMrkClients(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkClients(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<MrkAccount> getAllMrkAccounts(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkAccounts(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAccount changeMrkAccount(1: string token, 2:MrkAccount toChange) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkAlmexSysUserPage getMrkAlmexSysUserPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
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
  2: MrkClient cl;
  3: MrkOrganization organization;
  4: bool confirmed;
  5: bool contragent;
  6: bool blocked;
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

struct MrkDocument {
  1: optional string id;
  2: optional string extId;
  3: optional string accountId;
  4: string patternId;
  5: string patternName;
  6: string name;
  7: MrkDocumentType type;
  8: optional i64 createDate;
  9: optional string parentId;
  10: bool viewed;
  11: optional i64 sendDate;
  12: optional i64 receiveDate;
  13: optional string creatorId;
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
}

struct MrkDocumentData {
  1: MrkDocument document;
  2: list<Kaz_DocumentService.ContentItem> items;
  3: list<MrkAttachment> atts;
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
  map<string, string> getInfo();
  map<string, string> getAllLanguages() throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkClientSession authMrkClient(1: string login; 2: string password, 3: string ip, 4: string langCode, 5: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkClientSession refreshMrkClientSession(1: common.AuthTokenBase64 token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);MrkAccount registration(1:MrkClient cl, 2: string password, 3:MrkOrganization organization) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool changePassword(1: string token, 2: string oldPassword, 3: string password, 4: string confirmation) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAccount convert(1: string token, 2: MrkOrganization organization) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);//из фил лица в юр лицо
  list<MrkClient> changeClientInfo(1: string token, 2:MrkClient cl, 3:MrkOrganization organization) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string getProfileInfoForSing(1: string token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool signProfile(1: common.AuthTokenBase64 token, 2: string signature, 3: string publicKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /*
  type - тип документа
  name - название
  */
  MrkDocumentPage getMrkDocumentPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData markMrkDocumentAsRead(1: string token, 2: string documentId, 3: bool read) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData getMrkDocumentData(1: string token, 2: string documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData createOrUpdateMrkDocument(1: string token, 2: MrkDocumentData document) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string getDocumentInfoForSing(1: string token, 2: string documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData sendDocument(1: string token, 2: string documentId, 3: string signature, 4: string publicKey) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkAttachment getMrkAttachmentById(1: string token, 2: string attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  list<MrkAttachment> getAllMrkAttachments(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkAttachments(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  string createLoadableMrkAttachment(1: string token, 2: string mrkDocumentId, 3: string fileName, 4: i64 totalSize, 5: i32 countPortions, 6: string attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAttachment uploadMrkAttachmentPortions(1: string token, 2: string attachmentId, 3: i32 numberPortion, 4: binary fileContentBytes) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkHistoryPage getMrkUserHistoryPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<Kaz_DocumentService.DocumentPattern> getAllDocumentPatterns(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkDocumentData prepareDocumentByPattern(1: string token, 2:common.ID docPatternId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
//  attachAs
//  create
//  sign
//  send
//requestConfirmation
  bool logout(1: string token) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}

service MrkUserService {
  MrkUserSession authMrkUser(1: string login; 2: string password, 3: string ip, 4: string langCode, 5: i32 cacheVersion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<MrkUser> getAllMrkUsers(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkUsers(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkUser changeMrkUser(1: string token, 2: MrkUser toUpdate, 3: string password, 4:string idToRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<MrkClient> getAllMrkClients(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkClients(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  list<MrkAccount> getAllMrkAccounts(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  i32 getCountAllMrkAccounts(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  MrkAccount changeMrkAccount(1: string token, 2:MrkAccount toChange) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  MrkAlmexSysUserPage getMrkAlmexSysUserPage(1: string token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
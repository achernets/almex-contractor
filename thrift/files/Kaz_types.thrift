include "common.thrift"

namespace java com.devtech.kaz.thrift.gen


/** Ключи настроек аккаунтов */
enum AccountDefineConf {
  /** группа по ВСЕ */
  GROUP_ALL,
  /** справочник по умолчанию */
  DECISION_DICT,
  /** А4 контент по умолчанию */
  A4_TEMPLATE_DICT
}

/** Аккаунт */
struct Account {
  /** Идентификатор аккаунта */
  1: optional common.ID id;
  /** Дата создания аккаунта */
  2: optional common.kazDate createDate;
  /** Название аккаунта */
  3: optional string accountName;
  /** основной аккаунт */
  4: bool main;
  /** признак секретности аккаунта */
  5: bool confidential;
  /** признак зашифрованности аккаунта в данный момент */
  6: bool encrypted;
  /** настройки аккаунта */
  7: optional map<AccountDefineConf, common.ID> accountCof;
  /** All file storages */
  8: optional list<FileStorage> storages;
  /** идентификатор группы */
  9: optional common.ID accountGroupId;
  /** Порядковый номер аккаунта */
  10: i32 orderNum;
  /** Признак внешнего модуля, только чтение */
  11: optional string extType;
  /** идентификатор сервиса авторизации */
  12: optional string authServiceId;
}

/** Группа аккаунтов */
struct AccountGroup {
  /** идентификатор */
  1: optional common.ID id;
  /** название */
  2: string oName;
  /** список аккаунтов */
  3: optional list<Account> accounts;
  /** признак заблокирован или нет */
  4: bool blocked;
  /** можно просматривать все аккауты группы или нет */
  5: bool visibleAllAccounts;
}

/** Вид отчета */
enum ReportType {
  XML,
  PDF,
  XLS,
  DOC
}

/** Тип использования отчета */
enum ReportTemplateType{
  /** Общий */
  COMMON,
  /** Прикрепленный к паттерну */
  PATTERN
}

/** Параметры шаблона отчета */
struct ReportParams {
    1: optional common.ID id;
   /** Уникальный ключ */
    2: optional string key;
    /** Данные шаблона */
    3: optional string value;
    /** Тип */
    4: i32 type;
    /** Флаг обязательности заполнения */
    5: bool requared;
    /** Название */
    6: optional string oName;
    /** идентификатор справочника */
    7: optional common.ID handbookId;
    8: optional string handbookLookupCol;
    9: optional string handbookSelectColumn;
}

/** Шаблон отчета */
struct ReportTemplate {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** Название */
  3: optional string reportName;
  /** Признак быстрой печати отчета, при этом параметры отчета запрещены! */
  4: optional bool fastPrint;
  /** Счетчик сколько раз вызывался отчет */
  5: common.count reportCount;
  /** Параметры */
  6: optional list<ReportParams> adParams;
  /** Группа */
  7: optional string group;
  /** Тип использования отчета */
  8: optional ReportTemplateType reportType;
  /** Аккаунты в которых отчет генерируется */
  9: optional set<common.ID> accountIds;
  /** Список разрешенных форматов отчета */
  10: set<ReportType> reportTypes;
  /** Добавить водяной знак */
  11: optional bool addWatermark;
}

/** Гриф секретности */
struct SecurityClassification {
  1: optional common.ID id;
  /** название */
  2: optional string gname;
  /** описание */
  3: optional string scDescription;
  /** группа */
  4: optional string group;
  /** флаг, разрешающий ознакамливать с документом */
  5: bool share;
  /** маска */
  6: optional string scMask;
}

/** Новость */
struct News {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания */
  2: optional common.kazDate createDate;
  /** Название */
  3: optional string theNewsName;
  /** Описание */
  4: optional string theNewsDescription;
  /** Список аккаунтов, к которым прикреплена новость */
  5: optional set<common.ID> accountIds;
  /** Ссылка предварительного просмотра */
  6: optional string previewUrl;
  /** Список ссылок ресурсов  */
  7: optional list<string> urls;
}

/** Тип файлового хранилища */
enum FileStorageType {
  /** главный */
  PRIMARY,
  /** архивный */
  ARCHIVE
}

/** Файловое хранилище документов */
struct FileStorage {
  /** Идентификатор */
  1: optional common.ID id;
  /** URI к хранилищу */
  2: optional string uri;
  /** Дата создания */
  3: optional common.kazDate createDate;
  /** Тип файлового хранилища */
  4: optional FileStorageType type;
  /** Приоритет */
  5: i32 priority;
  /** Разрешение на чтение/запись или только на чтение */
  6: bool readOnly;
  /** Описание */
  7: optional string descriptionFileStorage;
  /**Емкость*/
  8: i64 capacity;
  /**Доступный объем*/
  9: i64 freeSpace;
  /** Аккаунт */
  10: optional common.ID accountId;
  /** Признак, указывающий на разрешение редактирования хранилища */
  11: bool allowEdit;
}

/** Тип уведомления */
enum NotificationType {
  /** Совещание создано */
  MEETING_CREATE,
  /** Совещание изменено */
  MEETING_UPDATE,
  /** Совещание отменено */
  MEETING_CANCEL,
  /** Встреча перенесена */
  MEETING_SUGGESTION_OTHER_TIME,
  /** Приглашение на совещание секретарям */
  MEETING_INVITATION_SECRETARY,
  /** Начало этапа "Голосование за повестку" */
  MEETING_MOVE_TO_PRE_VOTE,
  /** Начало этапа "Подготовка решений" */
  MEETING_MOVE_TO_PREPARE,
  /** Начало совещания */
  MEETING_MOVE_TO_VOTE,
  /** Документ перешел на следующий этап */
  DOCUMENT_MOVE_TO_NEXT_STAGE,
  /** Периодическое уведомление о наличии карты исполнения*/
  DOCUMENT_PERIODICAL_REMINDER,
  /** Документ переназначен без контроля */
  DOCUMENT_REASSIGN,
  /** Документ переназначен с контролем */
  DOCUMENT_REASSIGN_WITH_CONTROL,
  /** Перепорученная карточка выполнения закрыта */
  REASSIGN_DOCUMENT_EXECUTION_CARD_CLOSED,
  /** Перепорученная карточка выполнения отозвана */
  REASSIGN_DOCUMENT_EXECUTION_CARD_REVOKED,
  /** Карточка выполнения закрыта */
  DOCUMENT_EXECUTION_CARD_CLOSED,
  /** Документ на контроле вернулся */
  DOCUMENT_ON_CONTROL_RETURNED,
  /** Документ просрочен */
  DOCUMENT_EXPIRED,
  /** Приближается конечный срок исполнения */
  DOCUMENT_DEADLINE_ONCOMING,
  /** Истек срок исполнения карточки */
  DOCUMENT_DEADLINE_OVERDUE,
  DOCUMENT_EXECUTION_DELETED,
  /** Сброс пароль */
  RESET_PASSWORD,
  /** Присвоение пароля новому пользователю */
  SET_PASSWORD_FOR_NEW_USER,
  /** Документ зарегистрирован(присвоен номер) */
  DOCUMENT_REGISTERED,
  /** Execution card was closed automatically  */
  DOCUMENT_EXECUTION_CARD_AUTO_CLOSED,
  DOCUMENT_DECISION,
  /** Familiarization of document */
  DOCUMENT_FAMILIARIZATION,
  /** Additional decision was made */
  DOCUMENT_ADDITIONAL_DECISION,
  /** Added additional decision executors */
  DOCUMENT_ADD_ADDITIONAL_CONFIRMER,
  /** Attachment load */
  DOCUMENT_ATTACHMENT_LOADED,
 /** Recovery password */
  RECOVERY_PASSWORD,
 /** Напоминание участнику документа*/
  DOCUMENT_EXECUTOR_REMINDER,
  /** Встреча создана */
  EVENT_CREATE,
  /** Встреча изменена */
  EVENT_UPDATE,
  /** Встреча отменена */
  EVENT_CANCEL,
  /**Регистрация пользователя c включенным LDAP сервером */
  REGISTRATION_LDAP_USER,
  /**уведомление о новой новости*/
  NEWS_CREATE,
  /** Приближение конечного срока сертификата */
  COMING_USER_CERTIFICATE_DEADLINE,
  /** Наступил конечный срока сертификата */
  USER_CERTIFICATE_DEADLINE,
  /** Сертификат удалён */
  USER_CERTIFICATE_DELETED,
  /** Электронно-цифровая подпись подтверждена */
  CERTIFICATE_APPROVED,
  /** Электронно-цифровая подпись отклонена */
  CERTIFICATE_DECLINED
}

/** Статус публичного ключа */
enum KeyState {
  /** загружен */
  LOADED,
  /** подтвержден */
  CONFIRM,
  /** не подтвержден*/
  PROHIBITED
  /** нет фыйла*/
  NO_FILE,
  /** */
  DELETED
}

/** Информация о сертификате */
struct CertificateInfo
{
  1: optional string serialNumber;
  2: optional string issuerDN;
  3: optional string subjectDN;
  4: optional common.kazDate signDate;
  5: optional common.kazDate beforeDate;
  6: optional common.kazDate afterDate;
  7: optional string signature;
}

/** Функции для поиска по содержимому документа */
enum SearchType {
    /** вхождение строки */
    S_LIKE,
    /** неполное вхождение строки */
    S_LIKE_SEMANTIC,
    /** вся строка */
    S_ALL,
    /** неполная вся строка */
    S_ALL_SEMANTIC,
    /** любое слово */
    S_ANY,
    /** неполное совпадение по любому слову */
    S_ANY_SEMANTIC
}

/** Тип действия при изменении исполнителей */
enum ExecutorActionType {
  /** добавить */
    ADD,
    /** удалить */
    DELETE
}
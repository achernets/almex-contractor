include "common.thrift"
include "ex.thrift"
include "HB.thrift"
include "filter.thrift"
include "calendar.thrift"
include "Kaz_types.thrift"

namespace java com.devtech.kaz.thrift.gen


/** Тип выполнения */
enum ExecutionType {
  /** Немедленно */
  ANY_IMMEDIATELY,
  /** Один из, ждать решения всех - доступно только тогда, когда Allowed for Executor = TRUE */
  ANY_WAIT_FOR_EXECUTORS,
  /** Все участники - доступно только тогда, когда Allowed for Executor = TRUE */
  ALL_EXECUTORS,
  /** Переход по стрелке осуществляется, если большинство исполнителей вынесло решение*/
  MOST_SET_DECISION
}

/** Требования к этапу шаблона документа*/
enum DocPatternStageRequirement {
  /* Необязательно */
  OPTIONAL,
  /** Обязательно требуется */
  REQUIRED,
  /** Обязательно не требуется */
  PROHIBITED
}

/** Правила доступа к объекту */
struct AccessRule {
  /** Доступность автору */
  1: bool forAuthor;
  /** Доступность ответственному */
  2: bool forResponsible;
  /** Доступность исполнителям */
  3: bool forExecutors;

  /** Доступность конкретному пользователю или группе */
  4: bool forUserOrGroup;
  /** Доступность по роли */
  5: bool forRole;
  /** Перечень людей для которых переход доступен, работает в паре с forUserOrGroup */
  6: optional list<common.UserOrGroup> allowList;
  /** Перечень ролей для которых переход доступен, работает в паре с forRole */
  7: optional set<string> allowRole;
  /** Доступность всем кто видит документ */
  8: bool forAllDocView;
}

/** Действие которое необходимо выполнить при переходе на след этап с вложениями */
enum AttachmentAction {
  /** Publish all attachments in status as draft. */
  PUBLISH_DRAFT,
  /** Do nothing with attachments in status as draft. */
  IGNORE_DRAFT,
  /** Delete all attachments in status as draft. */
  DELETE_DRAFT
  /** Fixate attachments in status as draft without autoreplacement, and create new version */
  FIXATE_DRAFT
}

enum CloseWindowType {
  CLOSE,
  NOT_CLOSE,
  NOT_CLOSE_UPDATE
}

/** Связи этапов шаблонов документов */
struct DocumentPatternStagesLink {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор родителя этапа */
  2: optional common.ID parentStageId;
  /** Идентификатор потомка этапа */
  3: optional common.ID childStageId;
  /** Название связи */
  4: optional string nameDocPatStageLink;
  /** Описание связи этапов */
  5: optional string descriptionDocPatStageLink;
  /** Решение по документу, в случае которого следующий этап будет определяться данной связью */
  6: optional string decision;
  /** Информация для графического отображения */
  7: optional string graphicalParams;
  /** Тип перехода */
  8: optional ExecutionType execType;
  /** Приоритет перехода */
  9: i32 movePriority;
  /** Пользователи или группы, которых необходимо проинформировать при переходе */
  10: optional list<common.UserOrGroup> informUsers;
  /** Настройки доступности ссылки */
  11: optional AccessRule accessRule;
  /** Признак отображения действия конкретному пользователю */
  12: bool allowForCurUser;
  /** Использовать по умолчанию */
  13: bool useByDefault;
  /** Признак обязательна ли резолюции */
  14: optional DocPatternStageRequirement resolution;
  /** Признак обязательна ли подпись*/
  15: optional DocPatternStageRequirement signature;
  /** Признак автоматического выполнения*/
  16: bool autoExecute;
  /**Интервал времени Jira Time*/
  17: optional string jiraPeriod;
  /**Комментарий*/
  18: optional string comment;
  /** Разрешить повторную резолюцию */
  19: bool allowRepeatDecision;
  /** attachment action */
  20: optional AttachmentAction attachmentAction;
  /** Упорядочить линки */
  21: i32 orderLink;
  /** Идентификатор скрипта */
  22: optional common.CompositeId preFunctionId;
  /** Свойства линки (23) "закрывать окно при переходе" (Закрывать / Не закрывать / Не закрывать и обновлять)
  * при выборе опции "не закрывать и обновлять" становится доступной еще одна опция
    Интервал обновления (24)
    Принимает значение в секундах, минутах, часах.
  **/
  23: optional CloseWindowType closeWindowType;
  24: optional i32 updateWindowInterval;
  /** Повторный принудительный запуск конвертации вложений */
  25: bool attachmentForceConver;
  /** Вкладка с контентом*/
  26: optional ContentHolder contentHolder;
  /** Признак обязательно ли вложение*/
  27: optional DocPatternStageRequirement attachmentRequirement;
}

/** Доступное действие по документу*/
struct StageLinkAction {
  /** Тип */
  1: optional common.UserOrGroupType type;
  /** Идентификатор */
  2: optional common.ID userOrGroupId;
  /** Идентификатор карточки в рамках которой выполняется решение */
  3: optional common.ID execId;
  /** Доп согласование */
  4: bool additionConfirmation;
  /** Отмена решения */
  5: bool cancelDecision;
  /** Переход */
  6: optional DocumentPatternStagesLink link;
  /** по передаче дел */
  7: bool transfer;
}

/** Список разрешения для документа */
struct DocPermissions {
  /** Группированный список действий по документу */
  1: optional list<StageLinkAction> actions;
  /** онлайн редактирование */
  2: bool onlineEdit;
  /** онлайн комментирование */
  3: bool onlineComment;
  /** редактирование документа */
  4: bool editDoc;
  /** добавление вложения */
  5: bool attachmentAdd;
  /** удаление вложения */
  6: bool attachmentDelete;
  /** изменение контента */
  7: bool changeContent;
  /** добавление исполнителей */
  8: bool addExecutors;
  /** добавление согласующих */
  9: bool allowAdditionalConf;
  /** разрешение на переназначение */
  10: bool allowReassign;
  /** генерация номера*/
  11: bool generateNumber;
  /** ознакомление */
  12: bool shareDocument;
  /** отзывать ознакомление */
  13: bool shareDocumentRevoke;
  /** изменять ответственных */
  14: bool updateResponsible;
  /** изменять грифы */
  15: bool updateSC;
  /** повторять действие */
  16: bool allowRepeatReassign;
  /** ошибки валидации документа*/
  17: optional list<ex.PreconditionException> exList;
  /** Подпись вложения */
  18: bool attachmentSign;
}

/** Типы доступа к документу */
enum DocumentAccessPolicyType {
  ACCESS,
  REGISTRY,
  BY_ROLE,
  EXTERNAL
}

/** Доступ к документу */
struct DocumentAccessPolicy {
  1:DocumentAccessPolicyType type;
  2:common.ID policyId;
}

 /** Тип иконки статуса документа */
enum DocumentIconType {
  ICON_DRAFT,
  ICON_COMPLETE_CANCEL,
  ICON_COMPLETE_EDITED,
  ICON_COMPLETE,
  ICON_IN_WORK_NO_MY_CANCEL,
  ICON_IN_WORK_NO_MY_EDITED,
  ICON_IN_WORK_NO_MY,
  ICON_IN_WORK_EDITED,
  ICON_IN_WORK_CANCELED,
  ICON_IN_WORK,
  ICON_IN_WORK_WARNING_EDITED,
  ICON_IN_WORK_WARNING_CANCELED,
  ICON_IN_WORK_WARNING,
  ICON_IN_WORK_ERROR_EDITED,
  ICON_IN_WORK_ERROR_CANCELED,
  ICON_IN_WORK_ERROR,
  ICON_ARCHIVE,
  ICON_ERROR
}

/** Группа шаблонов документов */
struct DocumentPatternGroup {
  /** Идентификатор */
  1: optional common.ID id;
  /** Название */
  2: optional string nameDocPatGroup;
  /** Описание */
  3: optional string descriptionDocPatGroup;
  /** Категория*/
  4: optional string category;
  /**Разрешение на работу с грифами*/
  5: bool enableWorkWithSC;
  /** порядковый номер */
  6: i32 order;
}

/** Тип паттерна */
enum PatternType {
  /** Документ */
  DOCUMENT,
  /** Совещание */
  DISCUSSION_FLOW,
  /** Вопрос совещания */
  DISCUSSION_QUESTION,
  /** Протокол совещания */
  DISCUSSION_PROTOCOL
}

/** Строка из справочника */
struct ContentItemHBValue {
  /** Строка */
    1: optional HB.HBRow row;
    /** Колонка */
    2: optional HB.HBColumn column;
    /**Оригинальная колонка */
    3: optional HB.HBColumn originalColumn;
}

/** Значение контента */
struct ContentItemValue {
  /** значение контента*/
  1: optional string strValue;
  /** Ссылка на справочное значение */
  2: optional ContentItemHBValue hbValue;
  /** значение_2 контента  */
  3: optional string strValue2
}

/** Тип показа коллекции контента */
enum ContentItemShowType {
  /**  В кратких сведениях */
  SHORT,
  /** в полных сведениях  */
  FULL,
  /** в полных и кратких */
  ALL
}

/** Место показа коллекции контента */
enum ContentItemShowPlace {
  /** Сведения */
  INFO,
  /** Вкладка */
  TAB,
  /** Содержание  */
  CONTENT
}

/** Представление в виде таблицы или в режиме повторяющихся полос с элементами */
enum ContentTableViewMode {
  TABLE,
  BAND
}

/** Режим выбора элементов: без выбора, единичный и множественный выбор */
enum ContentTableSelectMode {
  NONE,
  SELECT,
  MULTISELECT
}

/** Описание таблицного контента */
struct ContentTableDefinition {
  /** Идентификатор */
  1: common.ID id;
  /** Тип отображения */
  2: ContentTableViewMode viewMode;
  /** Режим выбора элементов: без выбора, единичный и множественный выбор */
  3: ContentTableSelectMode selectMode;
  /** Высота */
  4: optional string height;
  /** Высота строки */
  5: optional string rowHeight;
  /** Описание колонок */
  6: optional list<ContentItem> columnDefenition;
}

/** Тип контента */
enum ContentItemType {
    TEXT_FIELD,
    COMBO_BOX,
    USER_CHOICE,
    CALENDAR,
    TABLE,
    SEPARATOR,
    MULTILINE_TEXT_FIELD,
    MARK,
    CHECKBOX,
    SWITCH_ITEM,
    HTTP_LINK,
    CALENDAR_RANGE,
    CONTAINER,
    HAND_BOOK,
    ORG_STRUCTURE,
    ATTACHMENT
}

/** Элемент коллекции контента */
struct ContentItem {
  /** Уникальный ключ */
  1: optional string id;
  /** Название */
  2: optional string oName;
  /** Данные контента */
  3: optional ContentItemValue value;
  /** Тип */
  4: ContentItemType type;
  /** Флаг поиска по контенту */
  5: bool search;
  /** Флаг обязательности заполнения */
  6: bool requared; //в линку
  /** Признак только чтение */
  7: bool readOnly;//в линку
  /** Порядковый номер */
  8: i32 order;//в линку
  /** Описание */
  9: optional string descriptionContItem;
  /** Тип показа коллекции контента */
  10: optional ContentItemShowType showType;
  /** Tab identifier */
  11: optional common.ID tabId;//убрать
  /** Уникальный ключ */
  12: optional string key;
  /** Место показа коллекции контента */
  13: optional ContentItemShowPlace showPlace;// в линки
  /** Копировать значение из справочника */
  14: optional bool copyValue;
  /** обязательно заполнять, если есть справочник */
  15: optional common.ID handBookId;
  /** Пользователи(если тип USER_CHOOSER) */
  16: optional list<common.UserOrGroup> users;
  /** Описание табличного представления, для типа ТАБЛИЦА*/
  17: optional ContentTableDefinition tableDefenition;
  /** Ключ таблицы(заполняется в случае если item расположен внутри табличного) */
  18: optional string tableKey;
  /** Номер строки(заполняется в случае если item расположен внутри табличного) */
  19: optional i32 rowNumber;
  /** Список дочених контентов(заполняется в случае если item - табличный) */
  20: optional list<ContentItem> childItems;
  /** Список разрешенных к выбору пользователей (если тип USER_CHOOSER) */
  21: optional list<common.UserOrGroup> availableUsers;
  /** Маска regExp выражения */
  22: optional string tMask;

  /** вид через модальное окно или выпадающий список */
  23: optional bool listView;
  24: optional bool visible;//в линку
  25: optional string visibleScript;//в линку
  26: optional string readonlyScript;//в линку
  27: optional string onChangeScript;//в линку
  /** Доступные варианты выбора */
  28: optional list<string> fields;
  /** Дополнительные атрибуты */
  29: optional string attributes;
  /** Описание маски regExp*/
  30: optional string tMaskDesc
    /** Отображаемое наименование обьекта, который содержится в контенте (имя файла, департамента, и т.д.)*/
  31: optional string displayedName

  /** Департамент (если тип ORG_STRUCTURE) */
  32: optional common.Department department;
  /** Вложение (если тип ATTACHMENT) */
  33: optional Attachment attachment;
  /** Быстрое наполнение */
  34: optional bool quickFill;
  /** Только активные пользователи (если тип USER_CHOOSER, для выбора доступны только активные пользователи)*/
  35: optional bool onlyActiveUser;
  /** Максимальное количество пользователей (если тип USER_CHOOSER)*/
  36: optional i32 maxUserCount;
}

struct SimpleDocumentPatternOrGroup {
    /** Идентификатор */
    1: optional common.ID id,
    /** Название группы или шаблона */
    2: optional string oName,
    /** Описание группы или шаблона */
    3: optional string oDescription,
    /** id-ки групп или шаблонов */
    4: optional list<common.ID> ids,
    /** Порядковый номер */
    5: optional i32 order;
}

/** Номенклатурный номер*/
struct NomenclatureNumber {
  /** Идентификатор */
  1: common.ID id;
  /** Наименование*/
  2: string oName;
  /** Шаблон для генерации номера документа (MMM-$num(0...999999)/yyyy) */
  3: string numberPattern;
  /** Текущий номер счетчика*/
  4: optional i64 currentSequenceValue;
  /** Идентификатор аккаунта, к которому привязан номенклатурный номер. Если не указывать, номенклатурный номер привяжется в целом к аккаунт группе*/
  5: optional common.ID accountId;
  /** Заполняется только при getById запросе */
  6: optional Kaz_types.Account account;
  /** Номенклатурная группа */
  7: optional NomenclatureGroup nomenclatureGroup;
}

/** Номенклатурная группа*/
struct NomenclatureGroup {
  /** Идентификатор */
  1: common.ID id;
  /** Наименование*/
  2: string oName;
  /** Код*/
  3: string code;
  /** Срок хранения (в формате jira)*/
  4: optional string storageTerm;
  /** №№ статей*/
  5: optional string articleNumber;
  /** Примечание */
  6: optional string remark;
  /** Список номенклатурных номеров доступных пользователю*/
  7: list<NomenclatureNumber> nomenclatureNumbers;
}

/** Шаблон документа */
struct DocumentPattern {
  /** Идентификатор */
  1: optional common.ID id;
  /** Название шаблона документа */
  2: optional string nameDocPattern;
  /** Описание шаблона документа */
  3: optional string descriptionDocPattern;
  /** Идентификатор создателя */
  4: optional common.ID creatorId;
  /** Идентификатор модификатора */
  5: optional common.ID modifierId;
  /** Дата создания шаблона документа */
  6: optional common.kazDate createDate;
  /** Дата изменения шаблона документа */
  7: optional common.kazDate modifiedDate;
  /** Дата помечания шаблона документа на удаление */
  8: optional common.kazDate deleteDate;
  /** Контент */
  9: optional list<ContentItem> content;
  /** Валидный/невалидный DocumentPattern */
  10: bool isValidState;
  /** Номенклатурный номер */
  11: optional NomenclatureNumber nomenclatureNumber;
  /** Document pattern group */
  12: optional DocumentPatternGroup documentPatternGroup;
  /* Маска для грифа секретности*/
  13: optional string scMask;
  /* Контрольный срок */
  14: optional string controlDate;
  /** Разрешение на использование грифов */
  15: bool useSC;
  /** Признак устанавливать номер документа при создании */
  16: bool useDocNumber;
  /** Нужно генерировать pdf из вложений или нет */
  17: bool needGeneratePdf;
  /** порядковый номер */
  18: i32 order;
  /** Начальный номер документа */
  19: i64 startDocNumber;
  /** Текущий номер документа*/
  20: i64 currentDocNumber; //todo можно удалить!
  /** Pattern account */
  21: optional Kaz_types.Account account;
  /** скрывать в дереве исполнения автоматический этапы */
  22: bool hideAuto;
  /** скрывать в дереве исполнения этапы внешних модулей */
  23: bool hideExt;
  /** паттерн совещания */
  24: optional DocumentPattern meetingPattern;
  /** тип паттерна*/
  25: PatternType patternType;
  /** Формировать краткое содержание документа из полей*/
  26: bool autoGenerateDocName;
  /** Шаблон краткого содержания документа*/
  27: optional string docNamePattern;
}


struct FreezeDocumentPattern {
  /** Идентификатор */
  1: optional common.ID id;
  /** Название шаблона документа */
  2: optional string nameDocPattern;
  /** Описание шаблона документа */
  3: optional string descriptionDocPattern;
  /** Идентификатор создателя */
  4: optional common.ID creatorId;
  /** Идентификатор модификатора */
  5: optional common.ID modifierId;
  /** Дата создания шаблона документа */
  6: optional common.kazDate createDate;
  /** Дата изменения шаблона документа */
  7: optional common.kazDate modifiedDate;
  /** Дата помечения шаблона документа на удаление */
  8: optional common.kazDate deleteDate;
  /** Валидный/невалидный DocumentPattern */
  9: bool isValidState;
  /** Шаблон для генерации номера документа (MMM-$num(0...999999)/yyyy) */
  10: optional string docNumberPattern;
  /** Document pattern group */
  11: optional DocumentPatternGroup documentPatternGroup;
  /* Маска для грифа секретности*/
  12: optional string scMask;
  /* Контрольный срок */
  13: optional string controlDate;
  /** Разрешение на использование грифов */
  14: bool useSC;
  /** Признак устанавливать номер документа при создании */
  15: bool useDocNumber;
  /** Нужно генерировать pdf из вложений или нет */
  16: bool needGeneratePdf;
  /** Начальный номер документа */
  17: i64 startDocNumber;
  /** Текущий номер документа*/
  18: i64 currentDocNumber;
  /** Pattern account */
  19: optional Kaz_types.Account account;
  /** Идентификатор шаьлона*/
  20: optional common.ID originalPatternId;
  /** Идентификатор документа*/
  21: optional common.ID docId;
  /** скрывать в дереве исполнения автоматический этапы */
  22: bool hideAuto;
  /** скрывать в дереве исполнения этапы внешних модулей */
  23: bool hideExt;
  /** паттерн совещания */
  24: optional DocumentPattern meetingPattern;
  /** совещание */
  25: optional calendar.Meeting meeting;
  /** тип паттерна*/
  26: optional PatternType patternType;
  /** Формировать краткое содержание документа из полей*/
  32: bool autoGenerateDocName;
  /** Шаблон краткого содержания документа*/
  33: optional string docNamePattern;
}

enum VisibilityOfBookmarks {
   SHOW,
   NOT_SHOW,
   EDITING
}


/** Статус этапа шаблона документа */
enum DocPatternStageStatus {
  /** Создан */
  CREATED,
  /** В работе */
  IN_PROGRESS,
  /** Закрыт */
  CLOSED,
  /** В архиве */
  ARCHIVE
}

/** Подстатус этапа шаблона документа */
enum DocPatternStageSubStatus {
  /** Черновик */
  DRAFT,
  /** Проект */
  PROJECT,
  /** На согласовании */
  CONFIRM,
  /** На подписании */
  SIGN,
  /** В работе */
  IN_WORK,
  /** На исполнении */
  IN_EXECUTION,
  /** Закрыт */
  CLOSED,
  /** Действует */
  ACTING,
  /** Отменен */
  CANCELED,
  /** Архив */
  ARCHIVE,
  /** Регистрация */
  REGISTRATION,
  /** На доработке*/
  ON_REVISION,
  /**Изменение*/
  EDITED
}

/** Очередность создания карт */
enum DocPatternStageExecPriority {
  /** Параллельное */
  PARALLEL,
  /** Последовательное */
  SERIES
}

/** Тип действия для этапа шаблона документа */
enum DocPatternStageActionType {
  /** Ознакомление */
  VIEW,
  /** Подтверждение (согласование) */
  CONFIRM,
  /** Подписание */
  SIGN,
  /** Выполнение */
  PERFORM
}


/** Признак входящего/исходящего этапа */
enum DispatchState {
  /** для входящих */
  INBOX,
  /** для исходящих */
  OUTBOX
}

/**
 Типы параметров
**/
enum StageParamType {
  STRING,
  PATTERN,
  REPORT,
  COMBOBOX,
  CHECKBOX,
  SCRIPT,
  DATETIME,
  JIRATIME,
  PATTERN_TO_USER
}

/** Пара паттерн - пользователь*/
struct PatternToUser {
    /** Паттерн*/
    1: DocumentPattern docPattern;
    /** Пользователь/группа/процессная роль*/
    2: common.UserOrGroup userOrgroup;
}

/** Параметры этапа */
struct StageParam {
  /* Ключ */
  1: optional string key;
  /* Значение */
  2: optional list<string> value;
  /* Тип */
  3: optional StageParamType type;
  /* Название, отображаемое пользователю */
  4: optional list<string> oName;
  /** Разрешает множественный выбор */
  5: bool multi;
  /** Не сохранять, заполнять на конвертере, для comboBox */
  6: optional list<string> inValues;
  /** Идентификатор скрипта */
  7: optional common.CompositeId scriptId;
  /** Признак обязательный параметр или нет */
  8: bool req;
  /** Название параметра */
  9: optional string displayName;
  /** авторы подпроцессов (если этап MUX)*/
  10: optional list<PatternToUser> subProcessAuthors;
}

/** Этап шаблона документа */
struct DocumentPatternStage {
  /** Идентификатор */
  1: optional common.ID id;
  /** Идентификатор шаблона документа */
  2: optional common.ID documentPatternId;
  /** Название шаблона документа */
  3: optional string nameDocPatStage;
  /** Описание шаблона документа */
  4: optional string descriptionDocPatStage;
  /** Статус этапа шаблона документа */
  5: optional DocPatternStageStatus status;
  /** Подстатус этапа шаблона документа */
  6: optional DocPatternStageSubStatus subStatus;
  /** Тип действия для этапа шаблона документа */
  7: optional DocPatternStageActionType actionType;
  /** Указывает можно ли пропустить этап */
  8: bool stageReq;
  /** Указывает максимальное время этого этапа */
  9: optional string deadLine;
  /** Информация для графического отображения */
  10: optional string graphicalParams;
  /** Возможный этап формирования */
  11: optional common.ID availablePatternStageId;
  /** По какому решению документ перешел на данный этап (для фронтов) */
  12: optional string movedByDecision;
  /** Указывает зарегистрирован ли документ */
  13: bool registerDocument;
  /** Очередность создания карт исполнения */
  14: optional DocPatternStageExecPriority execPriority;
  /** Этап для входящих или исходящих док-тов */
  15: optional DispatchState dispatchState;
  /** Признак скрывания этапа */
  16: bool hide;
  /** Исполнители этапа*/
  17: optional list<common.UserOrGroup> userOrGroups;
  /**Разрешение на дополнительное согласование*/
  18: bool allowAdditionalConf;
  /** Признак периодического выполнения */
  19: bool runPerriodicall;
  /**Дата начала выполнения периодического этапа*/
  20: optional common.kazDate startPeriod;
  /**Период выполнения*/
  21: optional string nextStartPeriod;
  /**Конечная дата периодического выполнения(Jira формат)*/
  22: optional string periodicJiraEndDate;
  /** Конечная дата периодического выполнения */
  23: optional common.kazDate periodicEndDate;
  /** доступность онлайн редактирования этапа */
  24: optional AccessRule onlineEditRule;
  /** доступность онлайн комментирования этапа */
  25: optional AccessRule onlineCommentRule;
  /** Разрешение на изменение этапа при создании документа */
  26: bool changeOnDraft;
  /** Разрешение на изменение этапа при редактировании документа */
  27: optional AccessRule changeOnEdit;
  /** Разрешение на изменение этапа при создании документа */
  28: optional AccessRule changeOnSetDecision;
  /** Доступность редактирования этапа */
  29: optional AccessRule editDocRule;
  /** Доступность добавления вложений */
  30: optional AccessRule attachmentAddRule;
  /** Доступность удаления вложений */
  31: optional AccessRule attachmentDeleteRule;
  /** Доступность изменения контента */
  32: optional AccessRule changeContentRule;
  /** Рассчитываемое поле - можно редактировать */
  33: bool canEdit;
  /** Максимальное количество участников на этапе подписания */
  34: i32 maxSigner;
  /** Параметры вызова внешнего модуля */
  35: optional list<StageParam> stageParams;
  /** Доступные решения */
  36: optional set<string> availableDecisions;

  /** Форма просмотра */
  37: optional string fmEditKey;
  /** По умолчанию/Пользовательская */
  38: optional bool fmEditPersonal;
  /** Закрывать форму при переводе на следующий этап */
  39: optional bool fmEditClose;

  /** Форма редактирования */
  40: optional string fmViewKey;
  41: optional bool fmViewPersonal;
  42: optional bool fmViewClose;

  /** Идентификатор pre скрипта*/
  43: optional common.CompositeId preFunctionId;
  /** Идентификатор post скрипта*/
  44: optional common.CompositeId postFunctionId;

  /** видимость закладок */
  45: optional VisibilityOfBookmarks showDocDetails;
  46: optional VisibilityOfBookmarks showChat;
  47: optional VisibilityOfBookmarks showHistory;
  48: optional VisibilityOfBookmarks showAttachments;
  /** Включение уведомления при переходе на этап  */
  49: bool notifMoveOnEnabled;
  /** Канал уведомления при переходе на этап  */
  50: optional string notifMoveOnChanel;
  /** Включение уведомления периодического */
  51: bool notifPeriodicalEnabled;
  /** Период отправки периодического уведомления */
  52: optional string notifPeriodicalJira;
  /** Канал отправки периодического уведомления */
  53: optional string notifPeriodicalChanel;
  /** Включение уведомления о приближении срока исполнения */
  54: bool notifCheckDeadlineEnabled;
  /** Период уведомления о приближении срока исполнения */
  55: optional string notifCheckDeadlineJira;
  /** Канал уведомления о приближении срока исполнения */
  56: optional string notifCheckDeadlineChanel;
  /** Включение уведомления при нарушении срока исполнения */
  57: bool notifCardExpiredEnabled;
  /** Канал уведомления при нарушении срока исполнения */
  58: optional string notifCardExpiredChanel;
  /** Порядковый номер */
  59: i32 orderNum;
  /** Время до закрытия каждой карточки созданной в рамках периодичного выполнения, Jira формат */
  60: optional string cardActivityPeriod;
  /** Список контейнеров контентов*/
  61: optional list<ContentHolderShowPlace> stageContentHolders;
  /** Доступность подписи вложений */
  62: optional AccessRule signAttachmentRule;
}

struct DesicionInfo {
  1:DocumentPatternStage freezeStage;
  2:list<ContentHolderShowPlace> holderShowPlace;
}

/** Тип владельца карточки */
enum DocumentExecutionOwnerType {
  /** Автор документа */
  AUTHOR,
  /** Ответственный за документ */
  RESPONSIBLE,
  /** Исполнитель */
  EXECUTOR,
  /** Исполнитель этапа ознакомления (inform) */
  VIEWER,
  /** Наблюдатель */
  SPECTATOR,
  /* Системный пользователь */
  SYSTEM,
  /* Согласователь */
  ADDITIONAL_CONFIRMER,
  /** Отключенная периодическая */
  PERIODICAL_DISABLE
}

/**Типы комментариев*/
enum CommentType {
  /**Комментарий сделан при вынесении решения*/
  DECISION,
  /**Простое комментирование*/
  COMMENT,
  /**Комментарий сделан при связывании документа*/
  LINK,
  /**Комментарий сделан при смене подстатуса документа*/
  CHANGE_SUB_STATUS
}

/** Комментарий к документу */
struct DocumentComment {
  /** Идентификатор комментария */
  1: optional common.ID id;
  /** Идентификатор создателя */
  2: optional common.ID creatorId;
  /* Attachment creator */
  3: optional common.UserOrGroup creator;
  /** Дата создания комментария */
  4: optional common.kazDate createDate;
  /** Комментарий */
  5: optional string comment;
  /** Идентификатор документа */
  6: optional common.ID documentId;
  /** Идентификатор карточки */
  7: optional common.ID executionId;
  /**Идентификатор нового комментария*/
  8: optional common.ID theNewCommentId;
  /**Идентификатор старого комментария*/
  9: optional common.ID oldCommentId;
  /**Идентификатор родительского комментария*/
  10: optional common.ID parentId;
  /**Идентификатор изменения статуса документа*/
  11: optional common.ID docSubStatusHistId;
  /**Тип комментария*/
  12: optional CommentType commentType;
  /**Дата корневого комментария*/
  13: optional common.kazDate rootCreateDate;
  /**Идентификатор создателя корневого комментария*/
  14: optional common.ID rootCreatorId;
  /** Создатель корневого комментария */
  15: optional common.UserOrGroup rootCreator;
  /**Пользователь делегат*/
  16: optional common.UserOrGroup originalUser;
  /**Пользователь, изменивший комментарий*/
  17: optional common.UserOrGroup modifierUser;
  /**Дата изменения комментария*/
  18: optional common.kazDate modifiedDate;
}

/** Тип контроля перепоручения */
enum ExecutionReassignType{
  /** Закрыть мою карточку при любом решении */
  ANY,
  /** Я контролирую решение */
  CONTROL,
  /** Закрыть мою карточку после выполнения всех перепоручений */
  ALL,
  /** Закрыть мою карточку при одинаковом результате всех  перепоручений */
  ALL_EQUAL,
  /** Полученный от группы */
  GROUP,
  /** Первый, кто выносит решение, закрывает групповую карточку. */
  GROUP_ONE_ENOUGH
}

/** Информация по делегатам*/
struct DocumentExecutionDelegateInfo {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания*/
  2: optional common.kazDate createDate;
  /** Идентификатор карточки */
  3: optional common.ID documentExecutionId;
  /**Внутренняя итерация карточки*/
  4: i32 internalActionIteration;
  /**Идентификатор реального пользователя*/
  5: optional common.ID originalUserId;
}

/** Статус исполнителя */
enum DocumentExecutionStatus {
    /* If the user can make a decision */
    OPEN,
    /** User made a decision */
    CLOSED,
    /** User made addition decision */
    CLOSED_ADDITIONAL,
    /** Closed without decision. e.g. ExecutionType#ANY_IMMEDIATELY is selected on the link. */
    FORCED_CLOSURE,
    /** Auto closed */
    AUTO_CLOSED,
    /** Revoked by someone */
    REVOKED,
    /** Removed by someone **/
    REMOVED,
    /** По умолчанию */
    NONE,
    /** Отключена */
    DISABLED,
    /** Удалена, но в ходе исполнения остается */
    SOFT_REMOVED
}

/** Карточка выполнения документа */
struct DocumentExecution {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания карточки документа */
  2: optional common.kazDate createDate;
  /** Дата удаления карточки документа */
  3: optional common.kazDate deleteDate;
  /** Идентификатор родительской карточки */
  4: optional common.ID parentId;
  /** Последовательность идентификаторов начиная от родительского первого уровня */
  5: optional string path;
  /** Идентификатор документа */
  6: optional common.ID documentId;
  /** Идентификатор этапа шаблона документа */
  7: optional common.ID stageId;
  /** Итерация */
  8: i32 iteration;
  /** Идентификатор пользователя */
  9: optional common.UserOrGroup userOGroup;
  /** Тип контроля перепоручения */
  10: optional ExecutionReassignType reassignType;
  /** Срок действия карточки документа */
  11: optional common.kazDate deadlineDateTime;
  /** Дата выполнения карточки документа */
  12: optional common.kazDate executionDateTime;
  /** Дата перепоручения карточки документа */
  13: optional common.kazDate reassignedDateTime;
  /** Тип действия для карточки документа */
  14: optional DocPatternStageActionType actionType;
  /** Уведомлен пользователь о дедлайне */
  15: bool informedAboutDeadline;
  /** Тип владельца карточки */
  16: optional DocumentExecutionOwnerType ownerType;
  /** Решение по документу(согласно с link) */
  17: optional string decision;
  /** Количество вложений */
  18: i32 countAttachment;
  /** common.ID цифровой подписи */
  19: optional common.ID digitalSignId;
  /** Идентификатор пользователя(если карта закрыта другим человеком) */
  20: optional common.ID closedBy;
  /** Комментарий при перепоручении */
  21: optional string taskComment;
  /** Пользователь-делегат*/
  22: optional common.UserOrGroup originalUser;
  /** Список комментариев, возвращается только при использовании фильтра withComments */
  23: optional list<DocumentComment> comments;
  /** Порядковый номер действия в момент создания карточки */
  24: i32 internalCreateIteration;
  /** Порядковый номер действия */
  25: i32 internalActionIteration;
  /** Признак периодичности */
  26: bool periodical;
  /**Дата начала выполнения периодического этапа*/
  27: optional common.kazDate startPeriod;
  /**Период выполнения*/
  28: optional string nextStartPeriod;
  /**Конечная дата периодического выполнения(Jira формат)*/
  29: optional string periodicJiraEndDate;
  /**Конечная дата периодического выполнения*/
  30: common.kazDate periodicEndDate;
  /** Информация по делегатам, возвращается только при использовании фильтра withDelegateInfo */
  31: optional list<DocumentExecutionDelegateInfo> delegateInfo;
  /** Статус */
  32: optional DocumentExecutionStatus status;
  /** Пользователь-делегат*/
  33: optional common.UserOrGroup handoverUser;
  /** Дата редактирование комментария */
  34: optional common.kazDate taskCommentUpdateDate;
  /** Кто редактировал комментарий */
  35: optional string taskCommentUpdateBy;
  /** common.ID цифровой подписи при поручении*/
  36: optional common.ID reassignDigitalSignId;
}

/** Получатель/отправитель документа */
struct DocumentParticipantGroup {
  /** Список получателей/оптравителей*/
  1: optional list<common.UserOrGroup> userOrGroup;
  /** Признак получатель/отправитель*/
  2: optional DispatchState dispatchState;
}

/** Тип фильтра для получения документов */
enum FilterReassign {
  /** "Поручено мне" - на мне есть открытая карта исполнения по документу, документ в статусе IN PROGRESS */
  REASSIGN_TO_ME,
  /** "Мои поручения" - перепорученные мной, без разницы с контролем или без (есть открытые дочерние карточки исполнения по отношению к моей) */
  MY_REASSIGN,
  /** "Контроль" - документы , которые я перепоручал с флагом "Контроль", по которым было вынесено решение (дочерние карточки закрыты)
  *  и я должен это решение утвердить (моя карта еще открыта) **/
  CONTROL,
  /** Документы, где я автор */
  ALL_MY_DOCUMENTS,
  /** Документы, где я автор, в статусе IN PROGRESS */
  MY_DOCUMENTS_IN_WORK,
  /** Документы, где я автор, в статусе CREATED */
  DRAFTS,
  /** Документы, где я автор, в статусах CLOSED, ARCHIVE */
  MY_COMPLETED_DOCUMENTS,
  /** Документы, где я ответственный за документ */
  MY_RESPONSIBLE,
  /** */
  COMPLETED_DOCUMENTS,
  /** */
  UNCOMPLETED_DOCUMENTS
}

/** Документ */
struct Document {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания документа */
  2: optional common.kazDate createDate;
  /** Document pattern */
  3: optional common.ID originalPatternId;
  /** Filled document pattern */
  4: optional FreezeDocumentPattern filledDocumentPattern;
  /** Current document stage */
  5: optional DocumentPatternStage stage;
  /** Дата дедлайна для документа */
  6: optional common.kazDate documentDeadlineDate;
  /** Дата удаления */
  7: optional common.kazDate deleteDate;
  /** Номер документа */
  8: optional string numberDocument;
  /** Название документа */
  9: optional string nameDocument;
  /** Идентификатор чата */
  10: optional common.ID chatId;
  /** Статус текущего этапа документа */
  11: optional DocPatternStageStatus status;
  /** Подстатус текущего этапа документа */
  12: optional DocPatternStageSubStatus subStatus;
  /** Имеет ссылку на внешнем сервере на данный документ */
  13: bool hasExternalLink;
  /** Время переназначения карточки */
  14: optional common.kazDate reassignedDateTime;
  /** Время до которого нужно вынести решение */
  15: optional common.kazDate cardDeadlineDate;
  /** Показывает текущий доступный тип действия */
  16: optional map<common.ID, DocPatternStageActionType> actionMap; //DocPatternStageActionType actionType;
  /** Указывает на статус */
  17: optional DocumentExecutionOwnerType ownerType;
  /** Текущая итерация документа */
  18: i32 iteration;
  /** Системный номер документа */
  19: optional string systemNumber;
  /** Указывает на наличие карты доп согласования */
  20: bool additionConfirmer;
  /** Флаг указывает просматривал ли пользователь документ */
  21: bool viewed;
  /** Есть ли цифровая подпись*/
  22: bool hasDigitalSign;
  /** Исполнители текущего этапа */
  23: optional list<DocumentExecution> currentExecutors;
  /** Другие исполнители - автор, ответственные, вьюверы */
  24: optional list<DocumentExecution> otherUsers;
  /** Дата изменения грифа секретности */
  25: optional common.kazDate scChangeDate;
  /** Дата регистрации */
  26: optional common.kazDate registrationDate;
  /** Признак указывающий отправителя */
  27: bool sender;
  /** Признак указывающий получателя*/
  28: bool recipient;
  /** Пользователь-делегат*/
  29: optional common.UserOrGroup originalUser;
  /** Document participats group(INBOX/OUTBOX) */
  30: optional list<DocumentParticipantGroup> documentParticipantGroup;
  /**Флаг контроля по документу*/
  31: bool controlForDocument;
  /**Флаг контроля по КИ*/
  32: bool controlForExecutor;
  /** Теги, прикрепленные к документу */
  33: optional list<string> tags;
  /** Главный аккаунт автора. Только для чтения на странице документы */
  34: optional Kaz_types.Account account;
  /** Есть ли ошибка при переходе документа*/
  35: bool moveError;
  /** Зашифрован */
  36: bool encripted;
  /** Иконка статуса документа */
  37: optional DocumentIconType icon;
  /** Контрольная дата поручения */
  38: optional common.kazDate reassignDeadline;
  /** Общее количество исполнителей текущего этапа */
  39: i32 countCurrentExecutors;
  /** Общее количество других исполнителей - автор, ответственные, вьюверы */
  40: i32 countOtherUsers;
  /** Общее количество ответственных */
  41: i32 countResponsibleUsers;
  /** Ответственные */
  42: optional list<DocumentExecution> responsibleUsers;
  /** Общее количество согласующих */
  43: i32 countConfirmerUsers;
}

/** Список разрешения для вложения */
struct AttachmentPermissions {
  /** Разрешено редактировать */
  1: bool onlineEdit;
  /** Разрешено комментировать */
  2: bool onlineComment;
  /** Есть право изменить права доступа к файлу */
  3: bool changeEditMode;
  /** Разрешено подписывать */
  4: bool canSign;
}

/** Тип вложения */
enum AttachmentType {
  /** Исходный файл */
  ORIGINAL,
  /** Сконвертированный в pdf */
  PDF,
  /** Сконвертированный в png */
  PNG,
  /** Сконвертированный в pdf без водяного знака */
  PDF_UNSECURED
}

/** Тип доступа к файлу */
enum AttachmentAccessMode{
  /** Только скачивание */
  NOPREVIEW
  /** Чтение */
  READONLY
  /** Комментирование */
  REVIEW
  /** Редактирование */
  EDIT
}

/**Разделитель вложений в документе на типы*/
enum AttachmentExtStatus {
  PRIMARY,
  SECONDARY,
  CARD,
  CONTENT
}

/** Информация о версии вложения */
struct AttachmentVersionInfo {
  /** Идентификатор вложения */
  1: optional common.ID id;
  /** Статус загрузки вложения */
  2: optional common.AttachmentStatus status;
  /** Версия вложения */
  3: i32 precalculatedRank;
}

/** Система в которой подпись создана */
enum SignInSystem {
  NONE,
  ALMEX,
  EXTERNAL,
  BOTH
}

/** Вложение */
struct Attachment {
  /** Уникальный идентификатор вложения и одновременно имя файла в хранилище */
  1: optional common.ID id;
  /** Идентификатор документа */
  2: optional common.ID documentId;
  /** Исходное имя файла без пути (в т.ч. для отображения) */
  3: optional string fileName;
  /** Дата и время создания вложения */
  4: optional common.kazDate createDate;
  /** Хеш сумма от оригинального файла */
  5: optional string attHash;
  /** Файл-макеты, построенные для отображения вложения на фронте (будет заполняться для определенных типов файлов, напр. *.jpg, *.png и т.д.) */
  6: optional list<AttachmentType> preview;
  /** Идентификатор пользователя создавшего вложение */
  7: optional common.ID creatorId;
  /* Attachment creator */
  8: optional common.UserOrGroup creator;
  /** Размер вложения */
  9: i64 size;
  /** Статус загрузки вложения */
  10: optional common.AttachmentStatus status;
  /** Этап, на котором было добавлено вложение  */
  11: optional common.ID stageId;
  /** Есть ли цифровая подпись*/
  12: bool hasDigitalSign;
  //12: SignInSystem signInSystem;
  /** Идентификатор карточки исполнения */
  13: optional common.ID docExecId;
  /** Признак автозамены */
  14: bool autoReplacement;
  /** Идентификатор пользователя-делегата*/
  15: optional common.ID originalUserId;
  /* Делегат */
  16: optional common.UserOrGroup originalUser;
  /** Признак черновика для online редактирования */
  17: bool forDraft;
  /** Подготовлен к публикации */
  18: bool waitForPublish;
  /** Версия файла */
  19: i64 fVersion;
  /** Текущая итерация */
  20: i32 iteration;
  /** Права доступа к текущему вложению */
  21: optional AttachmentPermissions attachmentPermissions;
  /** Количество версий */
  22: i32 versionCount;
  /** Тип файла */
  23: optional common.FileType fType;
  /** Тип доступа */
  24: optional AttachmentAccessMode accessMode;
  /** Кто может редактировать */
  25: optional common.AttachmentEditMode editMode;
  /** уникальный ID для работы с onlyOffice */
  26: optional common.ID externalId;
  /**Идентификатор митинга*/
  27: optional common.ID meetingId;
  /** Разделитель вложений в документе на типы */
  28: AttachmentExtStatus attachmentExtStatus;
  /** Информация о версиях вложения */
  29: optional list<AttachmentVersionInfo> versionInfo;
  /** Идентификатор шаблона вложения*/
  30: optional common.ID patternAttachmentTemplateId;
  /***/
  31: bool isHidden;
  /** */
  32: optional set<string> signCertKeys;
  /** Признак автодобавления */
  33: bool autoAdd;
}

/** Тип связи */
enum DocRelationType {
  /** Главный */
  PARENT,
  /** Дочерний */
  CHILD,
  /** Другой тип */
  OTHER
}

/** Связь между документами */
struct DocumentRelation {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания связи */
  2: optional common.kazDate createDate;
  /** Идентификатор 1-го документа */
  3: optional common.ID docId1;
  /** Идентификатор 2-го документа */
  4: optional common.ID docId2;
  /** Дата создания 2-ого документа */
  5: optional common.kazDate createDoc2Date;
  /** Имя 2-ого документа **/
  6: optional string doc2Name;
  /** Номер 2-ого документа */
  7: optional string doc2Number;
  /** Системный номер 2-ого документа */
  8: optional string doc2SystemNumber;
  /** Флаг указывающий на доступ ко 2-ому документу */
  9: bool doc2Access;
  /** Тип связи между документами */
  10: optional DocRelationType relationType;
  /** Статус 2-го документа */
  11: optional DocPatternStageStatus doc2Status;
  /** Доп статус 2-го документа */
  12: optional DocPatternStageSubStatus doc2SubStatus;
  /** Дата дедлайна для документа */
  13: optional common.kazDate doc2DeadlineDate;
  /** Время до которого нужно вынести решение */
  14: optional common.kazDate doc2CardDeadlineDate;
  /** Решение */
  15: optional string resolution;
  /** Тип действия по второму документу */
  16: optional map<common.ID, DocPatternStageActionType> doc2ActionType;
  /** Наличие карты доп согласования */
  17: bool doc2HasConfirmationCard;
  /** Иконка статуса документа */
  18: optional DocumentIconType doc2Icon;
  /** Имя группы паттернов */
  19: optional string doc2PatternName;
  /** Имя паттерна */
  20: optional string doc2PatternGroupName;
  /** Имя этапа */
  21: optional string doc2StageName;
}

  /** Ход исполнение */
struct ExecutionTree {
/** карточка */
  1: optional DocumentExecution card;
  /** вложения */
  2: optional list<Attachment> attachments;
  /** комментарии */
  3: optional list<DocumentComment> comments;
  /** дочерние ноды */
  4: optional list<ExecutionTree> childTree;
  /** родительская ветка */
  5: optional ExecutionTree parentTree;
  /** информация по этапу MUX */
  6: optional list<DocumentRelation> docRelations;

  /** параметры указывающие, что данный элемент дерева содержит периодичные карточки
  /**Период jiraTime*/
  7: optional string period;
  /**Конечная дата создания периодических карточке */
  8: optional common.kazDate periodicEndDate;
}

/** Предидущие этапы */
struct PassedStage {
  /** Этап */
  1: optional DocumentPatternStage passedStage;
  /** Указывает порядковый номер этапа в цепочке прохождение документа */
  2: i32 iteration;
  /** Дата начала этапа */
  3: optional common.kazDate startDate;
  /** Дата фактического завершения этапа */
  4: optional common.kazDate factDate;
  /** Ожидаемая дата закрытия этапа */
  5: optional common.kazDate deadLineDate;
}

/** Данные о вложениях для копирования */
struct AttCreateInfo {
  /** Идентификатор вложения для копирования */
  1: optional common.ID attachmentId;
  /** Идентификатор шаблона */
  2: optional common.ID attachmentTemplateId;
  /** Имя файла */
  3: string fileName;
  /** Флаг для редактирования */
  4: bool forDraft;
  /** Режим редактирования */
  5: common.AttachmentEditMode editMode;
  /**Идентификатор митинга*/
  6: optional common.ID meetingId;
  7: AttachmentExtStatus attachmentExtStatus;
}

/** Переназначение документа */
struct DocumentReassign {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата начала перепоручения документа */
  2: optional common.kazDate dateStart;
  /** Дата окончания перепоручения документа */
  3: optional common.kazDate dateEnd;
  /** Пользователь или группа */
  4: optional common.UserOrGroup userOrGroup;
  5: optional common.kazDate deadLineTime;
  /** Тип перепоручения */
  6: optional ExecutionReassignType reassignType;
  /** Комментарий при перепоручении */
  7: optional string comment;
  8: bool periodical;
  /**Дата начала выполнения периодического этапа*/
  9: optional common.kazDate startPeriod;
  /**Период выполнения(Jira формат)*/
  10: optional string nextStartPeriod;
  /**Конечная дата периодического выполнения(Jira формат)*/
  11: optional common.kazDate periodicEndDate;
  /**Время на выполнение периодичного поручения(время до закрытия каждой карточки созданной в рамках периодичного выполнения, Jira формат)*/
  12: optional string cardActivityPeriod;
}

/** Тип связи между карточками исполнения */
enum DocumentExecutionTypeLink {
  /** Все виды связей */
  ALL,
  /** Родительские */
  PARENT,
  /** Дочерние */
  CHILD
}

/** Способ изменения */
enum ChangeType {
  /** Добавили */
  ADD,
  /** Изменили */
  REPLACE,
  /** Удалили */
  REMOVE
}

/** Привязка контейнеров к этапам и стрелкам*/
struct ContentHolderShowPlace {
    /* Идентификатор */
    1: common.ID id;
    /* Идентификатор этапа*/
    2: common.ID stageId;
    /* Порядковый номер */
    3: i32 seqNum;
    /* Правила редактирования */
    4: optional AccessRule accessRule;
    /* контейнер */
    5: ContentHolder contentHolder
    /* расчитываемое значение( на основе accessRule) */
    6: bool allowEdit;
    /* Идентификатор этапа*/
    7: common.ID linkId;
}

/** Контент контейнер */
struct ContentHolder {
  /* Идентификатор */
  1: common.ID id;
  /** Идентификатор шаблона */
  2: optional common.ID patternId;
  /** Название */
  3: string oName;
  /** Признак системной вкладки */
  4: bool isSystem;
  /** Подсоединенный контент */
  5: list<ContentHolderLink> contentHolderLink;
  /**Отображать в кратких сведениях */
  6: bool visibleOnShort;
  /** Отображать в полных в сведениях */
  7: bool visibleOnFull;
  8: bool showInInfo;
}

/** Настройки отображения контента */
struct ContentHolderLink {
  /* Идентификатор */
  1: common.ID id;
  /** Контент */
  2: ContentItem contentItem;
  /** Флаг обязательности заполнения */
  3: bool requared;
  /** Признак только чтение */
  4: bool readOnly;
 /* *//** Правила редактирования *//*
  5: optional AccessRule enableEdit; //todo*/
  /** Порядковый номер */
  5: i32 order;
  /** Место показа коллекции контента */
  6: optional ContentItemShowPlace showPlace;
  7: optional bool visible;
  8: optional string visibleScript;
  9: optional string readonlyScript;
  10: optional string onChangeScript;
  /** calculated  field */
  11: bool allowForCurUser;
}

/** Контент таб */
struct ContentTab {
    /** Identifier */
    1: optional common.ID id;
    /** Tab oName */
    2: optional string oName;
    /** Sequential number */
    3: i32 seqNum; //todo в свзяь между холдером и этапом
    /** list of content items */
    4: optional list<ContentItem> contentItems;
    /** stageId */
    5: optional map<common.ID, AccessRule> enableEdit;//todo ?
    /**Отображать в кратких сведениях */
    6: bool visibleOnShort;//в холдер
    /** Отображать в полных в сведениях */
    7: bool visibleOnFull; //в холдер
    /** calculate on field 5 */
    8: bool allowForCurUser;//в линку (вычисляемое поле)
    /** Настройки видимости по этапам */
    9: optional map<common.ID, bool> visible; //todo проблема миграции
    /**Редактировать при создании */
    10: bool editOnCreate;  //убрать
    /**Отображать при создании */
    11: bool visibleOnCreate;//убрать
}

/** Уровень логирования */
enum HistoryLevel {
  /** Информирование */
    INFO,
    /** Предупреждение */
    WARNING,
    /** Ошибка */
    ERROR
}

/** История */
struct HistoryData {
  /** Идентификатор */
  1: optional common.ID id;
  /** Дата создания истории */
  2: optional common.kazDate createDate;
  /** Идентификатор документа */
  3: optional common.ID documentId;
  /** Тип истории */
  4: optional HistoryLevel level;
  /** Ключ сообщения */
  5: optional string key;
  /** Аргументы сообщения */
  6: optional list<string> parameters;
  /** Клиент */
  7: optional common.UserOrGroup client;
  /** Пользователь делегат */
  8: optional common.UserOrGroup originalUser;
  /* Номер документа */
  9: optional string docNumber;
  /* Системный номер документа */
  10: optional string docSysNumber;
  /** Идентификатор вложения */
  11: optional common.ID attachmentId;
  /** Исходное имя файла вложения без пути (в т.ч. для отображения) */
  12: optional string attachmentFileName;
  /** IP полученный на сервере */
  13: optional string ip1;
  /** IP переданный клиентскими приложениями */
  14: optional string ip2;
  /** Идентификатор шаблона */
  15: optional string patternId;
  /** Расширенное логирование */
  16: bool hasDetailData;
  /** Идентификатор номенклатурного номера */
  17: optional common.ID nomenclatureNumberId;
}

/** История с постраничным отображением  */
struct HistoryPage {
  /** История */
  1: list<HistoryData> historyList;
  /** Общее количество записей */
  2: common.count totalCount;
}

/** История изменения конечного срока */
struct DeadlineHistory {
    /** Identifier */
    1: optional common.ID id;
    /** Create date of record */
    2: optional common.kazDate createDate;
    /** Client who changed date */
    3: optional common.UserOrGroup creator;
    /** Document */
    4: optional Document document;
    /** Document exection */
    5: optional DocumentExecution documentExecution;
    /** old deadline date */
    6: optional common.kazDate oldDeadlineDate;
    /** new deadline date */
    7: optional common.kazDate theNewDeadlineDate;
}

/** Тип задачи */
enum TodayTaskType {
  /** Все */
  ALL
  /** Открыта */
  OPEN,
  /** Закрыта */
  CLOSED,
  /** Событие */
  EVENT,
  /** Митинг */
  MEETING
}

/** Название колонок в статистике по КИ */
enum DocumentExecutionStatisticType {
  /** Просроченные */
  EXPIRED,
  /** В работе + дедлайн через день */
  DEADLINE_AFTER_DAY,
  /** Все остальные*/
  NOT_SOON_DEADLINE
}

/** Данные, которые должен вернуть сервер при запросе детальной информации(см Детальная информация о документе) */
enum AggregationRequiredType {
    DOCUMENT,//--
    DOC_COMMENT,
    DOC_RELATION,//--
    CONTENT_TAB,//--
    SC,
    DEADLINE_HISTORY,
    ATTACHMENT,//--
    REPORT_TEMPLATE,
    DOC_PERMISSION,
    REGISTRY_RULE,
    REGISTRY_USERS,
    REGISTRY_ACCOUNTS,
    MATCHING_USER_GROUP,
    CONTENT_HOLDER
}

/** Описывает дополнительный доступ к документу */
struct DocumentExtShare {
  1: optional common.ID id;
  2: common.ID documentId;
  3: optional string shareType;
  4: optional common.ID userId;
  5: optional common.ID guestId;
  6: optional string secretCode;
  7: set<AggregationRequiredType> ruleSet;
  8: common.kazDate validTillDate;
  9: optional common.ID creatorId;
  10: optional common.kazDate createDate;
  11: optional string extId;
}

/** Переменные шаблона */
struct PatternVariable {
  /** Идентификатор */
  1: optional common.ID id;
  /** Ключ */
  2: string key;
  /** Значение по умолчанию */
  3: optional string defValue;
}

/** Исполнитель процессной роли */
struct PatternProcessRoleExec {
  /** Исполнитель */
  1: common.UserOrGroup userOrGroup;
  /** Идентификатор пользователя для автоматического перепоручения */
  2: common.ID childUserId;
  /** Коментарий для автоматического перепоручения*/
  3: string comment;
  /** Детальное описание коментария */
  4: string commentDescription;
  /** Конечный срок, до которого автоматическое перепоручение нужно выполнить*/
  5: common.kazDate deadlineDate;
}

/** Процессная роль */
struct PatternProcessRole {
  /** Идентификатор */
  1: common.ID id;
  /** Ключ */
  2: string key;
  /** Название */
  3: optional string oName;
  /** Признак запрета редактирования */
  4: bool fixed;
  /** флаг, указывающий что исполнитель может быть только один */
  5: bool single;
  /** Список исполнителей */
  6: optional list<PatternProcessRoleExec> roleExecList;
}

/** Описывает действия, которые необходимо предпринять при сохранении вложения с режимом редактирования EDIT_MODE - Single, а в документе/карточке уже есть вложение с таким же именем и режимом редактирования */
enum AttachmentProcessingType {
  /** Не обрабатывать старую версию, бросать ошибку */
  NONE,
  /** Удалять старую версию */
  DELETE,
  /** Обрабатывать старую версию (изменяется режим редактирования на PUBLISHED) */
  PROCESS
}


/** Основные данные связанного документа */
struct DocumentRelationInfo {
  /** Идентификатор */
  1: common.ID id;
  /** Дата создания документа */
  2: optional common.kazDate createDate;
  /** Название документа **/
  3: optional string name;
  /** Системный номер */
  4: optional string systemNumber;
  /** Номер документа */
  5: optional string numberDocument;
  /** Дата регистрации */
  6: optional common.kazDate registrationDate;
  /** Флаг указывающий на доступ ко 2-ому документу */
  7: bool doc2Access;
  /** Статус документа */
  8: optional DocPatternStageStatus status;
  /** Доп статус документа */
  9: optional DocPatternStageSubStatus subStatus;
  /** Дата дедлайна для документа */
  10: optional common.kazDate deadlineDate;
  /** Время до которого нужно вынести решение */
  11: optional common.kazDate cardDeadlineDate;
  /** Иконка статуса документа */
  12: optional DocumentIconType icon;
  /** Имя группы паттернов */
  13: optional string patternName;
  /** Имя этапа */
  14: optional string stageName;
    /** Тип действия по документу */
  15: optional map<common.ID, DocPatternStageActionType> actionMap;
}

/** Связи документов */
struct DocumentRelationLink {
  /** Идентификатор документа от которого построена связь */
  1: common.ID fromId,
  /** Идентификатор документа к которому построена связь */
  2: common.ID toId,
  /** Тип связи */
  3: DocRelationType linkType;
  /** Признак автоматической связи */
  4: bool isAuto;
}

/** Структура зависимостей документа */
struct DocumentRelationModel {
  /** Идентификатор документа, относительно которого построено дерево */
  1: common.ID docId;
  /** Базовая информация о документе */
  2: list<DocumentRelationInfo> docRelInfoList;
  /** Зависимости */
  3: list<DocumentRelationLink> docRelLinkList;
}

/** Сервис управления документами */
service DocumentService {
  DocPermissions calculatePermissions(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание/изменение документа */
   Document createOrUpdateDocument(1: common.AuthTokenBase64 token, 2: Document document, 3: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение документа */
   Document updateDocument(1: common.AuthTokenBase64 token, 2: Document document, 3: DocumentAccessPolicy accessPolicy, 4: list<common.UserOrGroup> addedResponsibles, 5: list<common.UserOrGroup> removedResponsibles, 6: list<common.ID> addedSecurityClassificationIds, 7: list<common.ID> removedSecurityClassificationIds) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Создание документа */
  Document createDocument(1: common.AuthTokenBase64 token, 2: Document document, 3: list<common.UserOrGroup> users, 4: list<ContentHolderLink> holderLinks, 5: set<common.ID> securityClassificationsId, 6: list<AttCreateInfo> attachments, 7: list<DocumentRelation> docRelations) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание документа из xml черновика*/
  Document createDocumentFromXML(1:common.AuthTokenBase64 token, 2:binary xmlDoc) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение документа по идентификатору */
  Document getDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4: bool decrypt, 5: i32 executorsPortion) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Список всех документов.
  * Есть возможность фильтровать по:
  *  - common.ID паттерна (fieldname: "documentPatternId", fType: STRING)
  *  - creatorId автор id
  *  - execId       по исполнителю
  *  - responsId    по ответственному
  *  - signId       по подписанту
  *  - confirmerId  по согласующему
  *  - outboxUserId
  *  - inboxUserId
  *  - contentLike
  *  - дате создания (fieldname: "createDate", fType: DATE)
  *  - documentDeadlineDate - дата последнего срока исполнения
  *  - группе паттерна (fieldname: "documentPatternGroupId", fType: STRING)
  *  - номеру (fieldname: "numberDocument", fType: STRING)
  *  - системному номеру (fieldname: "systemNumber", fType: STRING)
  *  - склеенному обычному и системному (fieldname: "nbrOrsysNbr", fType: STRING)
  *  - названию (fieldname: "nameDocument", fType: STRING, fieldCondition: EQUAL)
  *  - черновики (fieldname: "reassign", fieldvalue: "FilterReassign.DRAFTS", fType: ENUMERATED, fieldCondition: EQUAL)
  *  - выполнены (fieldname: "reassign", fieldvalue: "FilterReassign.COMPLETED_DOCUMENTS", fType: ENUMERATED, fieldCondition: EQUAL)
  *  - требующие участия (fieldname: "reassign", fieldvalue: "FilterReassign.UNCOMPLETED_DOCUMENTS", fType: ENUMERATED, fieldCondition: EQUAL)
    *  - тип действия на текущем этапе (stageActionType, enum)
  *  - docName (fieldname: "docName", fType: STRING, fieldCondition: EQUAL) + (fieldname: "docNameSType", fieldvalue: "SearchType.S_LIKE", fType: ENUMERATED, fieldCondition: EQUAL) - что искать в паре с docNameSType(SearchType) способ поиска
  *  - isSearchInCryptDocument (fieldname: "isSearchInCryptDocument", fType: STRING, fieldCondition: EQUAL)) - искать в зашифрованных документах, используется только в паре с docName
  *  - contName (fieldname: "contName", fType: STRING, fieldCondition: EQUAL) + (fieldname: "contNameSType", fieldvalue: "SearchType.S_LIKE", fType: ENUMERATED, fieldCondition: EQUAL) - что искать в паре с docNameSType(SearchType) способ поиска
  *  - по тегам (fieldname: "tag", fType: STRING)
  *  - по наличию открытой карточки исполнения и её конечный срок меньше текущей даты (fieldname: "openCardWithDeadlineAlready", fType: STRING)
  *  - inboxUserId по получателю
  *  - outboxUserId по отправителю
  *  - indexMonth по месяцу
  *  - indexDate только условие between
  *  - */
  list<Document> getAllDocuments(1: common.AuthTokenBase64 token, 2: DocumentAccessPolicy accessPolicy, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение количества всех документов */
  i32 getCountAllDocuments(1: common.AuthTokenBase64 token, 2: DocumentAccessPolicy accessPolicy, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление документа */
  bool deleteDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка дочерних этапов к заданному этапу
  *  фильтр
  *  common.ID - по идентификатору
  *  executorId - по идентификатору карточки исполнения
**/
  list<PassedStage> getAllPassedStages(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение дерева "ход исполнения" */
  list<ExecutionTree> getExecutionTree(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4:i32 iteration, 5: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка текущих активных этапов */
  list<DocumentPatternStage> getActiveStages(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение количества людей, которые уже вынесли решение */
  map<string, i32> getCountPeoplesWhenRenderedDecision(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID stageId, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Вынесение решения по документу, флаг force используется для фонового вызова forceMoveToNextStage */
  Document setDocumentDecision(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: string decision, 4:string documentComment, 5:bool force, 6:string signature, 7:common.ID cardId, 8:list<AttCreateInfo> attachments, 9:list<ContentHolderLink> holderLinks, 10:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  Document setDocumentDecisionUsingServerKeyStorage(1: common.AuthTokenBase64 token, 2:common.ID documentId, 3:string decision, 4:string documentComment, 5:bool force, 6:common.ID pKeyId, 7:string password, 8:common.ID cardId, 9:list<AttCreateInfo> attachments, 10:list<ContentHolderLink> holderLinks, 11:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /*** Утверждение решения по документу */
  bool approveDocumentDecision(1: common.AuthTokenBase64 token, 2: common.ID executionId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Предоставление доступа к документу */
  list<DocumentExecution> shareDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4: list<common.UserOrGroup> usersOrGroups) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление доступа к документу */
  bool revokeDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<common.UserOrGroup> usersOrGroups, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка пользователей (но не групп), которым доступен документ */
  list<common.UserOrGroup> getAllDocumentSharings(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка переназначений документа */
  list<DocumentReassign> getAllDocumentReassign(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Разовое перепоручение документа */
  list<DocumentExecution> reassignDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<DocumentReassign> documentReassign, 4: common.ID cardId, 5: string signature) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  list<DocumentExecution> reassignDocumentUsingServerKeyStorage(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<DocumentReassign> documentReassign, 4: common.ID cardId, 5: common.ID pKeyId, 6: string password) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отменить свои разовые перепоручения */
  bool revokeChildCards(1: common.AuthTokenBase64 token, 2: common.ID cardId,  3: bool deleteCard, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Cоздание/изменение автоматического перепоручения */
  DocumentReassign createOrUpdateAutomaticDocumentReassign(1: common.AuthTokenBase64 token, 2: DocumentReassign documentReassign) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление автоматического перепоручения */
  bool deleteAutomaticDocumentReassign(1: common.AuthTokenBase64 token, 2: common.ID documentReassignId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление/изменение контроля над перепоручением */
  DocumentExecution changeReassignControl(1: common.AuthTokenBase64 token, 2: common.ID documentExecutionId, 3: common.ID userId, 4: ExecutionReassignType reassignType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение всех карт выполнения документа
  * фильтра: id, createDate, reassignedDateTime, decision, actionType, ownerType, status, iteration, showActionType
  **/
  list<DocumentExecution> getAllDocumentExecutions(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID stageId, 4: DocumentExecutionTypeLink typeLink, 5:  filter.KazFilter filter, 6: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение карты выполнения документа */
  DocumentExecution getDocumentExecution(1: common.AuthTokenBase64 token, 2: common.ID docExecutionId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение исполнителей у документа,
   * параметр toClose передавать cardId
 **/
  bool changeExecutorsForDocument(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: list<DocumentReassign> toAdd, 4: list<common.ID> toClose, 5:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Copies attachment from existing attachment */
  list<Attachment> createAttachmentFrom(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID cardId, 4: DocumentAccessPolicy accessPolicy, 5: list<AttCreateInfo> attCreateInfoList, 6: AttachmentProcessingType processingType) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение common.ID загружаемого вложения */
  string createLoadableAttachment(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: string fileName, 4: i64 totalSize, 5: i32 countPortions, 6:string cardId, 7:common.ID attachmmentId, 8: bool forDraft, 9: DocumentAccessPolicy accessPolicy, 10: common.AttachmentEditMode editMode, 11: common.ID meetingId, 12: AttachmentExtStatus extStatus) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление вложения в документ порциями */
  Attachment uploadDocumentAttachmentPortions(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: i32 numberPortion, 4: binary fileContentBytes) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Загрузка вложения с сервера */
  binary downloadDocumentAttachment(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: AttachmentType attachmentType, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Поворот страниц в PDF документе */
  bool rotatePdfPages(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3:string pages, 4:i32 angle, 5:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Прикрепление вложений к документу, при этом у пользователя должен быть доступ к обоим документам */
  bool addAttachmentsToDocument(1: common.AuthTokenBase64 token, 2:common.ID documentId, 3: list<AttCreateInfo> attachments, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление вложения из документа */
  bool removeDocumentAttachment(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: bool removeOldVersions, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Закончить редактирование вложения */
  bool markAsWaitForPublish(1: common.AuthTokenBase64 token, 2: common.ID attachmentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменить режим редактирования (доступно только автору) */
  Attachment changeAttachmentEditMode(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: common.AttachmentEditMode editMode) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение всех (последних версий) вложений в документе
   * executorId
   * fileName - имя файла
 **/
  list<Attachment> getDocumentAttachments(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: bool latestOnly, 4: filter.KazFilter filter, 5: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение вложения */
  Attachment getDocumentAttachmentById(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получение списка всех версий вложения */
  list<Attachment> getAllDocumentAttachmentVersions(1: common.AuthTokenBase64 token, 2: common.ID attachmentId, 3: filter.KazFilter filter, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение настроек видимости вложений*/
  bool changeAttachmentsVisibility(1: common.AuthTokenBase64 token, 2:list<common.ID> toHideList, 3:list<common.ID> toShowList) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Cоздание/изменение комментария к документу */
  DocumentComment createOrUpdateDocumentComment(1: common.AuthTokenBase64 token, 2: DocumentComment documentComment, 3:common.ID addToComment, 4:ChangeType changeType, 5: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Список всех комментариев к документу */
  list<DocumentComment> getAllDocumentComments(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: filter.KazFilter filter, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление комментария к документу */
  bool deleteDocumentComment(1: common.AuthTokenBase64 token, 2: common.ID documentCommentId, 3: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Изменение/добавление блоков контента документа */
  list<ContentHolderShowPlace> createOrUpdateDocumentContentHolderLink(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<ContentHolderLink> holderLinks, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Create or update document content tab */
  ContentTab createOrUpdateDocumentContentTab(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: ContentTab documentContentTab, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Returns all doc tabs matches by filter */
  list<ContentTab> getDocumentContentTabsByFilter(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: filter.KazFilter filter, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Remove document content tab */
  bool deleteDocumentContentTab(1: common.AuthTokenBase64 token, 2: common.ID documentContentTabId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Заархивировать документ */
  bool documentToArchive(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение списка пользователей, которые ответственные за документ */
  set<common.UserOrGroup> getAllResponsibleForDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: DocumentAccessPolicy accessPolicy, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавление ответственного за документ */
  bool addResponsibleForDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<common.UserOrGroup> users, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удаление ответственного за документ */
  bool removeResponsibleForDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: list<common.UserOrGroup> users, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение истории по документу */
  HistoryPage getDocHistoryPage(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3:DocumentAccessPolicy accessPolicy, 4: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение всех новостей */
  list<Kaz_types.News> getAllNews(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение количества задач по документам (выполненным, невыполненным), встречам и событиям для которых дедлайн наступит в день, переданный
    * в параметрах  */
  map<TodayTaskType, i32> getTasksByDate(1: common.AuthTokenBase64 token, 2: common.kazDate date) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Сгенирировать номер документа */
  string generateDocumentNumber(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: string docNumber, 4:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Установка статуса "просмотрено" для документа */
  bool setDocumentViewed(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: bool viewed, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** Получение всех связей документа */
  list<DocumentRelation> getAllDocumentRelations(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: filter.KazFilter filter, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание связей между документами */
  list<DocumentRelation> changeRelations(1: common.AuthTokenBase64 token, 2:list<DocumentRelation> toCreate, 3:list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение подстатуса документа */
  bool changeSubStatus(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: DocPatternStageSubStatus subStatus, 4: string comment, 5:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменение срока исполнения документа или карточки
      Чтобы изменить срок исполнения для документа необходимо передать documentId и deadlineTime, параметр documentExecution должен быть null.
      Чтобы изменить срок исполнения для карточки исполнения необходимо передать documentExecution и deadlineTime, параметр documentId должен быть null.
  */
  bool increaseDeadlineForDocumentOrDocumentExecution(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID documentExecution, 4: common.kazDate deadlineTime, 5: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отправить документ на доп. согласование */
  bool addAdditionalConfirmers(1: common.AuthTokenBase64 token, 2: common.ID cardId, 3: list<common.ID> users, 4: common.kazDate deadlineDate, 5: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание второй и более резолюции, флаг returnToParentStage показывает на какой из этапов следует переместить документ,
   *  returnToParentStage = true - документ будет перемещен на начало стрелки, false - на конец
 **/
  Document setAdditionalDecision(1: common.AuthTokenBase64 token, 2: map<common.ID, string> userDecision, 3: common.ID cardId, 4:string comment, 5:bool returnToParentStage, 6: string signature) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отмена решения(карточка должна быть верхнего уровня или дочерняя от групповой верхнего уровня) */
  Document revokeDecision(1: common.AuthTokenBase64 token, 2: list<DocumentReassign> documentReassign, 3: common.ID cardId, 4:string comment) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Отмена решения, карточка должна быть  */
  DocumentExecution markDecisionAsRemoved(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.ID cardId, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Метод на получение статистики по открытым карточкам исполнения*/
  map<DocumentExecutionStatisticType, i32> getAllOpenDocumentExecutionsStatistic(1: common.AuthTokenBase64 token, 2: common.ID userId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Метод изменения контроля документа*/
  bool changeControlForDocument(1: common.AuthTokenBase64 token, 2: common.ID documentId, 3: bool control, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Добавить теги к документу */
  bool addTagsToDocument(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: set<string> tags) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Удалить теги из документа */
  bool removeTagsToDocument(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: set<string> tags) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** автору, добавлять участников в этап*/
  list<DocumentExecution> addExecutorsToStage(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: list<DocumentReassign> documentReassign, 4: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* (fieldname: "key", fType: STRING, fieldCondition: EQUAL) */
  /* (fieldname: "value", fType: STRING, fieldCondition: EQUAL) */
  common.count getCountDocsByFilterNoPermission(1:common.AuthTokenBase64 token, 2:common.ID patternGroupId, 3:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /* Метод на поиск документов, вне зависимости от доступа (в ответ только id и номер) */
  list<Document> getTinyDocsByFilterNoPermission(1:common.AuthTokenBase64 token, 2:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Метод на изменение регистрационного номера и(или) даты регистрации документа*/
  bool changeRegistrationInfoForDocument(1:common.AuthTokenBase64 token, 2: common.ID documentId, 3: common.kazDate newRegistrationDate, 4: string newRegistrationNumber, 5: DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Создать чат для документа */
  common.ID createChatForDocument(1:common.AuthTokenBase64 token, 2: common.ID documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Получить списоки дополнительного доступа */
  list<DocumentExtShare> getDocumentExtShareList(1:common.AuthTokenBase64 token, 2: common.ID documentId, 3: DocumentAccessPolicy accessPolicy, 4:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Изменить список дополнительного доступа */
  list<DocumentExtShare> changeDocumentExtShare(1:common.AuthTokenBase64 token, 2: common.ID documentId, 3: DocumentAccessPolicy accessPolicy, 4:list<DocumentExtShare> toAdd, 5: list<common.ID> toRemove) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  bool changeAttachmentExtStatus(1:common.AuthTokenBase64 token, 2: map<common.ID, AttachmentExtStatus> statusMap) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /**Отправить напоминание участнику документа */
  bool remindDocumentExecutor(1:common.AuthTokenBase64 token, 2: common.ID cardId, 3: string comment, 4: DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменить текст резолюции при поручении */
  bool updateReassignResolution(1:common.AuthTokenBase64 token, 2: common.ID cardId, 3: string resolution, 4: DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Изменить текст комментария статуса документа*/
  bool updateSubStatusComment(1:common.AuthTokenBase64 token, 2: common.ID docCommentId, 3: string comment, 4: DocumentAccessPolicy policy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** отправить док на этап другого шаблона */
  bool changeDocumentType(1: common.AuthTokenBase64 token, 2: common.ID docId, 3: string startStageId, 4: list<DocumentPatternStage> stages, 5: list<ContentItem> contentItems, 6:list<PatternProcessRole> roles, 7:list<PatternVariable> patternVariables, 8:DocumentAccessPolicy accessPolicy, 9:string newRegNumber) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Получить структуру зависимостей документа */
  DocumentRelationModel getDocumentRelationModel(1: common.AuthTokenBase64 token, 2: common.ID docId, 3:filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Возвращает последнюю версию вложения */
  Attachment getNewConvertedAttachmentVersion(1: common.AuthTokenBase64 token, 2: string prevAttId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Экспорт документа в xml*/
  binary exportAsXML(1:common.AuthTokenBase64 token, 2:common.ID documentId, 3:DocumentAccessPolicy accessPolicy) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Создание документа из xml*/
  Document importFromXML(1:common.AuthTokenBase64 token, 2:binary xml) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** Выгрузка всех контентов вне зависимости от доступных контент контейнеров*/
  list<ContentItem> getDocContentItemsForChangeType(1:common.AuthTokenBase64 token, 2:common.ID documentId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}

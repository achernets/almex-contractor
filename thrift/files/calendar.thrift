include "common.thrift"

namespace java com.devtech.kaz.thrift.gen

/** Площадка */
struct Area {
  /** Идентификатор */
  1: optional string id;
  /** Название */
  2: optional string nameArea;
}

/** Тип материального ресурса */
enum MaterialResourceType {
  /** Помещение */
  PREMISES,
  /** Оборудование */
  EQUIPMENT
}

/** Материальный ресурс */
struct MaterialResource {
  /** Идентификатор */
  1: optional string id;
  /** Название */
  2: optional string nameMaterRes;
  /** Тип (помещение/оборудование) */
  3: optional MaterialResourceType type;
  /** Идентификатор площадки */
  4: optional string areaId;
  /** Рассчитан на количество людей */
  5: i64 countPersons;
}

enum MeetingStatus {
  DRAFT,
  PRE_VOTE,
  PREPARE,
  VOTE,
  CLOSED
}

/** Cостояние текущего этапа*/
enum StageState {
  ACTIVE,
  PENDING
}

 /** Встреча */
 struct Meeting {
   /** Идентификатор */
   1: optional string id;
   /**Текущая версия - изменяется при каждом сохранении */
   2: i64 vesion;
   /** Название */
   3: optional string nameMeeting;
   /** Повестка дня */
   4: optional string agenda;
   /** Адрес */
   5: optional string address;
   /** Дата начала встречи */
   6: optional i64 dateStart;
   /** Дата окончания встречи */
   7: optional i64 dateEnd;
   /** Признак, который позволяет предложить время */
   8: bool allowSuggestTime;
   /** Идентификатор документа */
   9: optional string protocolDocumentId;
   /** Автор встречи*/
   10: optional common.UserOrGroup author;
   /** Цвет события */
   11: optional string color;
   /** Флаг указывает просматривал ли пользователь митинг */
   12: bool viewed;
   /** Participants */
   13: optional list<MeetingParticipant> participants;
   /** Material Resources */
   14: optional list<MaterialResource> resources;
   /**флаг, разрешающий изменять ресурсы*/
   15: bool canModifyResource;
   /**флаг, разрешающий изменять голосования*/
   16: bool canModifyVote;
   /**Идентификатор сгенерированного протокола совещания*/
   17: optional common.ID protocolAttachmentId;
   /** Паттерн проведения совещания */
   18: optional common.ID freezePatternId;
   /** Текущий этап в проведении совещания */
   19: optional common.ID freezeStageId;
   /**Название группы паттернов*/
   20: optional string patternGroupName;
   /**Название паттерна*/
   21: optional string patternName;
   /**Текущай статус митинга*/
   22: optional MeetingStatus meetingStatus;
   /**Cостояние текущего этапа*/
   23: optional StageState stageState;
   /** Следующий этап в проведении совещания */
   24: optional common.ID freezeNextStageId;
   /** Руководитель, который деллегировал права */
   25: optional common.UserOrGroup originalUser;
 }
 
 /** Участник встречи */
 struct MeetingParticipant {
   /** Entity ID */
   1: optional string id;
   /** Пользователь */
   2: optional common.UserOrGroup userOrGroup;
   /** Признак того, что участник подтвердил участие */
   3: optional common.DecisionType decision;
   /** Предложенная дата начала встречи */
   4: optional common.kazDate proposedBeginDate;
   /** Предложенная дата окончания встречи */
   5: optional common.kazDate proposedEndDate;
   /** Флаг, указывает что учасник - автор */
   6: bool author;
   /** Флаг, указывает что учасник - секретарь */
   7: bool secretary;
   /** Флаг, указывает что учасник - выступающий */
   8: bool speaker;
   /** Флаг, указывает что учасник имеет право голоса */
   9: bool canVote;
   /** Флаг, указывает что учасник - председатель */
   10: bool chairman;
   /** Дислокация */
   11: string location;
   /** Флаг, указывает что учасник присутствовал */
   12: bool present;
 }

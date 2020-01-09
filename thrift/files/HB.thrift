include "common.thrift"

namespace java com.devtech.kaz.thrift.gen

enum HBColumnType {
    TEXT,
    NUMBER,
    USER_CHOICE
}

 /** Значение справочника */
struct HBValue {
 /** идентификатор */
  1: optional string id;
  /**  значение (язык, значение)  если тип USER map = null */
  2: optional map<string, string> value;
 /** Пользователь */
  3: optional common.UserOrGroup user;
  /** Тип */
  4: HBColumnType type;
}

/** строка справочника */
struct HBRow {
  /** идентификатор */
  1: optional string id;
  /** полядковый номер */
  2: i64 order;

  /**
  * map<org_column_id, HBValue> - language value relation
  **/
  3: map<string, HBValue> values;
}

/** Колонка справочника */
struct HBColumn {
/* Идентификатор */
  1: optional string id;
  /** Column name */
  2: optional string oName;
  /** Determining the possibility to add null value to the column */
  3: bool requiredColumn;
  /** порядковый номер */
  4: i32 seqNum;
  /** доступность справочника для поиска. */
  5: bool searchable;
  /** тип колонки */
  6: HBColumnType columnType;
  7: string orgId;
}

/* Поддерживаемый тип протокола */
enum ThriftTransportType {
  HTTP,
  SOCKET
}

/* Поддерживаемый тип протокола */
enum ThriftProtocolType {
  JSON,
  BIN
}
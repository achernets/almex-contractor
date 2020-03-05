include "common.thrift"
include "ex.thrift"
include "HB.thrift"
include "filter.thrift"

namespace java com.devtech.kaz.thrift.gen

/** Справочник */
struct HandBook {
  /** Идентификатор */
  1: optional common.ID id;
  /** название */
  2: optional string hBookName;
  /** Уникальный ключ */
  3: i64 guiId;
  /** признак неизменяемости */
  4: bool fixed;
  /** аккаунты за которыми закреплен */
  5: optional set<common.ID> accountIds;
  /** список колонок */
  6: optional list<HB.HBColumn> columns;
  /** список людей, которым разрешено изменять контент */
  7: optional list<common.UserOrGroup> hbContentAdmins;
  /** рассчитываемое поле - разрешение на редактирование */
  8: bool allowEdit;
  /** thrift url справочника */
  9: optional string thriftURL;
  /** Копировать значение в content item */
  10: bool copyValue;
  /** Тип транспорта передачи данных */
  11: optional HB.ThriftTransportType transportType;
  /** Тип протокола передачи данных */
  12: optional HB.ThriftProtocolType protocolType;
}

/** Сервис справочников */
service HandBookService {
   /** id, name - по названию справочника
    * withUsers - с заполненной информацией о пользователях, которым разрешено редактирование контента
    * withAccounts - с заполненной информацией об аккаунтах
    * superAdmin - по всем аккаунтам
    * contentUpdate - для которых разрешено редактирование
 **/
   list<HandBook> getAllHandBooks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** количество справочников */
   i32 getCountAllHandBooks(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /**Для расчета флага редактирование*/
   HandBook getHandBookById(1: common.AuthTokenBase64 token, 2: common.ID id) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** создать/изменить справочник */
   HandBook createOrUpdateHandBook(1: common.AuthTokenBase64 token, 2: HandBook handBook) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
  /** создание/изменение строки в справочнике */
   void createOrUpdateHBRows(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: list<HB.HBRow> rows) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   /** Returns HB rows by filter
    *  Item fields:
    *  1) common.ID - row id
    *  2) rValue - search rows by value
    *  3) rColumnId - search rows by column id
    **/
   list<HB.HBRow> getAllHandBookRows(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

  /** получить количество строк в справочники */
   common.count getAllHandBookRowsCount(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);

   /**
    * Returns all HB values with different languages
    *
    * Item fields:
    * 1) hbColumnId - column id
    * 2) hbRowId - row id
    * 3) value
    * 4) language
    *
    * Filter by hbId is required. If the request will contain an empty filter then exception will occur
    **/
   list<HB.HBValue> getHandBookValues(1: common.AuthTokenBase64 token, 2: filter.KazFilter filter) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** удалить справочник */
   bool removeHandBook(1: common.AuthTokenBase64 token, 2: common.ID hbId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
   /** удалить строку из справочника */
   bool removeHandBookRow(1: common.AuthTokenBase64 token, 2: common.ID hbId, 3: common.ID rowId) throws (1: ex.PreconditionException validError, 2: ex.ServerException error);
}
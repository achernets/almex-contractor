import { notification } from 'antd';
import { isEmpty } from 'lodash';
import { PAGE_SIZE } from 'constants/table';
import { log } from 'utils/helpers';

export const GET_MRK_DOCUMENT_REQUEST = 'GET_MRK_DOCUMENT_REQUEST';
export const GET_MRK_DOCUMENT_SUCCESS = 'GET_MRK_DOCUMENT_SUCCESS';
export const GET_MRK_DOCUMENT_FAILURE = 'GET_MRK_DOCUMENT_FAILURE';

export const getMrkDocuments = (page = 1) => {
  return async (dispatch, getState, api) => {
    dispatch({ type: GET_MRK_DOCUMENT_REQUEST });
    try {
      const {
        auth: { token },
        mrkDocuments: { searchText }
      } = getState();
      const filter = new KazFilter({
        position: page * PAGE_SIZE - PAGE_SIZE,
        countFilter: PAGE_SIZE,
        orders: [],
        items: []
      });
      if (!isEmpty(searchText)) filter.items.push(
        new FilterItem({
          field: 'name',
          value: searchText,
          condition: FilterCondition.CONTAIN,
          fType: FilterFieldType.STRING
        })
      );
      const result = await api.MrkClientServiceClient.getMrkDocumentPage(
        token,
        filter
      );
      dispatch({
        type: GET_MRK_DOCUMENT_SUCCESS,
        payload: {
          ...result,
          page,
          isSearch: !isEmpty(searchText)
        }
      });
    } catch (error) {
      if (error.preconditionExceptionKey)
        notification.error({
          key: 'getMrkDocuments',
          message: error.message
        });
      dispatch({ type: GET_MRK_DOCUMENT_FAILURE });
      log(error);
    }
  };
};

export const CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

export const changeTextSearch = (text = '') => {
  return async (dispatch) => {
    dispatch({
      type: CHANGE_SEARCH_TEXT,
      payload: text
    });
  };
};
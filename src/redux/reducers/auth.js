
const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isFetching: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

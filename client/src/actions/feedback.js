export const SHOW_ERROR = 'SHOW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SHOW_INFO = 'SHOW_INFO';
export const CLEAR_INFO = 'CLEAR_INFO';

export const showError = error => {
  let id = Date.now();
  return dispatch => {
    dispatch({
      type: SHOW_ERROR,
      error: typeof error === 'object' ? error.message : error,
      id,
    });
    setTimeout(() => {
      dispatch(clearError(id));
    }, 5000);
  };
};

export const clearError = id => {
  return {
    type: CLEAR_ERROR,
    id,
  };
};

export const showInfo = info => {
  let id = Date.now();
  return dispatch => {
    dispatch({
      type: SHOW_INFO,
      info,
      id,
    });
    setTimeout(() => {
      dispatch(clearInfo(id));
    }, 5000);
  };
};

export const clearInfo = id => {
  return {
    type: CLEAR_INFO,
    id,
  };
};

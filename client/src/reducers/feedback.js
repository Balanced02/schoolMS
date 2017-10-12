import { SHOW_ERROR, CLEAR_ERROR, SHOW_INFO, CLEAR_INFO } from '../actions/feedback';

const initState = {
  errors: [],
  infos: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        errors: state.errors.concat({ error: action.error, id: action.id }),
      };

    case CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.id),
      };

    case SHOW_INFO:
      return {
        ...state,
        infos: state.infos.concat({ info: action.info, id: action.id }),
      };

    case CLEAR_INFO:
      return {
        ...state,
        infos: state.infos.filter(info => info.id !== action.id),
      };

    default:
      return state;
  }
};

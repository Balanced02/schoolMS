import { createStore } from 'redux';

import reducers from './reducers';

export default onCompletion => {
  const store = createStore(reducers);
  return store;
};

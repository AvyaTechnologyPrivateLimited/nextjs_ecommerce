import { legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers'; // Create the root reducer

const store = createStore(rootReducer); // Create the Redux store

export default store;

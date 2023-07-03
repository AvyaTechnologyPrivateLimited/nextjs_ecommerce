import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import priceRangeReducer from './priceRangeReducer';

const rootReducer = combineReducers({
  category: categoryReducer,
  priceRange: priceRangeReducer,
});

export default rootReducer;

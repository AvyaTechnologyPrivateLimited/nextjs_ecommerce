const initialState = '';

const priceRangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRICE_RANGE':
      return action.payload;
    default:
      return state;
  }
};

export default priceRangeReducer;

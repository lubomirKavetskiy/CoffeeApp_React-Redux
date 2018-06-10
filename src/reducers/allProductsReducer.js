import { 
  FETCH_DATA_BEGIN,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_DATA_END,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  allProducts: [],
};

const allProductsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        allProducts: action.payload,
      };

    case FETCH_DATA_END: 
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default allProductsReducer;

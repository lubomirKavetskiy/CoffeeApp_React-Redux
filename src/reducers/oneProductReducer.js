import { 
  FETCH_DATA_BEGIN,
  FETCH_ONE_PRODUCT_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  oneProduct: {},
};

const oneProductReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        oneProduct: action.payload,
      };

    default:
      return state;
  }
}

export default oneProductReducer;

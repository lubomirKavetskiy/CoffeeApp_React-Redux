import { 
  FETCH_DATA_BEGIN, 
  FETCH_ONE_PRODUCT_SUCCESS, 
} from './actionTypes';
import { getOneProduct } from '../ProductService';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchOneProductSuccess = product => ({
  type: FETCH_ONE_PRODUCT_SUCCESS,
  payload: product,
});

export const getOneProductData = id => {
  return dispatch => {
    dispatch(fetchDataBegin());
    getOneProduct(id).then(data => dispatch(fetchOneProductSuccess(data)));
  }
}

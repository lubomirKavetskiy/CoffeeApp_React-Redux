import { 
  FETCH_DATA_BEGIN,
  FETCH_ALL_PRODUCTS_SUCCESS,
  FETCH_DATA_END,
} from './actionTypes';
import { getAllProducts } from '../ProductService';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchAllProductsSuccess = products => ({
  type: FETCH_ALL_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchDataEnd = () => ({
  type: FETCH_DATA_END,
});

export const getAllProductsData = () => {
  return dispatch => {
    dispatch(fetchDataBegin());

    // loading will keep during 2000ms after receiving data
    getAllProducts().then(data => {
      dispatch(fetchAllProductsSuccess(data));        //1
      setTimeout(()=>dispatch(fetchDataEnd()), 2000); //2
    });
  }
    // getOneProduct(id).then(data => {
    //   dispatch(fetchOneProductSuccess(data));      //3
    //   console.log(3);
    // });
    // console.log(1);                                //1
    // setTimeout(()=>{
    //   dispatch(fetchDataEnd());                    //2
    //   console.log(2);
    // }, 100); 
}

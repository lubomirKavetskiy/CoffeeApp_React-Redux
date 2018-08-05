import { get, post } from './HttpService';

const API = `http://159.89.106.160/products`;
const endPoint = `http://159.89.106.160/products/sendemail`;

export const getAllProducts = () => get(API).then(({ data }) => data);

export const getOneProduct = id => 
  get(`${API}/${id}`).then(({ data, product }) => {
    data.forEach(obj => obj.pricingDataByWeek.forEach(obj => {
      const stringToArr = arr.week.split(`/`);
      obj.week = stringToArr.splice(0, 2).reverse().concat(stringToArr.pop()).join('/');
    }));
    return ({ 
      name: product.name,
      id: product.id,
      pricesAndDates: data,
    });
  });

export const postReport = body => post(endPoint, body);

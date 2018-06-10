import { SORT_NAME_VALUE } from "../actions/actionTypes";

const initialState = {
  sortNameValue: ``,
}

const sortNameValueReducer = (state = initialState, action) => {
  switch(action.type) {
    case SORT_NAME_VALUE:
      let sortNameValue = state.sortNameValue === `asc` ? `desc` : `asc`;
      return {
        ...state,
        sortNameValue,
      }
    default:
      return state; 
  }
}

export default sortNameValueReducer;

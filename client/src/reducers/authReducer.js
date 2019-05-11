import { FETCH_USER } from "../actions/types";

const initialState = {
  user: null
};

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    //return { ...state, user };
    default:
      return state;
  }
}

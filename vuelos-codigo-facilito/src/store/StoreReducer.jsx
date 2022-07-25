const types = {
  token: "new token",
  data: "data ",
  dataTicket: "dataTicket",
};

const initialStore = {
  token: "test",
  timeToExpire: null,
  searchedData: undefined,
  dataTicket: undefined,
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.token:
      return {
        ...state,
        token: action.payload,
      };
    case types.data:
      return {
        ...state,
        searchedData: action.payload,
      };
    case types.dataTicket:
      return {
        ...state,
        dataTicket: action.payload,
      };
    default:
      return state;
  }
};

export { initialStore, types };
export default storeReducer;

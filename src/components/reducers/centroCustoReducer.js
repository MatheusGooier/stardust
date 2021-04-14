export default function reducer(state, action) {
  console.log("ccReducer => state", state);
  console.log("ccReducer => action.payload", action.payload);
  switch (action.type) {
    case "GET_CCS":
      return {
        ...state,
        centroCustos: action.payload,
      };
    default:
      return state;
  }
}

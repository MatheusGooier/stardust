export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        centroCusto: action.payload,
      };
    default:
      return state;
  }
}

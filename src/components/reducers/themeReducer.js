export default function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      console.log("TOGGLE_THEME - action", action);
      return {
        value: action.payload ? "dark" : "light",
        currentChecked: action.payload,
      };
    case "GET_THEME":
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
}

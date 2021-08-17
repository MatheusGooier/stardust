export default function reducer(state, action) {
  switch (action.type) {
    case "GET_CC":
      return {
        ...state,
        centroCustos: action.payload,
      };
    case "UPDATE_CC":
      const updatedCC = { ...action.payload };
      const updatedCCIndex = state.centroCustos.findIndex(
        (t) => t._id === state.currentCentroCusto._id
      );
      const updatedCentroCustos = [
        ...state.centroCustos.slice(0, updatedCCIndex),
        updatedCC,
        ...state.centroCustos.slice(updatedCCIndex + 1),
      ];
      return {
        ...state,
        currentCentroCusto: {},
        centroCustos: updatedCentroCustos,
      };
    case "ADD_CC":
      const addedCCs = [...state.centroCustos, action.payload];
      return {
        ...state,
        centroCustos: addedCCs,
      };
    case "SET_CURRENT_CC":
      return {
        ...state,
        currentCentroCusto: action.payload,
      };
    case "REMOVE_CC":
      const filteredCCs = state.centroCustos.filter(
        (t) => t._id !== action.payload._id
      );
      const isRemovedCC =
        state.currentCentroCusto._id === action.payload._id
          ? {}
          : state.currentCentroCusto;
      return {
        ...state,
        currentCentroCusto: isRemovedCC,
        centroCustos: filteredCCs,
      };
    default:
      return state;
  }
}

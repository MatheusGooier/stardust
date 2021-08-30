export default function reducer(state, action) {
  switch (action.type) {
    case "GET_EVENTOS":
      return {
        ...state,
        eventos: action.payload,
      };
    case "UPDATE_EVENTO":
      const updatedEvento = { ...action.payload };
      const updatedEventoIndex = state.eventos.findIndex(
        (t) => t._id === state.currentEvento._id
      );
      const updatedEventos = [
        ...state.eventos.slice(0, updatedEventoIndex),
        updatedEvento,
        ...state.eventos.slice(updatedEventoIndex + 1),
      ];
      return {
        ...state,
        currentEvento: {},
        eventos: updatedEventos,
      };
    case "ADD_EVENTO":
      const addedEvento = [...state.eventos, action.payload];
      return {
        ...state,
        eventos: addedEvento,
      };
    case "SET_CURRENT_EVENTO":
      return {
        ...state,
        currentEvento: action.payload,
      };
    case "REMOVE_EVENTO":
      const filteredEventos = state.eventos.filter(
        (t) => t._id !== action.payload._id
      );
      const isRemovedEvento =
        state.currentEvento._id === action.payload._id
          ? {}
          : state.currentEvento;
      return {
        ...state,
        currentEvento: isRemovedEvento,
        eventos: filteredEventos,
      };
    case "SET_CALENDARDAY":
      return {
        ...state,
        calendarDay: `${action.payload.toDate()}`,
      };
    case "SET_EVENTO_TODOS":
      return {
        ...state,
        eventoTodos: action.payload,
      };
    case "ADD_EVENTO_TODOS":
      const addedTodo = [...state.eventoTodos, action.payload];
      return {
        ...state,
        eventoTodos: addedTodo,
      };
    default:
      return state;
  }
}

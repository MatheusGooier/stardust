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
        (t) => t.id === state.currentEvento.id
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
        (t) => t.id !== action.payload.id
      );
      const isRemovedEvento =
        state.currentEvento.id === action.payload.id ? {} : state.currentEvento;
      return {
        ...state,
        currentEvento: isRemovedEvento,
        eventos: filteredEventos,
      };
    case "SET_CALENDARDAY":
      return {
        ...state,
        calendarDay: action.payload,
      };
    case "SET_EVENTO_TODOS":
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BRL",
      });
      action.payload.forEach((element) => {
        console.log("element", element);
        element.fPrice = formatter.format(element.price);
      });
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

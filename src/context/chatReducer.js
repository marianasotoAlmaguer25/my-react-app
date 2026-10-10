export const initialState = {
  messages: [],
  history: [],
  isLoading: false,
  error: null,
};

export const CHAT_ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOAD_HISTORY_ITEM: 'LOAD_HISTORY_ITEM',
  CLEAR_CHAT: 'CLEAR_CHAT',
};

export function chatReducer(state, action) {
  switch (action.type) {
    case CHAT_ACTIONS.ADD_MESSAGE: {
      const updatedMessages = [...state.messages, action.payload];
      return {
        ...state,
        messages: updatedMessages,
        history:
          action.payload.role === 'user' && state.messages.length === 0
            ? [...state.history, { id: Date.now(), title: action.payload.content, messages: updatedMessages }]
            : state.history,
      };
    }
    case CHAT_ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case CHAT_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case CHAT_ACTIONS.LOAD_HISTORY_ITEM:
      return { ...state, messages: action.payload.messages };
    case CHAT_ACTIONS.CLEAR_CHAT:
      return { ...state, messages: [] };
    default:
      return state;
  }
}
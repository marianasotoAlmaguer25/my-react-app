import { useChat } from '../context/ChatContext';
import { CHAT_ACTIONS } from '../context/chatReducer';

export function History() {
  const { state, dispatch } = useChat();

  const handleSelectHistory = (item) => {
    dispatch({ type: CHAT_ACTIONS.LOAD_HISTORY_ITEM, payload: item });
  };

  const handleNewChat = () => {
    dispatch({ type: CHAT_ACTIONS.CLEAR_CHAT });
  };

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <button
        onClick={handleNewChat}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
      >
        + New Chat
      </button>

      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
        History
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2">
        {state.history.length === 0 ? (
          <p className="text-sm text-gray-500">No previous chats</p>
        ) : (
          state.history.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectHistory(item)}
              className="w-full text-left text-sm p-2 rounded hover:bg-gray-800 truncate block"
            >
              {item.title}
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
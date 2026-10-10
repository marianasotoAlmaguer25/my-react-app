import { useChat } from '../context/ChatContext';
import { CHAT_ACTIONS } from '../context/chatReducer';

export function useOllama() {
  const { state, dispatch } = useChat();

  const sendMessage = async (userPrompt) => {
    if (!userPrompt.trim()) return;

    const userMessage = { role: 'user', content: userPrompt };

    dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: userMessage });
    dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: true });

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b',
          prompt: userPrompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to local Ollama server');
      }

      const data = await response.json();

      const assistantMessage = {
        role: 'assistant',
        content: data.response,
      };

      dispatch({ type: CHAT_ACTIONS.ADD_MESSAGE, payload: assistantMessage });
    } catch (err) {
      dispatch({ type: CHAT_ACTIONS.SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: CHAT_ACTIONS.SET_LOADING, payload: false });
    }
  };

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sendMessage,
  };
}
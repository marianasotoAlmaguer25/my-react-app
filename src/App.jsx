import { ChatProvider } from './context/ChatContext';
import { History } from './components/History';
import { Chat } from './components/Chat';

function App() {
  return (
    <ChatProvider>
      <div className="flex min-h-screen">
        <History />
        <Chat />
      </div>
    </ChatProvider>
  );
}

export default App;
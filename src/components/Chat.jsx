import { useState } from 'react';
import { useOllama } from '../hooks/useOllama';

export function Chat() {
    const [input, setInput] = useState('');
    const { messages, isLoading, error, sendMessage } = useOllama();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <div className="flex-1 flex flex-col h-screen bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg max-w-xl ${msg.role === 'user'
                                ? 'bg-blue-600 text-white ml-auto'
                                : 'bg-gray-200 text-gray-800 mr-auto'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {isLoading && <p className="text-gray-500 text-sm">Thinking...</p>}
                {error && <p className="text-red-500 text-sm">Error: {error}</p>}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2 bg-white">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask DevSeek AI..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
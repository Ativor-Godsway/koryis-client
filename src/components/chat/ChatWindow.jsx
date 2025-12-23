import { useSelector } from "react-redux";

export default function ChatWindow() {
  // Get message state safely
  const messageState = useSelector((state) => state.message || {});

  // Safe destructuring with fallbacks
  const {
    messages = [],
    selectedChat = null,
    activeUser = null,
  } = messageState;

  // If no chat is selected
  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  const chatMessages = messages.filter(
    (msg) =>
      msg.senderId === selectedChat.id || msg.receiverId === selectedChat.id
  );

  return (
    <div className="h-full flex flex-col bg-[#efeae2]">
      {/* ✅ TOP BAR (WhatsApp Style) */}
      <div className="h-16 bg-[#075e54] text-white flex items-center px-4 shadow-md">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
        <h2 className="font-semibold">{selectedChat.name}</h2>
      </div>

      {/* ✅ MESSAGES AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatMessages.length === 0 && (
          <p className="text-center text-gray-500 mt-16">No messages yet</p>
        )}

        {chatMessages.map((msg, index) => {
          const isMe = msg.senderId === activeUser?.id;

          return (
            <div
              key={index}
              className={`max-w-[60%] px-4 py-2 rounded-lg text-sm break-words
              ${isMe ? "ml-auto bg-[#dcf8c6]" : "mr-auto bg-white"}`}
            >
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* ✅ INPUT AREA */}
      <div className="p-4 bg-[#f0f0f0] flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full border outline-none"
        />
        <button className="bg-[#075e54] text-white px-4 py-2 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
}

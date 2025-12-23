import { useSelector } from "react-redux";

export default function MessageBubble({ message }) {
  const { activeParentId } = useSelector((state) => state.messages);

  const isMine = message.senderId === activeParentId;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
          isMine ? "bg-[#dcf8c6]" : "bg-white"
        }`}
      >
        {message.text}
        <div className="text-[10px] text-gray-500 text-right mt-1">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

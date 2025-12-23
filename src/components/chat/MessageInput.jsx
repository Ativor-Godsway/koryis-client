import { useState } from "react";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../redux/MessageApi";

export default function MessageInput() {
  const [text, setText] = useState("");

  const { activeParentId, activeTeacherId, activeStudentId } = useSelector(
    (state) => state.messages
  );

  const [sendMessage] = useSendMessageMutation();

  const handleSend = async () => {
    if (!text.trim()) return;

    await sendMessage({
      senderType: "parent", // CHANGE to 'teacher' on teacher dashboard
      senderId: activeParentId,
      receiverType: "teacher",
      receiverId: activeTeacherId,
      studentId: activeStudentId,
      text,
    });

    setText("");
  };

  return (
    <div className="p-3 bg-gray-100 flex gap-2 items-center">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message..."
        className="flex-1 p-3 rounded-full border outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-[#25D366] text-white px-6 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  );
}

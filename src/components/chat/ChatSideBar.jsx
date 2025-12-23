import { useDispatch } from "react-redux";
import { setActiveChat } from "../../redux/MessageSlice";

export default function ChatSidebar() {
  const dispatch = useDispatch();

  // Example data (replace with your real data)
  const chats = [
    {
      studentName: "John Doe",
      parentId: "PARENT_01",
      teacherId: "TEACHER_01",
      studentId: "STUDENT_01",
    },
    {
      studentName: "Mary Sue",
      parentId: "PARENT_02",
      teacherId: "TEACHER_01",
      studentId: "STUDENT_02",
    },
  ];

  const openChat = (chat) => {
    dispatch(
      setActiveChat({
        parentId: chat.parentId,
        teacherId: chat.teacherId,
        studentId: chat.studentId,
      })
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="p-4 bg-[#075e54] text-white text-lg font-bold">
        Messages
      </div>

      {/* SEARCH */}
      <div className="p-2 bg-gray-100">
        <input
          placeholder="Search or start new chat"
          className="w-full p-2 rounded-lg border"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            onClick={() => openChat(chat)}
            className="p-3 border-b cursor-pointer hover:bg-gray-100"
          >
            <h3 className="font-semibold">{chat.studentName}</h3>
            <p className="text-sm text-gray-500 truncate">Click to open chat</p>
          </div>
        ))}
      </div>
    </div>
  );
}

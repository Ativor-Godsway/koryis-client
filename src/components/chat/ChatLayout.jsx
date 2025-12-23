import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  return (
    <div className="h-screen w-full flex bg-[#0f172a]">
      {/* LEFT - contacts */}
      <div className="w-[350px] border-r bg-white">
        <ChatSidebar />
      </div>

      {/* RIGHT - chat */}
      <div className="flex-1 bg-[#efeae2]">
        <ChatWindow />
      </div>
    </div>
  );
}

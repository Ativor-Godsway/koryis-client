import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

export function TTSButtons({ speak, stop, isSpeaking }) {
  return !isSpeaking ? (
    <button
      onClick={speak}
      className="bg-purple-200 hover:bg-purple-300 text-purple-900 font-semibold py-3 px-6 rounded-full shadow-md flex items-center gap-2 transition-all"
    >
      <HiMiniSpeakerWave className="text-3xl" /> Read Aloud
    </button>
  ) : (
    <button
      onClick={stop}
      className="bg-red-200 hover:bg-red-300 text-red-900 font-semibold py-3 px-6 rounded-full shadow-md flex items-center gap-2 transition-all"
    >
      <HiMiniSpeakerXMark className="text-3xl" /> Stop Reading
    </button>
  );
}

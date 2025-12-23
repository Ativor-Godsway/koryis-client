let currentAudio = null;

// Normalize symbols so ElevenLabs can read them
function normalizeText(text) {
  return text
    .replace(/_{2,}/g, " blank ")
    .replace(/!=/g, " not equal to ")
    .replace(/==/g, " equals equals ") // JS equality
    .replace(/=/g, " equals ")
    .replace(/\+/g, " plus ")
    .replace(/-/g, " minus ")
    .replace(/\*/g, " multiplied by ")
    .replace(/\//g, " divided by ")
    .replace(/</g, " less than ")
    .replace(/>/g, " greater than ")
    .replace(/&&/g, " and ")
    .replace(/\|\|/g, " or ")
    .replace(/!/g, " not ");
}

export async function playTTS(text, setIsSpeaking) {
  try {
    setIsSpeaking(true);

    // ✔ Clean text before sending to backend
    const cleanedText = normalizeText(text);

    const response = await fetch("http://localhost:3000/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanedText }),
    });

    const audioBuffer = await response.arrayBuffer();
    const audioBlob = new Blob([audioBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(audioBlob);

    // Stop previous audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create and play new audio
    currentAudio = new Audio(url);

    currentAudio.onended = () => setIsSpeaking(false);
    currentAudio.play();
  } catch (err) {
    console.error(err);
    setIsSpeaking(false);
  }
}

export function stopTTS(setIsSpeaking) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  setIsSpeaking(false);
}

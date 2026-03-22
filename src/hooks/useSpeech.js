import { useCallback, useRef } from 'react'

export function useSpeech() {
  const speaking = useRef(false)

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const clean = text.split('/')[0].trim()
    const utt = new SpeechSynthesisUtterance(clean)
    utt.rate = 0.82
    utt.pitch = 1.0
    utt.lang = 'en-US'
    utt.onstart = () => { speaking.current = true }
    utt.onend = () => { speaking.current = false }
    window.speechSynthesis.speak(utt)
  }, [])

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel()
    speaking.current = false
  }, [])

  return { speak, cancel }
}
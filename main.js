import './style.css'
import javascriptLogo from './javascript.svg'
import {
  setupCounter
} from './counter.js'

const txtArea = document.querySelector('textarea')
let speechBtn = document.querySelector('button')
let voiceList = document.querySelector('select')
let isSpeaking = true
let synth = speechSynthesis



function voices() {
  for (let voice of synth.getVoices()) {
    console.log(voice);
    //selecting google US Eng as default
    let selected = voice.name == "Google US English" ? "selected" : ''
    let options = `<option value="${voice.name}" ${selected}>${voice.name} ${voice.lang}</option>`
    voiceList.insertAdjacentHTML('beforeend', options)
  }
}

synth.addEventListener("voiceschanged", voices)

function txtToSpeech(text) {
  let utternance = new SpeechSynthesisUtterance(text)
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utternance.voice = voice
    }
  }
  synth.speak(utternance)
}

speechBtn.addEventListener('click', e => {
  e.preventDefault()
  if (txtArea.value !== '') {
    if (!synth.speaking) {
      txtToSpeech(txtArea.value)
    }

    if (txtArea.value.length > 80) {
      setInterval(()=>{
        if(!synth.speaking && !isSpeaking){
          isSpeaking=true
          speechBtn.innerText='Convert to Speech'
        }
      },500);
      if (isSpeaking) {
        synth.resume()
        isSpeaking = false
        speechBtn.innerText = 'Pause speech'
      } else {
        synth.pause()
        isSpeaking = true
        speechBtn.innerText = 'Resume Speech'
      }
    }
      else{
        speechBtn.innerText='Convert to Speech'
      }
    }
  })
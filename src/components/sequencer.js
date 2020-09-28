import React, { useState, useEffect } from 'react'
import SequencerRow from './sequencer-row'
import { BsFillPlayFill, BsFillPauseFill, BsFillStopFill, BsMusicNote } from 'react-icons/bs';
import { CgMathEqual } from 'react-icons/cg'

const Sequencer = () => {

  // Playthrough states
  const [tempo, setTempo] = useState(90)
  const [playing, setPlay] = useState(false)
  const [beat, changeBeat] = useState(-1)

  const freq = (tempo >= 1) ? 60000/(tempo * 4) : 1666

  // Play controls
  const stop = () => {
    setPlay(false)
    changeBeat(-2)
  }

  const playPause = () => {
    setPlay(!playing)
    changeBeat(beat)
  }

  const updateBeat = () => {
    if (playing) {
      changeBeat(beat => ((beat + 1) % 16))
    }
  }

  const keyPressHandler = (e) => {
    if (e.key === " ") {
      e.preventDefault()
      playPause()
    }
    if (e.key === "s") {
      stop()
    }
  }

  useEffect(() => { // This gets called multiple times somehow
    // Event Listener for keypresses (start/ stop with space)
    document.addEventListener('keydown', keyPressHandler);

    // Update Spot
    setTimeout(function(){
      updateBeat()
    }, freq) ;

    return () => {
      // cleanup event listener
      document.removeEventListener('keydown', keyPressHandler);
    };
  });

  return (
    <div className="sequencer">
      <div className="sequence-controls">
        { playing
          ? <BsFillPauseFill
            style = {{ fontSize: "30px" }}
            onClick={() => playPause()}
          />
          : <BsFillPlayFill
            style = {{ fontSize: "30px" }}
            onClick={() => playPause()}
          />
        }
        <BsFillStopFill
          style = {{ fontSize: "30px" }}
          onClick={() => stop()}
          />
        <div style = {{ fontSize: "15px" }}>
          <BsMusicNote />
          <CgMathEqual />
          <input value={tempo} onChange={ event => setTempo(event.target.value)}/>
        </div>
      </div>
      <div className="sequencer-rows">
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
        <SequencerRow beat={beat}/>
      </div>
    </div>
  )
}

export default Sequencer

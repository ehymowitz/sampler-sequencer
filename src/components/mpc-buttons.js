import React, { useState } from 'react'
import { MembraneSynth, MetalSynth } from "tone"
import Modali, { useModali } from 'modali';
import Select from 'react-select';

// Init Synths
const Memsynth = new MembraneSynth().toDestination()
const MetSynth = new MetalSynth().toDestination()

// Select Parameters
const notes = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
]

const octaves = [
  { value: '0', label: '0', },
  { value: '1', label: '1', },
  { value: '2', label: '2', },
  { value: '3', label: '3', },
  { value: '4', label: '4', },
  { value: '5', label: '5', },
  { value: '6', label: '6', },
  { value: '7', label: '7', },
  { value: '8', label: '8', },
]

const synths = [
  { value: Memsynth, label: 'Membrane' },
  { value: MetSynth, label: 'Metallic' },
]

function MpcButton() {

  // Select States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctaves] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])

  // Modal State
  const [modal, toggleModal] = useModali({
    animated: true,
    title: "New Tone"
  });

  // Events MGMT
  let t0 = 0

  const handleMouseDown = () => {
    synth.value.triggerAttackRelease(`${note.value}${octave.value}`, "2n")
    t0 = performance.now()
  }

  const handleMouseUp = () => {
    if ( performance.now() - t0 > 500 ) {
      toggleModal()
    }
  }

  return (
    <React.Fragment>
      <Modali.Modal {...modal}>
        <Select
          options={notes}
          value={note}
          onChange={(selectedOption) => setNote(selectedOption)}
        />
        <Select
          options={octaves}
          value={octave}
          onChange={(selectedOption) => setOctaves(selectedOption)}
        />
        <Select
          options={synths}
          value={synth}
          onChange={(selectedOption) => setSynth(selectedOption)}
        />
      </Modali.Modal>
      <div className = 'mpc-button' onMouseDown={()=> {handleMouseDown()}} onMouseUp={()=>{handleMouseUp()}}/>
    </React.Fragment>
  )
}

export default function MpcButtons() {

  return (
    <div className = 'button-container'>
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
      <MpcButton />
    </div>
  )
}
import React, { useState } from 'react'
import Select from 'react-select'
import { FiMoreVertical } from 'react-icons/fi'
import SequencerNode from './sequencer-node'
import Switch from '@material-ui/core/Switch'
import { notes, octaves, synths } from '../data/synth-data'

const SequencerRow = ({ beat }) => {

  const options = Object.keys(localStorage).reverse()
    .filter(key => {
      return(
        key.startsWith("hosted.") || key.startsWith("loaded.")
      )
    })
    .map(key => {
      return({
        value: key,
        label: key.split(/[/]/)[key.split(/[/]/).length-1].split("loaded.")
      })
    })

  // Select States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])
  const [drumSound, setDrumSound] = useState(options[0])

  // Switch State
  const [switchState, changeSwitch] = useState(false)

  // Switch Styling
  const selectStyle = {
    valueContainer: () => ({
      width: switchState ? "100px" : "600px",
      paddingLeft: "20px"
    })
  }

  return (
    <React.Fragment>
      <div className="select-container">
        { switchState ?
          <>
            <Select
            styles={selectStyle}
            options={synths}
            value={synth}
            onChange={selectedOption => setSynth(selectedOption)}
            />
            <Select
            styles={selectStyle}
            options={notes}
            value={note}
            onChange={selectedOption => setNote(selectedOption)}
            />
            <Select
            styles={selectStyle}
            options={octaves}
            value={octave}
            onChange={selectedOption => setOctave(selectedOption)}
            />
          </> :
          <Select
          styles={selectStyle}
          value={drumSound}
          options={options}
          onChange={selectedOption => setDrumSound(selectedOption)}
          />
        }

        <div className="switch-container">
          <Switch
            checked={switchState}
            onChange={() => changeSwitch(!switchState)}
            color="default"
            size="small"
            />
        </div>
      </div>

      <div className="audio-nodes">
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {0}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {1}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {2}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {3}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {4}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {5}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {6}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {7}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {8}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {9}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {10}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {11}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {12}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {13}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {14}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {15}
          switchState = {switchState}
          drum = {drumSound ? `${drumSound.value}` : ""}
          />
      </div>
    </React.Fragment>
  )
}

export default SequencerRow

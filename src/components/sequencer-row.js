import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { FiMoreVertical } from 'react-icons/fi'
import SequencerNode from './sequencer-node'
import Switch from '@material-ui/core/Switch'
import axios from 'axios'
import { notes, octaves, synths, drumSounds, firestore } from '../data/synth-data'

const SequencerRow = ({ beat }) => {

  // Select States
  const [note, setNote] = useState(notes[0])
  const [octave, setOctave] = useState(octaves[0])
  const [synth, setSynth] = useState(synths[0])
  const [drumSound, setDrumSound] = useState(drumSounds[0])

  // Switch State
  const [switchState, changeSwitch] = useState(false)

  // Switch Styling
  const selectStyle = {
    valueContainer: () => ({
      width: switchState ? "100px" : "418px",
      paddingLeft: "20px"
    })
  }

  useEffect(()=> {
    if(drumSound) {
      const fileName=`DrumSounds/${drumSound.value}`
      const dataRef = firestore.ref(fileName)
      dataRef.getDownloadURL().then(function(url) {
        axios({
          responseType: 'blob',
          url: url,
          method: 'get',
        }).then((res) => {
          const reader = new FileReader()
          reader.addEventListener("loadend", () => {
            sessionStorage.setItem(fileName, reader.result.toString())
          })
          reader.readAsDataURL(res.data)
        })
      }).catch(function(error){
        console.log(error)
      })
    }
  })

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
        options={drumSounds}
        value={drumSound}
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
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {1}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {2}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {3}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {4}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {5}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {6}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {7}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {8}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {9}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {10}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {11}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <FiMoreVertical style = {{ fontSize: "20px"}} />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {12}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {13}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {14}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
        <SequencerNode
          beat = {beat}
          note = {note}
          octave = {octave}
          synth = {synth}
          spot = {15}
          switchState = {switchState}
          drum = {drumSound ? `DrumSounds/${drumSound.value}` : ""}
          />
      </div>
    </React.Fragment>
  )
}

export default SequencerRow

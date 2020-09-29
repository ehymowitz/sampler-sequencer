import React, { useState, useEffect } from 'react'
import { Collapse } from 'react-collapse'
import Select from 'react-select'
import { notes, octaves, synths, citizenDjSounds, firestore } from '../data/synth-data'
import Switch from '@material-ui/core/Switch';
import axios from 'axios'
import * as Tone from 'tone'

const MpcButtonPair = ({left, right}) => {

  // Tone States
  const [note1, setNote1] = useState(notes[0])
  const [note2, setNote2] = useState(notes[0])

  const [octave1, setOctave1] = useState(octaves[0])
  const [octave2, setOctave2] = useState(octaves[0])

  const [synth1, setSynth1] = useState(synths[0])
  const [synth2, setSynth2] = useState(synths[0])

  const [dj1, setDj1] = useState(citizenDjSounds[0])
  const [dj2, setDj2] = useState(citizenDjSounds[0])

  // Menu State
  const [menuOpened1, setMenu1] = useState(false)
  const [menuOpened2, setMenu2] = useState(false)

  // Switch States
  const [switchState1, changeSwitch1] = useState(false)
  const [switchState2, changeSwitch2] = useState(false)

  // Switch Styling
  const selectStyle1 = {
    valueContainer: () => ({
      width: switchState1 ? "125px" : "500px",
      paddingLeft: "20px"
    })
  }

  const selectStyle2 = {
    valueContainer: () => ({
      width: switchState2 ? "125px" : "500px",
      paddingLeft: "20px"
    })
  }

  // Events MGMT
  let t0

  const handleDown = (synth, note, octave, dj, switchOn) => {
    Tone.start()
    t0 = performance.now()
    setMenu1(false)
    setMenu2(false)
    if (switchOn) {
      synth.triggerAttackRelease(`${note}${octave}`, "2n")
    }
    if (!switchOn && dj) {
      const sound = sessionStorage.getItem(dj)
      const audio = new Audio(sound)
      audio.play()
    }
  }

  const handleUp = (menuToggle, menuOpened, menuNonToggle) => {
    if ( performance.now() - t0 > 500 ) {
      menuToggle(!menuOpened)
      menuNonToggle(false)
      t0 = 0
    }
  }

  useEffect(()=> {
    if(dj1) {
      const fileName=`CitizenDJ/Dialect Samples/${dj1.value}`
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

  useEffect(()=> {
    if(dj2) {
      const fileName=`CitizenDJ/Dialect Samples/${dj2.value}`
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
      <div className="button-container">
        <div
          className = {menuOpened1 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleDown(synth1.value, note1.value, octave1.value, dj1 ? `CitizenDJ/Dialect Samples/${dj1.value}` : "", switchState1)
          }}
          onMouseUp={()=>{
            handleUp(setMenu1, menuOpened1, setMenu2)
          }}
          onTouchStart={()=> {
            handleDown(synth1.value, note1.value, octave1.value, dj1 ? `CitizenDJ/Dialect Samples/${dj1.value}` : "", switchState1)
          }}
          onTouchEnd={()=>{
            handleUp(setMenu1, menuOpened1, setMenu2)
          }}
        />
        <div
          className = {menuOpened2 ? 'mpc-button ripple menuOpened' : 'mpc-button ripple'}
          onMouseDown={()=> {
            handleDown(synth2.value, note2.value, octave2.value, dj2 ? `CitizenDJ/Dialect Samples/${dj2.value}` : "", switchState2)
          }}
          onMouseUp={()=>{
            handleUp(setMenu2, menuOpened2, setMenu1)
          }}
          onTouchStart={()=> {
            handleDown(synth2.value, note2.value, octave2.value, dj2 ? `CitizenDJ/Dialect Samples/${dj2.value}` : "", switchState2)
          }}
          onTouchEnd={()=>{
            handleUp(setMenu2, menuOpened2, setMenu1)
          }}
        />
      </div>
      <Collapse isOpened={menuOpened1}>
        { switchState1 ?
          <>
            <Select
              styles={selectStyle1}
              options={synths}
              value={synth1}
              onChange={selectedOption => setSynth1(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={notes}
              value={note1}
              onChange={selectedOption => setNote1(selectedOption)}
            />
            <Select
              styles={selectStyle1}
              options={octaves}
              value={octave1}
              onChange={selectedOption => setOctave1(selectedOption)}
            />
          </> :
          <Select
            styles={selectStyle1}
            options={citizenDjSounds}
            value={dj1}
            onChange={selectedOption => setDj1(selectedOption)}
          />
        }

        <div className="switch-container">
          <Switch
            checked={switchState1}
            onChange={() => changeSwitch1(!switchState1)}
            color="default"
            size="small"
            />
        </div>
      </Collapse>
      <Collapse isOpened={menuOpened2}>
      { switchState2 ?
        <>
          <Select
            styles={selectStyle2}
            options={synths}
            value={synth2}
            onChange={selectedOption => setSynth2(selectedOption)}
          />
          <Select
            styles={selectStyle2}
            options={notes}
            value={note2}
            onChange={selectedOption => setNote2(selectedOption)}
          />
          <Select
            styles={selectStyle2}
            options={octaves}
            value={octave2}
            onChange={selectedOption => setOctave2(selectedOption)}
          />
        </> :
        <Select
          styles={selectStyle2}
          options={citizenDjSounds}
          value={dj2}
          onChange={selectedOption => setDj2(selectedOption)}
        />
      }
        <div className="switch-container">
          <Switch
            checked={switchState2}
            onChange={() => changeSwitch2(!switchState2)}
            color="default"
            size="small"
            />
        </div>
      </Collapse>
    </React.Fragment>
  )
}

const Mpc = () => {
  return (
    <div className = 'mpc-buttons'>
      <MpcButtonPair left={"t"} right={"u"}/>
      <MpcButtonPair left={"f"} right={"j"}/>
      <MpcButtonPair left={"v"} right={"n"}/>
    </div>
  )
}

export default Mpc

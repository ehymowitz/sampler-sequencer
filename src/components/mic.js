import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { citizenDjSounds, drumSounds, firestore} from '../data/synth-data'
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs'
import Dropzone from 'react-dropzone'

const Mic = () => {

  // Initialize some sounds
  useEffect(() => {
    handleAddHosted({
      value: "Akai_MPC-X__36kick_kg.mp3",
      label: "Akai 36kick kg"}, "DrumSounds/")
    handleAddHosted({
      value: "Akai_MPC-X__60_snare_sa.mp3",
      label: "Akai 60 snare sa"}, "DrumSounds/")
    handleAddHosted({
      value: "Roland_CR79__46hat_open_modified_h.mp3",
      label: "Roland 46hat open modified h"}, "DrumSounds/")
    handleAddHosted({
      value: "Conversation-with-10-year-old-black-female-Washington-DC_afccal000391_006_00-04-20.wav",
      label:"Conversation with 10 year old black female Washington DC 006"}, "CitizenDJ/Dialect Samples/")
    handleAddHosted({
      value: "Conversation-with-12-year-old-white-female-Detroit-Michigan_afccal000127_028_00-21-05.wav",
      label: "Conversation with 12 year old white female Detroit Michigan 028"}, "CitizenDJ/Dialect Samples/")
    handleAddHosted({
      value: "Oral-history-with-89-year-old-male-Whick-Kentucky_afccal000357_013_00-07-16.wav",
      label: "Oral history with 89 year old male Whick Kentucky 013"}, "CitizenDJ/Dialect Samples/")
  },[])

  // Initialize State
  const [userFiles, setUserFiles] = useState(
    new Set(Object.keys(localStorage).filter(key => key.startsWith("loaded.")))
  )

  const [hostedFiles, setHostedFiles] = useState(
    new Set(Object.keys(localStorage).filter(key => key.startsWith("hosted.")))
  )

  // User File Uploads
  const handleUserFiles = (items) => {
    items.forEach(item => {
      if (item.type === "audio/mpeg") {
        const reader = new FileReader()
        reader.addEventListener("loadend", () => {
          localStorage.setItem(`loaded.${item.name}`, reader.result.toString())
          setUserFiles(
            Object.keys(localStorage).filter(key => key.startsWith("loaded."))
          )
        })
        reader.readAsDataURL(item)
      }
    })
  }

  // Play Sounds
  const handleMenuPlay = (file) => {
    const sound = localStorage.getItem(file)
    const audio = new Audio(sound)
    audio.play()
  }

  // Delete Sounds
  const deleteItem = (file, filter, state) => {
    localStorage.removeItem(file)
    state(Object.keys(localStorage).filter(key => key.startsWith(filter)))
  }

  // Load Hosted Sounds
  const handleAddHosted = (item, string) => {
    const dataRef = firestore.ref(`${string}${item.value}`)
    dataRef.getDownloadURL().then(function(url) {
      axios({
        responseType: 'blob',
        url: url,
        method: 'get',
      }).then((res) => {
        const reader = new FileReader()
        reader.addEventListener("loadend", () => {
          localStorage.setItem(`hosted.${string}${item.label}`, reader.result.toString())
          setHostedFiles(
            Object.keys(localStorage).filter(key => key.startsWith("hosted."))
          )
        })
        reader.readAsDataURL(res.data)
      })
    }).catch(function(error){
      console.log(error)
    })
  }

  return (
    <div className="mic-container">
      <Dropzone onDrop= {acceptedFiles => handleUserFiles(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag in or click to add your audio files here! They'll be accessible on the other parts of the app</p>
          </div>
        )}
      </Dropzone>
      <h2>User Uploaded Files - Only you can see these</h2>
      <ul>
        {[...userFiles].map((item, key) => {
          return(
            <li
              key={key}
            >
              <p onMouseDown={()=>{handleMenuPlay(item)}}>
                {item.split("loaded.")[1]}
              </p>
              <BsFillTrashFill onMouseDown={()=>deleteItem(item, "loaded.", setUserFiles)} />
            </li>
          )
        })}
      </ul>
      <h2>Online Hosted Files - Select the ones you want to use, they'll appear on the other pages</h2>
      <h3>Drums Samples</h3>
        <Select
          options={drumSounds}
          onChange={selectedOption=>handleAddHosted(selectedOption, "DrumSounds/")}
        />
        <ul>
          {[...hostedFiles].filter(item => item.startsWith("hosted.Drum")).map((item, key) => {
            return(
              <li
                key={key}
              >
                <p onMouseDown={()=>{handleMenuPlay(item)}}>
                  {item.split("hosted.")[1].split("/")[1]}
                </p>
                <BsFillTrashFill onMouseDown={()=>deleteItem(item, "hosted.", setHostedFiles)} />
              </li>
            )
          })}
        </ul>
      <h3>Vocal Samples</h3>
        <Select
          options={citizenDjSounds}
          onChange={selectedOption=>handleAddHosted(selectedOption, "CitizenDJ/Dialect Samples/")}
        />
        <ul>
          {[...hostedFiles].filter(item => item.startsWith("hosted.CitizenDJ")).map((item, key) => {
            return(
              <li
                key={key}
              >
                <p onMouseDown={()=>{handleMenuPlay(item)}}>
                  {item.split("hosted.")[1].split("/")[2]}
                </p>
                <BsFillTrashFill onMouseDown={()=>deleteItem(item, "hosted.", setHostedFiles)} />
              </li>
            )
          })}
        </ul>
    </div>
  )
}

export default Mic

import React, { useState } from 'react'
import Select from 'react-select'
import { citizenDjSounds, drumSounds, firestore} from '../data/synth-data'
import axios from 'axios'
import { BsFillTrashFill } from 'react-icons/bs'
import Dropzone from 'react-dropzone'

const Mic = () => {

  const [userFiles, setUserFiles] = useState(
    new Set(Object.keys(localStorage).filter(key => key.startsWith("loaded.")))
  )

  const [hostedFiles, setHostedFiles] = useState(
    new Set(Object.keys(localStorage).filter(key => key.startsWith("hosted.")))
  )

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

  const handleMenuPlay = (file) => {
    const sound = localStorage.getItem(file)
    const audio = new Audio(sound)
    audio.play()
  }

  const deleteItem = (file, filter, state) => {
    localStorage.removeItem(file)
    state(Object.keys(localStorage).filter(key => key.startsWith(filter)))
  }

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

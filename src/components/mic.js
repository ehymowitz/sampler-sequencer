import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import Dropzone from 'react-dropzone'

const Mic = () => {

  const [files, setFiles] = useState(
    new Set(Object.keys(localStorage).filter(key => key.startsWith("sample.")))
  )

  const handleFiles = (files) => {
    files.forEach(item => {
      if (item.type === "audio/mpeg") {
        const reader = new FileReader()
        reader.addEventListener("loadend", () => {
          localStorage.setItem(`sample.${item.name}`, reader.result.toString())
          setFiles(
            Object.keys(localStorage).filter(key => key.startsWith("sample."))
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

  const deleteItem = (file) => {
    localStorage.removeItem(file)
    setFiles(Object.keys(localStorage).filter(key => key.startsWith("sample.")))
  }

  return (
    <div className="mic-container">
      <Dropzone onDrop= {acceptedFiles => handleFiles(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag in or click to add your audio files here! They'll be accessible on the other parts of the app</p>
          </div>
        )}
      </Dropzone>
      <h2>User Uploaded Files (Only you can see these)</h2>
      <ul>
        {[...files].map((item, key) => {
          return(
            <li
              key={key}
            >
              <p onMouseDown={()=>{handleMenuPlay(item)}}>
                {item.split("sample.")[1]}
              </p>
              <BsFillTrashFill onMouseDown={()=>deleteItem(item)} />
            </li>
          )
        })}
      </ul>
      <h2>Online Hosted Files (Select the ones you want to use, they'll appear on the other pages)</h2>
      <p>todo</p>
    </div>
  )
}

export default Mic

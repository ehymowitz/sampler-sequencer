import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const Mic = () => {

  const [files, setFiles] = useState(
    new Set(
      Object.keys(localStorage).map(key => key) // change to filter for keys starting with sample.
    )
  )

  const handleFiles = (files) => {
    const reader = new FileReader()
    files.forEach(item => {
      if (item.type === "audio/mpeg") {
        reader.readAsDataURL(item)
        reader.addEventListener("loadend", () => {
          localStorage.setItem(`sample.${item.name}`, reader.result.toString())
          setFiles(Object.keys(localStorage).map(key => key)) // change to filter for keys starting with sample.
        })
      }
    })
  }

  return (
    <div className="mic-container">
      <Dropzone onDrop= {acceptedFiles => handleFiles(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag your audio files here! They'll be accessible on the other parts of the app</p>
          </div>
        )}
      </Dropzone>
      <ul>
        {[...files].map((item, key) => {
          return(
            <li key={key}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Mic

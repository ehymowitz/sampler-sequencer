import React from 'react'
import Dropzone from 'react-dropzone'

const Mic = () => {

  const handleFiles = (files) => { // working here
    const reader = new FileReader()
    files.forEach(item => {
      if (item.type === "audio/mpeg") {
        console.log(item)
        reader.readAsDataURL(item)
      }
      reader.addEventListener("loadend", (item.name) => {
        sessionStorage.setItem(item.name, reader.result.toString())
      })
    })
    console.log(sessionStorage)
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
    </div>
  )
}

export default Mic

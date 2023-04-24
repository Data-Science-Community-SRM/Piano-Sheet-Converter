import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["WAV"];

const Uploader = (props) => {
  const handleChange = (file) => {
    props.setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
      <div className="text-2xl p-8 text-center rounded border-dashed border-2">
        <p><i className="fa-solid fa-music"></i>&nbsp;{props.file ?props.file.name : 'Drag and Drop your audio files here'}</p>
      </div>
    </FileUploader>
  );
}

export default Uploader;
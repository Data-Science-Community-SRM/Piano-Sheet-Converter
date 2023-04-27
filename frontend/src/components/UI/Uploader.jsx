import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Error from "./Error";

const fileTypes = ["WAV"];

const Uploader = (props) => {
  const [error, setError] = useState(null);

  const handleChange = (file) => {
    props.setFile(file);
  };

  const handleTypeError = (errors) => {
    setError(errors);
  }

  return (
    <>
      <FileUploader handleChange={handleChange} onTypeError={handleTypeError} name="file" types={fileTypes}>
        <div className="text-2xl p-8 text-center rounded border-dashed border-2">
          <p><i className="fa-solid fa-music"></i>&nbsp;{props.file ?props.file.name : 'Drag and Drop your audio files here'}</p>
        </div>
      </FileUploader>
      {error && <Error message={error} />}
    </>
  );
}

export default Uploader;
import React, {useState} from 'react'
import Uploader from './Uploader'
import Progress from '../UI/Progress';

const Form = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      });
      if(response.ok){
        const data = await response.json();
        console.log(data, response.status);
      }
      else throw Error('Something Went Wrong', response.status)
    }
    catch(error){
      console.log(error);
    }
    finally{
      setFile(null)
      setLoading(false);
      document.getElementById('my-modal-3').checked = false;
    }
  }

  return (
    <>{
      loading ? <Progress /> : 
      <>
        <h3 className="font-bold text-lg mb-8">Upload music file</h3>
        <form method="post" encType='multipart/form-data' onSubmit={submitHandler}>
            <Uploader setFile={setFile} file={file}/>
            <div className={`modal-action ${file ? "":"hidden"}`}>
                <label htmlFor="my-modal-3" className="text-xl btn btn-outline text-white hover:bg-white hover:text-secondary"><input type="submit" className='w-full h-full' value="Convert"/></label>
            </div>
        </form>
      </>
    }</>
  )
}

export default Form
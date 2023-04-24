import React, {useState} from 'react'
import Uploader from '../UI/Uploader'

const Form = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      setFile(null)
      document.getElementById('my-modal-5').checked = false;
    }, 10000);
  }

  return (
    <>{
      loading ? 
      <div className='mx-auto w-56'>
        <h1 htmlFor="progress" className='text-2xl text-center'>Converting</h1>
        <progress id='progress' className="mx-auto my-8 progress progress-secondary w-56 text-white bg-white"></progress>
      </div>
      : 
      <>
        <h3 className="font-bold text-lg mb-8">Upload music file</h3>
        <form action="" method="post" encType='multipart/form-data' onSubmit={submitHandler}>
            <Uploader setFile={setFile} file={file}/>
            <div className="modal-action">
                <label htmlFor="my-modal-5" className="text-xl btn btn-outline text-white hover:bg-white hover:text-secondary"><input type="submit" value="Convert" /></label>
            </div>
        </form>
      </>
    }</>
  )
}

export default Form
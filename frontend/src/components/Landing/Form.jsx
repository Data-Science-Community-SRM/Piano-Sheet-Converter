import React, {useState} from 'react'
import Uploader from '../UI/Uploader'
import Progress from '../UI/Progress';

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
      loading ? <Progress /> : 
      <>
        <h3 className="font-bold text-lg mb-8">Upload music file</h3>
        <form action="" method="post" encType='multipart/form-data' onSubmit={submitHandler}>
            <Uploader setFile={setFile} file={file}/>
            <div className={`modal-action ${file ? "":"hidden"}`}>
                <label htmlFor="my-modal-5" className="text-xl btn btn-outline text-white hover:bg-white hover:text-secondary"><input type="submit" className='w-full h-full' value="Convert"/></label>
            </div>
        </form>
      </>
    }</>
  )
}

export default Form
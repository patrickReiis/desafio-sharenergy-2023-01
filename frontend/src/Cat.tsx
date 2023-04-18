import {SyntheticEvent, useEffect, useState, useRef} from 'react';
import './Cat.css';

function Cat() {
  const [imageUrl, setImageUrl] = useState('');
  const inputHttpCode = useRef<HTMLInputElement>(null);

  useEffect(() => {
  }, []);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const getCatImg = async () => {
      try {
        const code = inputHttpCode.current?.value
        const response = await fetch('/api/v1/catHTTP/?code=' + code);

        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (e) {
        console.log('Error during GET cat: ', e);
      }
    }

    getCatImg();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="Cat-form">
        <input required ref={inputHttpCode} placeholder='http status code' className="Cat-number" type="number"/>
        <input className='Cat-submit' value="Get Image" type="submit"/>
      </form>
      <div className='Cat-image'>
        {imageUrl && <img src={imageUrl} alt="cat"/>}
      </div>
    </div>

  )
}

export default Cat

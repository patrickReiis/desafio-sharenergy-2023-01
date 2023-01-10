import {useState} from "react"
import DogRefresh from './icons/Dog/refreshDog.png';
import './Dog.css'

function Dog() {
  const [dogUrl, setDogUrl] = useState('');

  async function handleClick() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/v1/randomDog');
      const url = await response.json()

      if (response.ok) {
        setDogUrl(url.url);
      }
      setIsLoading(false)
    } catch (e) {
      console.log('Error during GET dog: e', e);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="Dog-container">
        <img className="Dog-refresh" onClick={handleClick} src={DogRefresh} alt="refresh button"/>
        <div className="Dog-img">
          {dogUrl && <img src={dogUrl} alt="dog"/>}
        </div>
      </div>
      {isLoading === true ? <h1 className="Dog-loading">Loading...</h1> : ''}
    </div>
  )
}

export default Dog

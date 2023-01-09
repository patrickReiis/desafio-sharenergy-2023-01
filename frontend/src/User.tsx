import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { IUser } from './IUser';
import './User.css';

function User() {
  const navigate = useNavigate();
  const userId = window.location.pathname.slice('/user/'.length);
  const [user, setUser] = useState({} as IUser)

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('../api/v1/user/' + userId);

        if (response.ok) {
          const user = await response.json();
          setUser(user)
          return
        }
        navigate('/users');
      } catch(e) {
        console.log('Error during GET specific user: ', e)
      }

    }
    getUser();
  }, [navigate, userId])

  return (
    <div>
      <h2 className="User-title-name">{user.name}</h2>
      <form className="User__form">
        <div>
          <label htmlFor="user-name">Name</label>
          <input type="text" id="user-name" defaultValue={user.name} />
        </div>
        <div>
          <label htmlFor="user-email">Email</label>
          <input type="email" id="user-email" defaultValue={user.email} />
        </div>
        <div>
          <label htmlFor="user-phone">Phone</label>
          <input type="number" id="user-phone" defaultValue={user.phone} />
        </div>
        <div>
          <label htmlFor="user-address">Address</label>
          <input type="text" id="user-address" defaultValue={user.address}/>
        </div>
      </form>
    </div>
  )
}

export default User

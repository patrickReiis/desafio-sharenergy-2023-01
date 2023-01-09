import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import { IUser } from './IUser';
import './User.css';

function User() {
  const navigate = useNavigate();
  const userId = window.location.pathname.slice('/user/'.length);
  const [user, setUser] = useState({} as IUser)
  const [deleteOrUpdate, setDeleteOrUpdate] = useState('' as ''|'update'|'delete');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const inputCPF = useRef<HTMLInputElement>(null);
  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPhone = useRef<HTMLInputElement>(null);
  const inputAddress = useRef<HTMLInputElement>(null);

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

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (deleteOrUpdate === 'update') {
      try {
        const response = await fetch('../api/v1/user/' + userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            name: inputName.current?.value,
            email: inputEmail.current?.value,
            phone: Number(inputPhone.current?.value),
            address: inputAddress.current?.value
          })
        });
        console.log(response);

        if (response.ok) {
          navigate('/user/' + userId);
          setSuccessMsg('User updated successfully');
          setErrorMsg('');
          return
        }       

        setErrorMsg('Couldn\'t update the user')
        setSuccessMsg('');


      } catch (e) {
        console.log('Error during update user: ', e);
        setErrorMsg('Server error. It\'s our fault');
        setSuccessMsg('');
      }
    }

    if (deleteOrUpdate === 'delete') {
      try {
        const response = await fetch('../api/v1/user/' + userId, {
          method: 'DELETE'
        });

        if (response.ok) {
          setSuccessMsg('User deleted successfully');
          setErrorMsg('');
          navigate('/users');
        }
        setErrorMsg('Couldn\'t delete the user');
        setSuccessMsg('')
      } catch(e) {
        console.log('Error during DELETE user: ', e)
        setErrorMsg('Couldn\'t delete the user');
        setSuccessMsg('')
      }
    }
  }

  return (
    <div>
      <h2 className="User-title-name">{user.name}</h2>
      <form className="User__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user-CPF">CPF</label>
          <input ref={inputCPF} readOnly type="text" id="user-CPF" defaultValue={user.CPF} />
        </div>
        <div>
          <label htmlFor="user-name">Name</label>
          <input ref={inputName} required type="text" id="user-name" defaultValue={user.name} />
        </div>
        <div>
          <label htmlFor="user-email">Email</label>
          <input ref={inputEmail } required type="email" id="user-email" defaultValue={user.email} />
        </div>
        <div>
          <label htmlFor="user-phone">Phone</label>
          <input ref={inputPhone } required type="number" id="user-phone" defaultValue={user.phone} />
        </div>
        <div>
          <label htmlFor="user-address">Address</label>
          <input ref={inputAddress} required type="text" id="user-address" defaultValue={user.address}/>
        </div>
        <div id="User-submit-container">
          <input onClick={() => {setDeleteOrUpdate('update')}} type="submit" id="User-update" value="Update"/>
          <input onClick={() => {setDeleteOrUpdate('delete')}} type="submit" id="User-delete" value="Delete"/>
        </div>
      </form>

      <ErrorMsg errorMsg={errorMsg}/>
      <SuccessMsg successMsg={successMsg}/>
    </div>
  )
}

function SuccessMsg(props: {successMsg: string}) {
  return props.successMsg.length === 0 ?
    <div></div> : (
      <div className="User-success-msg">
        {props.successMsg}
      </div>
    )
}

function ErrorMsg(props: {errorMsg: string}) {
  return props.errorMsg.length === 0 ?
    <div></div> : (
      <div className="User-error-msg">
        {props.errorMsg}
      </div>
    )
}

export default User

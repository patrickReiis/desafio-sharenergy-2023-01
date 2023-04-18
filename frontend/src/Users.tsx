import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import './Users.css';
import { IUser } from './IUser';

function Users () {
  const navigate = useNavigate();
  const [users, setUsers] = useState([] as IUser[]);

  useEffect(() => {
    const getUsersRequest = async () => {
      try {
        const response = await fetch('api/v1/users');
        if (response.ok) {
          const users = await response.json();
          setUsers(users);
          console.log(users);
        }
      }
      catch (e) {
        console.log('Error happened during get users: ', e);
        return
      }
    }
    getUsersRequest();
  }, [])

  if (users.length === 0) {
    return (
      <div>
        <Link to="add" className="Users-add">
          Add user
        </Link>
        <div className="Users-noUsers">
          Ops! No users found
        </div>
      </div>
    )
  } 

  function handleClick(CPF: IUser['CPF']) {
    navigate(`/user/${CPF}`)
  }

  return (
    <div>
      <Link to="add" className="Users-add">
        Add user
      </Link>
      <UsersIterate handleClick={handleClick} users={users}/>
    </div>
  )
}

function UsersIterate(props: {users: IUser[], handleClick: (CPF:IUser['CPF']) => void}) {
  return (
    <div className="Users-container">
      {props.users.map((user) => {
        return (
      <div key={user.CPF} onClick={() => props.handleClick(user.CPF)}>{user.name}</div>
        )
      })}
    </div>
  )
}

export default Users

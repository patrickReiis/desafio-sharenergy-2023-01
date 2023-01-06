import { SyntheticEvent, useEffect, useState } from "react";
import './RandomUsers.css';
import UsernameIcon from "./icons/UsernameIcon";
import EmailIcon from './icons/EmailIcon';
import AgeIcon from './icons/AgeIcon';

interface IRandomUser {
  age: number;
  email: string;
  fullname: string;
  photo: string;
  username: string;
}

interface RandomUserListProps {
  users: IRandomUser[];
}

function RandomUsers() {

  const [ randomUsers, setRandomUsers ] = useState([] as IRandomUser[])

  useEffect(() => {
    const handleGetRandomUsers = async () => {
      try {
        const response = await fetch('/api/v1/randomUsers');
        const data:IRandomUser[] = await response.json();

        setRandomUsers(data);

      } catch(e) {
        console.log('Error during getting random users: ', e);
      }
    }

    handleGetRandomUsers();
  }, [])

  return (
    <div>
      <h3>
        search users
      </h3>
      <RandomUsersList users={randomUsers}/>
      <h1>pagination</h1>
    </div>
  );
}

function RandomUsersList(props: RandomUserListProps) {
  const listOfRandomUsers = props.users.map((user) => {
    return (
      <div key={user.username} className="RandomUsers-container-all">
        <div className="RandomUsers-container-img">
          <img src={user.photo} alt="Random guy or girl"/>
          <div className="RandomUsers-img-half-color"></div>
        </div>
        <div className="RandomUsers-fullname-container">
          {user.fullname}
        </div>
        <RandomUserIcons user={user} />
      </div>
    )
  })

  return (
    <div>
      {listOfRandomUsers}
    </div>
  );
}

function RandomUserIcons(props: {user: IRandomUser}) {

  function handleIconClick(e: SyntheticEvent) {
    const iconId = (e.currentTarget as SVGElement).id;

    if (iconId === 'icon-username') {
      setCurrent(props.user.username);
    }

    if (iconId === 'icon-age') {
      setCurrent(String(props.user.age));
    }

    if (iconId === 'icon-email') {
      setCurrent(props.user.email);
    }
  }

  const [current, setCurrent] = useState(props.user.username);

  return (
    <div>
      <div className="RandomUsers-container-icons" >
        <UsernameIcon onClick={handleIconClick} selectedClass={current === props.user.username ? 'RandomUsers-icon-selected' : ''}/>
        <EmailIcon onClick={handleIconClick} selectedClass={current === props.user.email ? 'RandomUsers-icon-selected' : ''}/>
        <AgeIcon onClick={handleIconClick} selectedClass={current === String(props.user.age) ? 'RandomUsers-icon-selected' : ''}/>
      </div>
      <div className="RandomUsers-current-value">
        {current}
      </div>
    </div>
  )
}

export default RandomUsers;

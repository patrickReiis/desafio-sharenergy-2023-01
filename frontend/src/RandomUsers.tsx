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

interface IRandomUserPage {
  [page: number]: IRandomUser[];
}

interface RandomUserListProps {
  users: IRandomUser[];
}

function RandomUsers() {

  const [ currentPage, setCurrentPage ] = useState(1);
  const [ randomUsersPage, setRandomUsersPage ] = useState({} as IRandomUserPage)

  function handleChangePage(e: SyntheticEvent) {

    if ((e.currentTarget as SVGElement).id === 'arrow-back') {
      setCurrentPage(currentPage -1)
      return
    }

    // getting target of click, casting it to a DIV, getting the id which is: 
    // page-<number>
    // slicing it so I can get only the number
    // transforming the string into a number
    const desiredPage = Number((e.target as HTMLDivElement).id.slice('page-'.length));

    setCurrentPage(Number.isInteger(desiredPage) === true ? desiredPage : 1);
  }

  useEffect(() => {
    const handleGetRandomUsers = async () => {
      if (currentPage in randomUsersPage === true) return;

      try {
        const response = await fetch(`/api/v1/randomUsers?page=${currentPage}`);
        const data:IRandomUser[] = await response.json();

        setRandomUsersPage({...randomUsersPage, [currentPage]: data})

      } catch(e) {
        console.log('Error during getting random users: ', e);
      }
    }

    handleGetRandomUsers();
  }, [currentPage])

  return (
    <div>
      <SearchRandomUsers/>

      <RandomUsersList users={
        randomUsersPage[currentPage] === undefined ?
          [] : randomUsersPage[currentPage]
      }/>

      <Pagination onClick={handleChangePage} currentPage={currentPage}/>
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
};

interface PaginationProps {
  currentPage: number;
  onClick: (e: SyntheticEvent) => void;
}

function Pagination(props: PaginationProps) {
  const pages = [] 

  for (let i = 0; i < 4; i++) {
    pages.push(props.currentPage+ i); // getting next 4 pages
  }

  const pagesHtml = pages.map((num) => {
    return (
      <div 
      key={num}
      className={'Pagination-pageNum ' + (num === props.currentPage ? 'Pagination-page-selected' : '')} 
      id={'page-' + String(num)}
      onClick={props.onClick}
    >
        {num} 
      </div>
    )
  })


  return (
  <div className="Pagination-pages-container">
    { props.currentPage === 1 ? '' : <ArrowSvg onClick={props.onClick}/>}
    {pagesHtml}
  </div>
  );
}

function ArrowSvg(props: { onClick: (e: SyntheticEvent) => void}) {
  return (

    <svg
    id="arrow-back"
    onClick={props.onClick}
    className="Pagination-arrow-icon"
    version="1.1"
    xmlSpace="preserve"
    width="1074.4945"
    height="783.52356"
    viewBox="0 0 1074.4945 783.52356"
    xmlns="http://www.w3.org/2000/svg"
    ><defs
    id="defs6"><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath16"><path
    d="M 0,4.8828125e-4 H 3375 V 3375.0005 H 0 Z"
    clipRule="evenodd"
    id="path14" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath28"><path
    d="M 0,4.8828125e-4 H 3375 V 3375.0005 H 0 Z"
    clipRule="evenodd"
    id="path26" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath40"><path
    d="M 0,4.8828125e-4 H 3375 V 3406.2505 H 0 Z"
    id="path38" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath46"><path
    d="M 0,4.8828125e-4 H 3375 V 3375.0005 H 0 Z"
    id="path44" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath52"><path
    d="M 0,4.8828125e-4 H 3375 V 3375.0005 H 0 Z"
    id="path50" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath58"><path
    d="M 0,452.45752 H 3375 V 2921.2075 H 0 Z"
    id="path56" /></clipPath><clipPath
    clipPathUnits="userSpaceOnUse"
    id="clipPath64"><path
    d="M -1.3481445,454.99561 H 5258.0269 V 2939.3706 H -1.3481445 Z"
    id="path62" /></clipPath></defs><g
    id="g8"
    transform="matrix(0.31999998,0,0,0.31999998,-5.5054313,-151.26276)"><g
    id="g34"><g
    id="g36"
    clipPath="url(#clipPath40)"><g
    id="g42"
    clipPath="url(#clipPath46)"><g
    id="g48"
    clipPath="url(#clipPath52)"><g
    id="g54"
    clipPath="url(#clipPath58)"><g
    id="g60"
    clipPath="url(#clipPath64)"><g
    id="g66"
    transform="matrix(-23.235907,0,0,-23.218458,5257.4824,2920.7959)"><path
    d="m 178.5,103.1 44.7,-44.700002 c 3.1,-3.099999 3.1,-8.200001 0,-11.3 L 178.5,2.3 c -3.10001,-3.09999995 -8.2,-3.09999995 -11.3,0 -3.10001,3.0999996 -3.10001,8.2 0,11.3 l 31.1,31.100001 H 8 c -4.4000001,0 -8,3.599998 -8,8 0,4.400001 3.5999999,8 8,8 h 190.2 l -31.10001,31.100002 c -1.60001,1.599999 -2.3,3.599999 -2.3,5.699997 0,2.099998 0.8,4.1 2.3,5.7 3.20001,3 8.3,3 11.40001,-0.1 z"
    style={{fill:'#d9d9d9',fillOpacity:'1',fillRule:'nonzero',stroke:'none'}}
    id="path68" /></g></g></g></g></g></g></g></g></svg>
  );
}

function SearchRandomUsers() {

  return (
      <input className="Search-randomUser" placeholder="Name, username or e-mail." type="text"/>
  )
}

export default RandomUsers;

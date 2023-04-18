import { Link } from "react-router-dom";
import './FooterPaths.css';
import UserIcon from "./icons/routes/UserIcon";
import CatIcon from './icons/routes/CatIcon';
import DogIcon from './icons/routes/DogIcon';

function FooterPaths() {
  return (
      <ul className="Paths-Available">
        <li>
          <Link to={'../users'} className="Link-to-pages">
            <UserIcon/>
            Users
          </Link>
        </li>
        <li>
          <Link to={'../cat'} className="Link-to-pages">
            <CatIcon/>
            Cat 
          </Link>
        </li>
        <li>
          <Link to={'../dog'} className="Link-to-pages">
            <DogIcon/>
            Dog 
          </Link>
        </li>
      </ul>
  )
}

export default FooterPaths

import { Link } from "react-router-dom";
import './FooterPaths.css';
import UserIcon from "./icons/routes/UserIcon";

function FooterPaths() {
  return (
      <ul className="Paths-Available">
        <li>
          <Link to={'../users'} className="Link-to-pages">
            <UserIcon/>
            Users
          </Link>
        </li>
      </ul>
  )
}

export default FooterPaths

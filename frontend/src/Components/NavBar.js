import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../Components/Logo";

// header to navigate the app

const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="NavbarContainer">
        <Link to={"/"}>
          <Logo />
        </Link>
        <div>
          <p>Welcome {user.user.name}</p>
          <br />
          <li>
            <button className="logout" onClick={handleClick}>Logout</button>
          </li>
        </div>
      </div>
    </header>
  );
};
export default NavBar;

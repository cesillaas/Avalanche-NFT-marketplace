import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{
    backgroundColor: "#f2f2f2",
    padding: "10px 20px",
    display: "flex",
    gap: "20px"
  }}>
    <Link to="/"> Buy</Link>
    <Link to="/mint"> Mint</Link>
    <Link to="/list"> List</Link>
  </nav>
);

export default Navbar;

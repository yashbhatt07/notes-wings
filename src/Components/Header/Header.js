import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const getUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#dbcdcd" }}>
      <Navbar>
        <Container>
          <Nav className="me-auto w-100 d-flex justify-content-between">
            <Nav.Link className="text-white">
              <Link to={`/home/${getUser?.u_i_d}`}>Home</Link>
            </Nav.Link>
            <div>
              <Link to="/login m-auto" onClick={logout}>
                Logout
              </Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

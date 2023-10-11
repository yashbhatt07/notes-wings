import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const getUser = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

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
            <div
              className="text-white"
              style={{
                backgroundColor: getUser.u_i_d === id ? "#9cc5f5" : "",
              }}
            >
              <Link to={`/home/${getUser?.u_i_d}`} className="home_page">
                Home
              </Link>
            </div>
            <div>
              <button onClick={logout} className="btn btn-outline-primary">
                Logout
              </button>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

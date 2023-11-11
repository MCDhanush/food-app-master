import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Toast } from "react-bootstrap";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextRe";
// import { toast } from "react-toastify";

export default function Navbar(props) {
  const [cartView, setCartView] = useState(false);
  const [close, setClose] = useState(false);
  const [navopen, setNavopen] = useState("");
  // const [navclose, setClose] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    alert("succesfully logout");
    navigate("/");
  };
  return (
    <div className="nav-c">
      <div className="nav-bac">
        <nav>
          <Link id="nav-na" aria-current="page" to="/">
            Foddic
          </Link>
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <br />

          <ul className={menuOpen ? "open" : ""} id="nav-g">
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex" id="nav-f">
                <Link className="btn bg-white mx-1 text-success" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white mx-1 text-success " to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2 "
                  to="/cart"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{""}
                  {""}
                  <Badge to="/cart" pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
                <div
                  className="btn bg-white text-danger mx-2 "
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </ul>
          {/* <br /> */}
        </nav>
      </div>
    </div>
  );
}

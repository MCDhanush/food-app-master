import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp";
import { CardProvider } from "./components/ContextRe";
import Cart from "./screens/Cart";

function App() {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;

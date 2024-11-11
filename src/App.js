import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Forgotpassword from "./components/Forgotpassword";
import "react-toastify/dist/ReactToastify.css";
import EmployeeList from "./components/EmployeeList";
import CreateEmployee from "./components/CreateEmployee";
import EmployeeEdit from "./components/EmployeeEdit";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/employeeList" element={<EmployeeList />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/EmployeeEdit/:slug" element={<EmployeeEdit/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

import "./App.css";

import Sidebar from "./components/Sidebar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4001";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nodeview from "./Page/Nodeview.js";
import Pythonview from "./Page/Pythonview";
import Cview from "./Page/Cview";
import Cppview from "./Page/Cppview";
import NoPage from "./Page/NoPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/node" element={<Nodeview />} />
          <Route path="/python" element={<Pythonview />} />
          <Route path="/c" element={<Cview />} />
          <Route path="/cpp" element={<Cppview />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

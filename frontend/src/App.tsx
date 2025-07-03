import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mint from "./pages/Mint";
import List from "./pages/List";
import Buy from "./pages/Buy";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Buy />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

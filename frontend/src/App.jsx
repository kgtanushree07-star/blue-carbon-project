import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import MRV from "./pages/MRV";
import MapPage from "./Map";
import Evidence from "./Evidence";


function App() {
  return (
    <BrowserRouter>

      <nav className="flex gap-6 bg-green-800 p-4 text-white">
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/mrv">MRV</Link>
        <Link to="/map">Map</Link>
        <Link to="/evidence">Evidence</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/mrv" element={<MRV />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/evidence" element={<Evidence />} />
      

      </Routes>

    </BrowserRouter>
  )
}

export default App
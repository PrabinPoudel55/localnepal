import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/services" element={<Services />} />

      <Route path="/services/:id" element={<ServiceDetails />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
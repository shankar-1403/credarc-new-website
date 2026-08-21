import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WhyNow from "./pages/WhyNow";
import Platform from "./pages/Platform";
import Value from "./pages/Value";
import WhoItServes from "./pages/WhoItServes";
import Sectors from "./pages/Sectors";
import Roadmap from "./pages/Roadmap";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/why-now" element={<WhyNow />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/value" element={<Value />} />
          <Route path="/who-it-serves" element={<WhoItServes />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

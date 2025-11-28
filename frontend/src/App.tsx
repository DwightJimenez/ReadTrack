import "./App.css";
import LandingPage from "./pages/LandingPage";
import UploadPage from "./pages/UploadPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/uploadpage" element={<UploadPage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

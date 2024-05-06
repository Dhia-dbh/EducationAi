import Home from "./components/Home/home";
import { Routes, Route } from "react-router-dom";
import Biblio from "./components/biblio/biblio";
import AiSection from "./components/aiSection/aiSection";
import { useState } from "react";
import Cours from "./components/cours/cours";
import { MyProvider } from "./context/myContext";

function App() {
  const [downloadedFiles, setDownloadedFiles] = useState([]);
  function addToDownloadedFiles(title) {
    setDownloadedFiles([...downloadedFiles, title]);
  }
  return (
    <>
      <MyProvider>
        <Routes>
          <Route
            path="/"
            element={<Home addToDownloadedFiles={addToDownloadedFiles} />}
          />
          <Route
            path="/biblio"
            element={<Biblio addToDownloadedFiles={addToDownloadedFiles} />}
          />
          <Route
            path="/cours"
            element={<Cours downloadedFiles={downloadedFiles} />}
          />
          <Route path="/chatBot" element={<AiSection />} />
        </Routes>
      </MyProvider>
    </>
  );
}

export default App;

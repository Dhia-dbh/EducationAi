import Navbar from "../navbar/navbar";
import SearchBar from "../searchbar/searchBar";
import AiSection from "../aiSection/aiSection";
import "./home.css";
import { useState } from "react";
import { files } from "../../files.json";
import File from "../biblio/file";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import MyContext from "../../context/myContext";

function Home({ addToDownloadedFiles }) {
  const [search, setSearch] = useState("");
  function filterFilesByTitleSubstring(files, substring) {
    return files.filter((file) =>
      file.title.toLowerCase().includes(substring.toLowerCase())
    );
  }
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main>
        <section id="section1">
          <h1>NEJAH EDUCATOIN</h1>
          <h4>Help Each Other, Grow Together</h4>
          <SearchBar onChange={handleChange} />
        </section>
        <div id="searchResults" className={search !== "" ? "high" : "low"}>
          {filterFilesByTitleSubstring(files, search).map((file) => (
            <File file={file} addToDownloadedFiles={addToDownloadedFiles} />
          ))}
        </div>
        <section id="section2">
          <h1>
            Boost your productivity and streamline collaboration with Najah
            education!
          </h1>
          <img src="brain.png" alt="brain" />
        </section>
        <section id="section2">
          <img src="books.png" alt="books" />
          <h1>
            Document Exchange: Share and exchange documents seamlessly with
            friends from all over Tunisia helping everyone in need
          </h1>
        </section>
        <section id="section2">
          <h1>
            AI-powered Insights: Gain deeper understanding of your documents
            with intelligent text selection explanations. Simply highlight a
            section, and get clear, contextual information to eliminate
            confusion.
          </h1>
          <img src="lightbulb.png" alt="lightbulb" />
        </section>
        <section id="section2">
          <img src="bots emoji.png" alt="bots emoji" />
          <h1>
            Real-time Collaboration: Communicate and brainstorm effectively with
            a built-in chatbot, fostering a dynamic and interactive workspace.
          </h1>
        </section>
        <section id="section2">
          <h1>
            Maintain Focus: keep track of the focus level in your classroom
            using computer vision-powered focus tracking. Receive insights into
            your students attention patterns to optimize your workflow.
          </h1>
          <img src="pupils.png" alt="pupils" />
        </section>
      </main>
    </>
  );
}

export default Home;

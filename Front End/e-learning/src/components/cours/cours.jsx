import "./cours.css";
import Navbar2 from "../navbar/navbar2";
import React, { useEffect, useRef, useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

const key = "AIzaSyANfYt6UqzMyn0q2iQJNlLf5B9gefS90xk";
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

const Cours = ({ downloadedFiles }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("technologie");
  const [directeur, setaDirecteur] = useState(" Sadok BAZINE");
  const [email, setEmail] = useState("sadok.bazine@gmail.com");
  const [des, setDes] = useState();

  const handleDepartmentClick = (downloadedFile) => {
    setSelectedDepartment(downloadedFile.title);
    setDes(downloadedFile.description);
  };
  const textRef = useRef(null);
  const [response, setresponse] = useState("");
  function help() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      const paragraphText = textRef.current?.textContent;
      const promp = [selectedText, paragraphText];

      return promp;
    }
  }
  async function promptymeup() {
    const promp = help();
    console.log(promp[0]);
    const temp =
      promp[0] + "in relathion to its meaning in this paragraph" + promp[1];
    const result = await model.generateContent(
      "explain this in very simple terms and 30 words max and in tunisian arabic " +
        temp
    );
    const response = await result.response;
    const text = response.text();
    setresponse(text);
    console.log(text);
  }
  return (
    <>
      {downloadedFiles.length !== 0 ? (
        <>
          <Navbar2 />
          <div>
            <div className="Appo">
              <div className="sidebar">
                {/* <h3 className='pipipiw'>...</h3> */}
                <ul>
                  <br />
                  {downloadedFiles.map((downloadedFile) => (
                    <>
                      <li
                        onClick={() => handleDepartmentClick(downloadedFile)}
                        className={
                          selectedDepartment === downloadedFile.title
                            ? "selected"
                            : ""
                        }
                      >
                        {downloadedFile.title}
                      </li>
                      <hr />
                    </>
                  ))}
                </ul>
              </div>
              <div className="main-content">
                {/* Render department-specific content based on selectedDepartment */}
                {selectedDepartment && (
                  <div className="department-section">
                    {/* You can render department-specific content here */}

                    <span className="spn">
                      Contenu du cours :<br></br>
                      <br></br>{" "}
                      <span
                        id="desid"
                        textRef={textRef}
                        onMouseUp={promptymeup}
                      >
                        {des}
                      </span>
                    </span>
                    <br />
                    <br />
                    <p>{response}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar2 />
          <h2
            style={{
              position: "absolute",
              right: "50%",
              top: "50%",
              placeItems: "center center",
            }}
          >
            No Files Downloaded!
          </h2>
        </>
      )}
    </>
  );
};

export default Cours;

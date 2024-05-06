import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar2 from "../navbar/navbar2";
import File from "./file";
import "./biblio.css";
import { files } from "../../files.json";

const Biblio = ({ addToDownloadedFiles }) => {
  function is_filter_on() {
    return Object.values(filters).every((value) => value === false);
  }
  const [filters, setFilters] = useState({
    Math: false,
    Physique: false,
    Arabe: false,
    Francais: false,
  });
  return (
    <>
      <Navbar2 />

      <div className="filesContainer">
        <section className="files">
          {!is_filter_on()
            ? files.map((file) =>
                filters[file.type] ? (
                  <File
                    file={file}
                    addToDownloadedFiles={addToDownloadedFiles}
                  />
                ) : (
                  <></>
                )
              )
            : files.map((file) => (
                <File file={file} addToDownloadedFiles={addToDownloadedFiles} />
              ))}
        </section>
        <section className="filterfiles">
          <ul>
            <li>
              <input
                type="checkbox"
                name="Math"
                id="Math"
                onChange={(e) =>
                  setFilters({ ...filters, Math: e.target.checked })
                }
              />
              <span>Math</span>
            </li>
            <li>
              <input
                type="checkbox"
                name="Physique"
                id="Physique"
                onChange={(e) =>
                  setFilters({ ...filters, Physique: e.target.checked })
                }
              />
              <span>Physique</span>
            </li>
            <li>
              <input
                type="checkbox"
                name="Arabe"
                id="Arabe"
                onChange={(e) =>
                  setFilters({ ...filters, Arabe: e.target.checked })
                }
              />
              <span>Arabe</span>
            </li>
            <li>
              <input
                type="checkbox"
                name="Francais"
                id="Francais"
                onChange={(e) =>
                  setFilters({ ...filters, Francais: e.target.checked })
                }
              />
              <span>Français</span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Biblio;

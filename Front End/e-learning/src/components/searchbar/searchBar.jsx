import "./searchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onChange }) => {
  return (
    <>
      <div className="searchBar">
        <input
          style={{ textAlign: "start", paddingLeft: "20px" }}
          type="text"
          placeholder="Lawaj cours, ktob wala hata devoirat"
          onChange={onChange}
        />
        <icon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </icon>
      </div>
    </>
  );
};

export default SearchBar;

import { FaArrowAltCircleDown, FaSearch, FaStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/ListBook.json")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Gán dữ liệu từ response vào biến data
        setData(jsonData);
      
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleSubmitForm = (e) => {
    const newBook = {};
    if (
      name != null &&
      name.trim() != "" &&
      author != null &&
      author.trim() != ""
    ) {
      newBook["name"] = name;
      newBook["author"] = author;
      newBook["favorite"] = favorite.toString();
    }
    setData([...data, newBook]);
  };
  return (
    <div className="App">
      <div className="container d-flex flex-column ">
        <div className="input-group flex-nowrap">
          <span className="input-group-text" id="addon-wrapping">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          />
        </div>
        <h4 className="mt-4">A list of Book</h4>
        <ul className="list-group">
          {data &&
            data.map((item) => (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="start d-flex gap-3 align-items-center">
                  {item?.favotite == "true" && <FaStar className="d-block" />}{" "}
                  <span>{item.name}</span>
                </div>
                <div className="end rounded-pill text-white">{item.author}</div>
              </li>
            ))}
        </ul>
        <h4 className="mt-4">Add new book</h4>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title..."
            required
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="author..."
            name="author"
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="favorite" className="form-label">
            Favorite
          </label>
          <input
            type="checkbox"
            className="ms-2"
            id="favorite"
            placeholder="author..."
            name="favorite"
            onChange={(e) => setFavorite(e.target.checked)}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={handleSubmitForm}
            className="btn btn-submit d-flex gap-1 align-items-center"
          >
            <FaArrowAltCircleDown className="d-block" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

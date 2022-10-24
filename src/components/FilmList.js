import FilmItem from "./FilmItem";
import { useEffect, useState } from "react";
import './FilmList.css';
function FilmList() {
  const api = "https://mustbebuilt.co.uk/SHU/films-api/api.php";
  const [loadedFilms, setLoadedFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState(0);

  const fetchData = () => {
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoadedFilms(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChgFilm = (filmID) => {
    console.info(filmID);
    setCurrentFilm(filmID);
  };

  return (
    <main>
      <div>
        {loadedFilms.map((film) => (
          <div key={film.filmID}>
            <p>{film.filmTitle}</p>
            <button onClick={() => handleChgFilm(film.filmID)}>
              {" "}
              Click me{" "}
            </button>
          </div>
        ))}
      </div>
      <div>
        <FilmItem id={currentFilm}></FilmItem>
      </div>
    </main>
  );
}
export default FilmList;

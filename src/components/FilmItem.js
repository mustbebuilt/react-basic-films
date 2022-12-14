import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './FilmItem.css';
function FilmItem(props) {
  let id = 1;
  if (props.id > 0) {
    id = props.id;
  }
  const [loadedFilms, setLoadedFilms] = useState([]);
  useEffect(() => {
    const fetchData = () => {
    const api = "https://mustbebuilt.co.uk/SHU/films-api/api.php?filmID=" + id;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoadedFilms(data);
      });
  };
    fetchData();
  }, [id]);
const editLink = `/edit/${props.id}`;
  return (
    <div>
      <div className="filmDisplay">
       <div>
        <h1>{loadedFilms.filmTitle} ({props.id})</h1>
        <p>{loadedFilms.filmDescription}</p>
        <p> <Link to={editLink}>Edit</Link></p>
        </div>
       <div><img
          src={"./images/" + loadedFilms.filmImage}
          alt={loadedFilms.filmTitle}
        ></img></div>
        </div>
    </div>
  );
}
export default FilmItem;

import { useEffect, useState } from "react";
function FilmItem(props) {
  let id = 1;
  if (props.id > 0) {
    id = props.id;
  }
  const api = "https://mustbebuilt.co.uk/SHU/films-api/api.php?filmID=" + id;
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFilms, setLoadedFilms] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setLoadedFilms(data);
      });

    if (isLoading) {
      return <div>Loading</div>;
    }
  }, [id]);

  return (
    <div>
      <h2>My Film Component {props.id}</h2>
      <h1>{loadedFilms.filmTitle}</h1>
    </div>
  );
}
export default FilmItem;

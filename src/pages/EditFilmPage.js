import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import './EditFilmPage.css';

function EditFilmPage() {
  const { id } = useParams();
  console.info(id);
   const navigate = useNavigate();
  const api = "https://mustbebuilt.co.uk/SHU/films-api/api.php?filmID=" + id;
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFilms, setLoadedFilms] = useState({});
  const [hasUpdated, setUpdate] = useState(false);
  const filmIDInputRef = useRef();
  const titleInputRef = useRef();
  const certInputRef = useRef();
  const descInputRef = useRef();
  const imgInputRef = useRef();
  const priceInputRef = useRef();
  const starsInputRef = useRef();
  const dateInputRef = useRef();
  // the array second parameter controls how freqeuently this runs
  // empty array will run once
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
  }, []);

  const editOnClick = (ev) => {
    ev.preventDefault();
    const filmID = filmIDInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredCert = certInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const enteredImg = imgInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredStars = starsInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const editFilm = {
      filmID: filmID,
      filmTitle: enteredTitle,
      filmCertificate: enteredCert,
      filmDescription: enteredDesc,
      filmImage: enteredImg,
      filmPrice: enteredPrice,
      stars: enteredStars,
      releaseDate: enteredDate,
    };
    var sendStr = JSON.stringify(editFilm);
    fetch(api, {
      method: "PUT",
      mode: "cors",
      body: sendStr,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.status)
      .then((status) => {
        console.info(status);
        if (status == 202 || status == 200) {
          //document.getElementById("resp").innerText = "Updated";
          // setUpdate(true);
          navigate('/')
        }
      });
  };

  return (
    <div className="container">
      <form>
        <div>
          <label>Film Title</label>
          <input
            type='text'
            defaultValue={loadedFilms.filmTitle}
            ref={titleInputRef}
          />
        </div>
        <div>
          <label>Film Certificate</label>
          <input
            type='text'
            defaultValue={loadedFilms.filmCertificate}
            ref={certInputRef}
          />
        </div>
        <div>
          <label>Film Description</label>
          <textarea
            defaultValue={loadedFilms.filmDescription}
            ref={descInputRef}
          ></textarea>
        </div>
        <div>
          <label>Film Image</label>
          <input
            type='text'
            defaultValue={loadedFilms.filmImage}
            ref={imgInputRef}
          />
        </div>
        <div>
          <label>Film Price</label>
          <input
            type='text'
            defaultValue={loadedFilms.filmPrice}
            ref={priceInputRef}
          />
        </div>
        <div>
          <label>Stars</label>
          <input
            type='text'
            defaultValue={loadedFilms.stars}
            ref={starsInputRef}
          />
        </div>
        <div>
          <label>Release Date</label>
          <input
            type='date'
            defaultValue={loadedFilms.releaseDate}
            ref={dateInputRef}
          />
        </div>
        <div>
          <input
            type='hidden'
            defaultValue={loadedFilms.filmID}
            ref={filmIDInputRef}
          />
          <button onClick={editOnClick}>Update</button>
        </div>
      </form>
      <div>{hasUpdated && <p>Done.</p>}</div>
    </div>
  );
}

export default EditFilmPage;
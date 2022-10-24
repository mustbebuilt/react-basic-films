import FilmList from "./FilmList";
import Footer from "./Footer";
const Layout = () => {
  return (
    <div className="container">
      <h1>My Films</h1>
      <FilmList></FilmList>
      <Footer/>
    </div>
  );
};

export default Layout;
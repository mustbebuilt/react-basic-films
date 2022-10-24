import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EditFilmPage from "./pages/EditFilmPage";
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Layout />}></Route>
      <Route path='/edit/:id' element={<EditFilmPage />}></Route>
    </Routes>
    </BrowserRouter>

  );
}

export default App;

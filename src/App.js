import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Movie from "./components/Movie/Movie";
import MoviesPage from "./components/Movies/Movies";
import Trendings from "./components/Trending/Trendings";
import Genres from "./components/Genres/Genres";
import PeoplePopular from "./components/People/PeoplePopular";
import Tv from "./components/Tv/Tv";
import Login from "./components/Forms/Login";
import SignUp from "./components/Forms/SignUp";
function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path = "/"  element = {<Home />} />


          <Route path = "/genre/:id/name=:name/page=:page" element = {<Genres />} />

          <Route path = "/people/popular" element = {<PeoplePopular />} />

          <Route path = "/trending/" element = {<Trendings />} />

          <Route path = "/:name/:id/page=:page" element = {<MoviesPage />} />


          <Route path = "/movie/:id" element = {<Movie />} />
          <Route path = "/tv/:id" element = {<Tv />} />

          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<SignUp />} />

        </Routes>
      </Router>
      {/* <Footer /> */}
    </>
  );
}

export default App;

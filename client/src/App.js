import './App.css';
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import mainContext from "./context/mainContext";
import StartPage from "./pages/StartPage";
import RecommendationPage from "./pages/RecommendationPage";
import SearchPage from "./pages/SearchPage";
import UserMoviesPage from "./pages/UserMoviesPage";
import http from "./plugins/http";

function App() {

    const [user, setUser] = useState('')
    const [favorites, setFavorites] = useState([])
    const [authStatus, setAuthStatus] = useState(false)
    const [authOption, setAuthOption] = useState('')

    useEffect(() => {
        async function checkLogStatus() {
            const saved = localStorage.getItem("stayLoggedIn")
            if (saved && saved === "true") {
                const data = await http.get('/stayLoggedIn')
                if (data.success) {
                    setUser(data.user)
                }
            }
        }
        checkLogStatus()
    }, [])

  return (
      <mainContext.Provider value={{favorites, setFavorites, authStatus, setAuthStatus, authOption, setAuthOption, user, setUser}}>
        <div className='App'>
          <Router>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/your-movies" element={<UserMoviesPage />} />
              <Route path="/vilija-recommends" element={<RecommendationPage />} />
              <Route path="/search" element={<SearchPage />} />
            </Routes>
          </Router>
        </div>
      </mainContext.Provider>
  );
}

export default App;

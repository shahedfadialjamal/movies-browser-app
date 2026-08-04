import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ToastProvider } from './context/ToastContext';

import MovieList from './components/Movies/MovieList.jsx';
import SearchForm from './components/Search/SearchForm.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import MovieDetail from './components/Movies/MovieDetail.jsx';
import InfiniteScrollPage from './components/Movies/InfiniteScroll.jsx';
import ErrorBoundary from './components/Error/ErrorBoundary.jsx';
import UserForm from './components/User/UserForm.jsx';

function App() {
  const [query, setQuery] = useState('');

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [showUser, setShowUser] = useState(false);

  const location = useLocation();

  return (
    <ToastProvider>
      <div className="app-container">
        <header className="navbar">
          <h1>Movie Browser</h1>

          <nav>
            <Link to="/">Home</Link>

            <Link to="/favorites">Favorites</Link>

            <Link to="/infinite">Infinite Scroll</Link>

            <Link to="/virtual">Virtualization</Link>

            <button
              className="user-icon"
              onClick={() => setShowUser(!showUser)}
            >
              👤
            </button>
          </nav>

          {showUser && <UserForm />}
        </header>

        <SearchForm onSearch={setQuery} />

        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <>
                    <section className="hero"></section>

                    <MovieList
                      query={query}
                      fromDate={fromDate}
                      toDate={toDate}
                      setFromDate={setFromDate}
                      setToDate={setToDate}
                    />
                  </>
                }
              />

              <Route path="/favorites" element={<Favorites />} />

              <Route path="/movie/:movieId" element={<MovieDetail />} />

              <Route path="/infinite" element={<InfiniteScrollPage />} />
            </Routes>
          </AnimatePresence>
        </ErrorBoundary>
      </div>
    </ToastProvider>
  );
}

export default App;

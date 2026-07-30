import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import MovieList from './components/Movies/MovieList.jsx';
import SearchForm from './components/Search/SearchForm.jsx';
import Favorites from './components/Favorites/Favorites.jsx';
import MovieDetail from './components/Movies/MovieDetail.jsx';
import InfiniteScrollPage from './components/Movies/InfiniteScroll.jsx';
import ErrorBoundary from './components/Error/ErrorBoundary.jsx';
import InfiniteVirtual from './components/Movies/InfiniteVirtual.jsx';
import MyCalendar from './components/Calender.jsx';

function App() {
  const [query, setQuery] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);

  const location = useLocation();

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>Movie Browser</h1>

        <nav>
          <Link to="/">Home</Link>

          <Link to="/favorites">Favorites</Link>

          <Link to="/infinite">Infinite Scroll</Link>

          <Link to="/virtual">Virtualization</Link>

          <MyCalendar setSelectedDate={setSelectedDate} />
        </nav>
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

                  <MovieList query={query} selectedDate={selectedDate} />
                </>
              }
            />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/movie/:movieId" element={<MovieDetail />} />

            <Route path="/infinite" element={<InfiniteScrollPage />} />

            <Route path="/virtual" element={<InfiniteVirtual />} />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
    </div>
  );
}

export default App;

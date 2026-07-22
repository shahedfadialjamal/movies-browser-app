import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';

function MovieCard({ id, title, type, poster }) {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.favorites) || [];

  const favorite = favorites.some((movie) => movie && movie.id === id);

  const handleFavorite = () => {
    if (favorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          type,
          poster,
        })
      );
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      className="movie-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={`/movie/${id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          alt={title}
          width="180"
        />

        <div className="movie-info">
          <h3>{title}</h3>
          <p>{type}</p>
        </div>
      </Link>

      <button onClick={handleFavorite}>
        {favorite ? '- Remove' : '+ Add to Favorites'}
      </button>
    </div>
  );
}

export default MovieCard;

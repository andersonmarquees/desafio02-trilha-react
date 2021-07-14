import { useMovie } from "../context/MovieContext";
import { Button } from "../components/Button";

import "../styles/sidebar.scss";

export function SideBar() {
  const { genres, selectedGenre, handleClickButton, selectedGenreId } =
    useMovie();
  return (
    <nav className="sidebar">
      <span>
        Watch<p>{selectedGenre.title}</p>
      </span>
      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

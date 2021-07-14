import { useEffect } from "react";
import { useState } from "react";
import { ReactNode, useContext, createContext } from "react";
import { api } from "../services/api";

type MovieContextProps = {
  children: ReactNode;
};

interface MovieProps {
  Title: string;
  Poster: string;
  imdbID: string;
  Ratings: Array<{ Source: string; Value: string }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
type MovieContextData = {
  handleClickButton: (id: number) => void;
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
};
export const MovieContext = createContext({} as MovieContextData);

export function MovieContextProvider({ children }: MovieContextProps) {
  // state controller genres for content
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  //state controller content movies
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  // state controller movies
  const [movies, setMovies] = useState<MovieProps[]>([]);

  // state controller category: action -> content.tsx (component)
  const [genres, setGeneres] = useState<GenreResponseProps[]>([]);

  // fetch -> genres -> category: action -> content.tsx (component)
  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGeneres(response.data);
    });
  }, []);

  // fetch -> information movie
  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MovieContext.Provider
      value={{
        genres,
        selectedGenreId,
        selectedGenre,
        movies,
        handleClickButton,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovie = () => {
  return useContext(MovieContext);
};

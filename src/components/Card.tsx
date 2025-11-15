import star from "@/assets/star.svg";
import { formatFirstLetter } from "@/utils/format";
import { Link } from "react-router-dom";
type Props = {
  anime: {
    title: string;
    image: string;
    id: number;
    score: number | null;
    rank: number | null;
    year: number | null;
    season: string | null;
  };
};

const Card = ({ anime }: Props) => {
  const { title, image, id, score, year, season } = anime;

  return (
    <Link key={id} className="movie-card" to={`/anime/${id}`}>
      <img src={image ? image : "/no-movie.png"} />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src={star} alt="star icon" />
            <p>{score ? score.toFixed(2) : "N/A"}</p>
          </div>
          <p className="year">
            {season ? formatFirstLetter(season) : ""} {year ?? ""}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

// src/pages/DetailPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import NotFound from "./NotFound";
import star from "@/assets/star.svg";
import { formatFirstLetter } from "@/utils/format";

const DetailPage: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { results, loading } = useAppSelector((state) => state.anime);
  const anime = results.find((result) => result.mal_id === Number(id));
  if (loading === "pending" || !anime) return <div></div>;
  if (!anime && loading === "succeeded") return <NotFound />;
  const {
    genres,
    episodes,
    images,
    score,
    scored_by,
    season,
    status,
    synopsis,
    title,
    trailer,
    year,
    url,
  } = anime;
  console.log(anime, "<<<");
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white/5 backdrop-blur-md rounded-lg p-8 min-h-[60vh] shadow-lg">
        <div className="flex px-12 py-6 gap-12">
          <div className="w-72 relative h-auto">
            <img
              src={images.webp.image_url}
              alt={title}
              className="w-72 h-auto rounded-xl"
            />
            <span className="text-white text-sm text-extrabold absolute top-0 left-0 bg-gray-800/80 p-1 rounded-sm">
              {status ?? ""}
            </span>
          </div>
          <div className="flex flex-col gap-2 w-2/3">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <span className="text-white text-md text-bold flex items-center gap-2">
                <img src={star} alt="star icon" />
                <span>{score ? score.toFixed(2) : ""}</span>
                <span>({scored_by ? scored_by : ""})</span>
              </span>
            </div>
            <span className="text-gray-300 text-md text-bold">{synopsis}</span>
            <span>
              {url && (
                <a
                  className="text-yellow-500 text-extrabold cursor-pointer mr-4"
                  href={url}
                  target="_blank"
                >
                  Details
                </a>
              )}
              {(trailer?.embed_url || trailer?.url) && (
                <span
                  className="text-yellow-500 text-extrabold cursor-pointer"
                  onClick={() => setDialogOpen(true)}
                >
                  View Trailer
                </span>
              )}
            </span>
          </div>
        </div>
        {dialogOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={() => setDialogOpen(false)}
          >
            <div
              className="relative w-full max-w-3xl bg-black rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-white text-xl font-bold cursor-pointer"
                onClick={() => setDialogOpen(false)}
              >
                ×
              </button>

              {trailer?.embed_url || trailer?.url ? (
                <iframe
                  className="w-full h-96 rounded-b-lg"
                  src={trailer.embed_url ?? trailer.url ?? ""}
                  title="Anime Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <p className="text-white p-6 text-center">
                  Trailer not available
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2 mx-12 my-6">
          <p className="text-white text-lg">
            <strong className="font-extrabold">Genres: </strong>
            {genres && genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : "N/A"}
          </p>
          <p className="text-white text-lg">
            <strong className="font-extrabold">Episodes: </strong>{" "}
            {episodes ?? "N/A"}
          </p>
          <p className="text-white text-lg">
            <strong className="font-extrabold">Release Date: </strong>
            {season && year ? `${formatFirstLetter(season)} ${year}` : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4 mx-12 my-6 flex-wrap">
        {episodes && episodes > 0
          ? Array.from({ length: episodes }, (_, i) => (
              <button
                key={`episode-${i + 1}`}
                className="flex items-center justify-center text-gray-500 border-gray-700 border-2 rounded-lg px-8 py-2 mt-4 w-10 h-10 cursor-not-allowed"
                disabled
              >
                {i + 1}
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default DetailPage;

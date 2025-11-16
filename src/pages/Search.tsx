import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAnimeBySearch, setSearchTerm } from "@/store/anime";
import { useDebounce } from "@/hooks/useDebounce";
import type { Anime } from "@/store/types";
import SearchInput from "@/components/SearchInput";
import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import header from "@/assets/header.webp";
import Pagination from "@/components/Pagination";

let controller: AbortController | null = null;

const Search: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 250);
  const dispatch = useAppDispatch();
  const {
    results: animeList,
    loading,
    error: errorMessage,
    pagination,
  } = useAppSelector((state) => state.anime);

  const isSearching = searchInput.trim() !== "";
  const isLoading = loading === "pending";

  const fetchAnime = useCallback(
    (page: number) => {
      if (controller) {
        controller.abort();
      }
      controller = new AbortController();

      dispatch(
        fetchAnimeBySearch(
          {
            query: debouncedSearchInput.trim(),
            page,
          },
          { signal: controller.signal }
        )
      );
    },
    [debouncedSearchInput, dispatch]
  );

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchInput.trim()));
    if (debouncedSearchInput.trim().length > 0) {
      fetchAnime(1);
    }
  }, [debouncedSearchInput, dispatch, fetchAnime]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (isLoading || !pagination) return;
      fetchAnime(newPage);
      window.scrollTo({ top: 300, behavior: "smooth" });
    },
    [fetchAnime, isLoading, pagination]
  );

  const listTitle = useMemo(() => {
    return isSearching && searchInput.length > 0
      ? `Results for "${debouncedSearchInput}"`
      : "Popular Anime";
  }, [debouncedSearchInput, isSearching, searchInput]);

  return (
    <main className="min-h-screen">
      <div className="pattern-overlay" />
      <div className="wrapper">
        <header className="py-8 text-center">
          <img
            src={header}
            alt="header"
            className="w-full h-72 object-cover rounded-lg mb-16"
          />
          <h1>
            Find <span className="text-gradient">Animes</span> You'll Enjoy
            Without the Hassle
          </h1>
          <SearchInput
            searchTerm={searchInput}
            setSearchTerm={setSearchInput}
          />
        </header>

        <section className="all-movies mt-10">
          <h2 className="mt-10">{listTitle}</h2>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <div className="flex flex-col justify-center items-center text-center p-10 bg-red-800 text-white rounded-xl shadow-lg">
              <p className="font-bold text-lg mb-2">
                Error Fetching Data, Please Try Again
              </p>
              <button
                className="mt-4 text-xl font-extrabold cursor-pointer hover:text-gray-300"
                onClick={() => fetchAnime(1)}
              >
                Retry
              </button>
            </div>
          ) : animeList?.length === 0 && isSearching ? (
            <div className="text-center p-10 bg-dark-100 rounded-xl shadow-lg">
              <p className="text-lg text-light-100">
                No results found for "{searchInput}".
              </p>
            </div>
          ) : (
            <>
              <ul>
                {animeList.map((anime: Anime) => (
                  <Card
                    key={anime.mal_id}
                    anime={{
                      title: anime.title,
                      image: anime.images.webp.image_url,
                      id: anime.mal_id,
                      rank: anime.rank,
                      score: anime.score,
                      year: anime.year,
                      season: anime.season,
                    }}
                  />
                ))}
              </ul>

              {pagination && (
                <Pagination
                  currentPage={pagination.current_page}
                  hasNextPage={pagination.has_next_page}
                  onPageChange={handlePageChange}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Search;

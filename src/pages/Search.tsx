import SearchInput from "@/components/SearchInput";

const App = () => {
  return (
    <main>
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="hero" />
          <h1>
            Find <span className="text-gradient">Animes</span> You'll Enjoy
            Without the Hassle
          </h1>
          <SearchInput />
        </header>
        <section className="all-movies">
          <h2 className="mt-10">Popular</h2>
          {/* {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )} */}
        </section>
      </div>
    </main>
  );
};

export default App;

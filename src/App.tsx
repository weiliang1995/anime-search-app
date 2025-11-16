import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import DetailPage from "./pages/Detail";
import { Header } from "./components/Header";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { fetchAnimeBySearch } from "./store/anime";
import { useAppDispatch } from "./store/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAnimeBySearch({ query: "", page: 1 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

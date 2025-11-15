import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import DetailPage from "./pages/Detail";
import { Header } from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/anime/:id" element={<DetailPage />} />
          <Route
            path="*"
            element={<div className="text-center p-10">404 - Not Found</div>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

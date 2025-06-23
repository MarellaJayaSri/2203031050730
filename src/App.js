import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StatsPage from "./pages/StatsPage";
import { Navigate, useParams } from "react-router-dom";

const RedirectPage = () => {
  const { code } = useParams();
  const data = JSON.parse(localStorage.getItem("urls") || "[]");
  const urlObj = data.find((u) => u.shortcode === code);

  if (urlObj) {
    window.location.href = urlObj.longUrl;
  } else {
    return <div>URL not found</div>;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:code" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
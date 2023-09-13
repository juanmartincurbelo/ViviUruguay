import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route index path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

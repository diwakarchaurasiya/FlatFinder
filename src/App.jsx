import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import ProtectedRoute from "./components/utils/ProtectedRoute"; // Adjust path if needed

import HomePage from "./pages/HomePage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ListPropertyForm from "./pages/ListPropertyForm";
import AuthForm from "./pages/AuthForm";

function App() {
  useEffect(() => {
    document.title = "FlatFinder | Find Your Perfect Home";
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertyListingPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />

            <Route
              path="/add-property"
              element={
                <ProtectedRoute role="owner_token">
                  <ListPropertyForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/favorites"
              element={
                <ProtectedRoute role="tenant_token">
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<AuthForm />} />
            {/* Optional auth components */}
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

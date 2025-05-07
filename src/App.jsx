import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import ProtectedRoute from "./components/utils/ProtectedRoute"; // Adjust path if needed
import { ToastContainer } from "react-toastify"; // Import ToastContainer from react-toastify

import HomePage from "./pages/HomePage";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ContactPage from "./pages/ContactPage";
import AuthForm from "./pages/AuthForm"; // Make sure the AuthForm page is in the correct path
import ListPropertyForm from "./pages/ListPropertyForm";
import NotFoundPage from "./pages/NotFoundPage";

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer /> {/* Add ToastContainer outside Routes */}
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Import your card components
import CategoryCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";
import ViewProductDetails from "../components/ViewProductDetails";
// You can use Lucide, Heroicons, or SVGs for icons. Here are SVGs for simplicity:
const CartIcon = () => (
  <svg
    className="w-7 h-7 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
  </svg>
);
const UserIcon = () => (
  <svg
    className="w-7 h-7 text-blue-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
  </svg>
);

const categoryProducts = [
  { image: "green-gown.jpeg", title: "Green Gown", stars: 5 },
  { image: "green-gown.jpeg", title: "Classic Dress", stars: 4 },
  { image: "green-gown.jpeg", title: "Summer Wear", stars: 5 },
  { image: "green-gown.jpeg", title: "Summer Wear", stars: 5 }
];

const furnitureProducts = [
  { image: "/sofa-image.jpg", title: "Modern Sofa", stars: 5 },
  { image: "/sofa-image.jpg", title: "Classic Couch", stars: 4 },
  { image: "/sofa-image.jpg", title: "Luxury Sofa", stars: 5 },
  { image: "/sofa-image.jpg", title: "Comfy Seat", stars: 4 },
];

const reviewData = [
  {
    name: "Jane Doe",
    image: "/man1.avif",
    review: "Great platform! I found exactly what I needed.",
    stars: 5,
  },
  {
    name: "John Smith",
    image: "/lady2.jpg",
    review: "Easy to use and very helpful for donations.",
    stars: 4,
  },
  {
    name: "Mary Lee",
    image: "/lady1.webp",
    review: "Fast delivery and friendly sellers!",
    stars: 5,
  },
  {
    name: "Ahmed Musa",
    image: "/man2.jpg",
    review: "Highly recommend JALAI for everyone.",
    stars: 5,
  },
];

const heroSlides = [
  {
    bg: "bg-gradient-to-r from-green-100 via-blue-50 to-white",
    image: "/hand-shake.jpg",
    title:
      "A market place designed to help people connect and fulfill each other's needs through the exchange of quality pre-owned products",
    buttons: [
      {
        label: "Sell Now",
        style: "bg-green-600 hover:bg-green-700",
        onClick: () => alert("Sell Now clicked!"),
      },
      {
        label: "Buy Now",
        style: "bg-blue-600 hover:bg-blue-700",
        onClick: () => alert("Buy Now clicked!"),
      },
    ],
  },
  {
    bg: "bg-gradient-to-r from-blue-100 via-green-50 to-white",
    image: "/kids-smiling.jpeg",
    title: "A place where you can put a smile on others faces",
    buttons: [
      {
        label: "Donate Now",
        style: "bg-yellow-500 hover:bg-yellow-600",
        onClick: () => alert("Donate Now clicked!"),
      },
    ],
  },
];

function useReviewsPerSlide() {
  const [reviewsPerSlide, setReviewsPerSlide] = useState(getReviewsPerSlide());

  function getReviewsPerSlide() {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  }

  useEffect(() => {
    function handleResize() {
      setReviewsPerSlide(getReviewsPerSlide());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return reviewsPerSlide;
}

const Home = ({
  cartItems,
  setCartItems,
  cartOpen,
  setCartOpen,
  handleAddToCart,
  handleRemoveFromCart,
  handleCartClick,
  handleProfileClick,
  user,
  onLogout,
}) => {

  // Example handlers for product actions
  const handleViewProduct = (title) => {
    // Find product in categoryProducts or furnitureProducts
    const product =
      categoryProducts.find((p) => p.title === title) ||
      furnitureProducts.find((p) => p.title === title);
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const [slide, setSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [reviewSlide, setReviewSlide] = useState(0);
  const reviewsPerSlide = useReviewsPerSlide();
  const totalSlides = Math.ceil(reviewData.length / reviewsPerSlide);
  const currentReviews = reviewData.slice(
    reviewSlide * reviewsPerSlide,
    reviewSlide * reviewsPerSlide + reviewsPerSlide
  );

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [slide]);

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      {/* NAVBAR */}
      <Header
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleCartClick={handleCartClick}
        handleProfileClick={handleProfileClick}
        user={user}
        onLogout={onLogout}
      />

      {/* PAGE CONTENT WITH MARGIN */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8">

        {/* HERO SLIDER SECTION */}
        <section
          className={`relative rounded-xl overflow-hidden mb-8 ${heroSlides[slide].bg} transition-colors duration-700`}
        >
          <div className="flex flex-col md:flex-row items-center min-h-[400px]">
            {/* Left: Text */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-snug drop-shadow-lg">
                {heroSlides[slide].title}
              </h2>
              <div className="flex gap-4 mb-4 flex-wrap">
                {heroSlides[slide].buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    className={`text-white px-7 py-3 rounded shadow-lg font-semibold transition ${btn.style}`}
                    onClick={btn.onClick}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Right: Image */}
            <div className="flex-1 flex justify-center items-center p-4">
              <div className="relative w-[300px] h-[320px] md:w-[350px] md:h-[380px]">
                {/* The image with blend mode */}
                <img
                  src={heroSlides[slide].image}
                  alt="Hero"
                  className="w-full h-full object-cover rounded-xl mix-blend-multiply opacity-90 transition-all duration-700"
                  style={{ background: "transparent" }}
                />
                {/* Optional: a subtle overlay for extra blending */}
                <div className="absolute inset-0 rounded-xl bg-white/30 pointer-events-none" />
              </div>
            </div>
          </div>
          {/* Slider Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                className={`w-4 h-4 rounded-full border-2 border-green-600 ${
                  slide === idx ? "bg-green-600" : "bg-white"
                } transition`}
                onClick={() => setSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="text-center py-12 px-6 bg-white rounded-xl mt-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">About JALAI</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              JALAI is a comprehensive platform that bridges the gap between compassion and action.
              We connect generous hearts with orphanages in need, while also providing a sustainable
              marketplace for quality second-hand goods.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-green-600 mb-3">🏠 Support Orphanages</h3>
                <p className="text-gray-600">
                  Make direct donations to verified orphanages across Cameroon. Every contribution
                  helps provide food, shelter, education, and care for children in need.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-green-600 mb-3">🛍️ Sustainable Shopping</h3>
                <p className="text-gray-600">
                  Shop quality second-hand items from clothing to electronics. Give products a second
                  life while supporting a circular economy that benefits everyone.
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <p className="text-green-800 font-medium">
                "Together, we're building a community where every purchase makes a difference
                and every donation changes a life."
              </p>
            </div>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700">
              Explore Now
            </button>
          </div>
        </section>

        {/* CATEGORY PREVIEW SECTIONS */}
        <section className="px-0 py-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Clothing
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {categoryProducts.map((prod, idx) => (
              <CategoryCard
                key={idx}
                image={prod.image}
                title={prod.title}
                onView={() => handleViewProduct(prod.title)}
                onAddToCart={() => handleAddToCart(prod.title)}
              />
            ))}
          </div>

          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Furniture
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {furnitureProducts.map((prod, idx) => (
              <CategoryCard
                key={idx}
                image={prod.image}
                title={prod.title}
                onView={() => handleViewProduct(prod.title)}
                onAddToCart={() => handleAddToCart(prod.title)}
              />
            ))}
          </div>
        </section>

        {/* CUSTOMER REVIEWS */}
        <section className="bg-gray-100 px-6 py-10 rounded-xl">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6">
            Customer Reviews
          </h3>
          <div className="relative flex items-center justify-center">
            {/* Prev Button */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-green-100"
              onClick={() => setReviewSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
              aria-label="Previous review"
            >
              &#8592;
            </button>
            {/* Reviews */}
            <div className="flex gap-6 w-full justify-center">
              {currentReviews.map((review, idx) => (
                <ReviewCard key={idx} {...review} />
              ))}
            </div>
            {/* Next Button */}
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 hover:bg-green-100"
              onClick={() => setReviewSlide((prev) => (prev + 1) % totalSlides)}
              aria-label="Next review"
            >
              &#8594;
            </button>
          </div>
          {/* Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                className={`w-3 h-3 rounded-full ${reviewSlide === idx ? "bg-green-600" : "bg-gray-300"}`}
                onClick={() => setReviewSlide(idx)}
                aria-label={`Go to review slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Product Details Popup */}
      <ViewProductDetails
        open={showDetails}
        onClose={() => setShowDetails(false)}
        product={selectedProduct}
      />
      {/* Cart Popup */}
      <Cart
        open={cartOpen}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onClose={() => setCartOpen(false)}
        onCheckout={() => alert("Proceeding to checkout...")}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;

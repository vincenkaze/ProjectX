import NewsChecker from "../components/NewsChecker";
import { useAuth } from "../context/AuthContext";

interface HomePageProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HomePage({ setShowSignUp }: HomePageProps) {
  const { isAuthenticated } = useAuth();

  const maybeRequireSignup = () => {
    const count = Number(localStorage.getItem("predict_count") || 0);
    if (!isAuthenticated && count >= 2) {
      setShowSignUp(true);
    } else {
      localStorage.setItem("predict_count", String(count + 1));
    }
  };

  return (
    <>
      <header className="hero-section text-white text-center">
        <div className="container py-5">
          <h1 className="display-4 fw-bold mb-4">Check Before You Share Something</h1>
          <p className="lead mb-5">
            Our advanced AI analyzes news content to help you identify misinformation and stay informed.
          </p>

          <div className="news-checker-card p-4 rounded shadow-lg bg-white">
            <h3 className="mb-4">Check News Authenticity</h3>
            <NewsChecker requireAuthCheck={maybeRequireSignup} />
          </div>
        </div>
      </header>

      <section id="about" className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <h2 className="fw-bold mb-4">About TruthGuard</h2>
              <p className="lead">TruthGuard is an AI-powered platform designed to combat misinformation.</p>
              <p>We analyze news for deception, bias, or inaccuracy using NLP + ML.</p>
              <p>Multiple verification techniques give users a full reliability picture.</p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1549138144-42ff3cdd2bf8?q=80&w=2052&auto=format&fit=crop"
                alt="AI analyzing data"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">How It Works</h2>
          <div className="row">
            {/* Add steps: Content Analysis, Source Verification, Pattern Recognition */}
          </div>
        </div>
      </section>

      <section id="faq" className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            {/* FAQ accordion items */}
          </div>
        </div>
      </section>
    </>
  );
}
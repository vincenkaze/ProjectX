import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void; // Trigger forgot password modal
}

export default function LoginForm({ onSuccess, onForgotPassword }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      localStorage.removeItem("predict_count");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="form-options">
        <label className="checkbox-label">
          <input type="checkbox" name="remember-me" /> Remember me
        </label>

        {/* This triggers the modal instead of navigation */}
        {onForgotPassword ? (
          <span
            className="link cursor-pointer"
            onClick={onForgotPassword}
          >
            Forgot password?
          </span>
        ) : (
          <Link to="/forgot-password" className="link">
            Forgot password?
          </Link>
        )}
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
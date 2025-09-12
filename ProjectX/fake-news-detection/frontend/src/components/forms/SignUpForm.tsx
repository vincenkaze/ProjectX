import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { validatePassword } from "../../utils/validators";

interface SignUpFormProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errorMsg = validatePassword(formData.password);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setIsLoading(true);

      const user = await registerUser(
        formData.email,
        formData.password,
        formData.name
      );

      if (!user) {
        setError("Registration failed. Please try again.");
        return;
      }

      await login(formData.email, formData.password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail || err?.message || "Failed to create an account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          required
          value={formData.name}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
      </div>

      {/* Password with eye toggle */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          required
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <img
          src={showPassword ? "/icons/eye-off.png" : "/icons/eye.png"}
          alt="Toggle password visibility"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      {/* Confirm password with eye toggle */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input-field"
        />
        <img
          src={showConfirmPassword ? "/icons/eye-off.png" : "/icons/eye.png"}
          alt="Toggle confirm password visibility"
          className="password-toggle"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />
      </div>

      <button
        type="submit"
        className={`btn btn-primary w-full ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Sign up"}
      </button>
    </form>
  );
}
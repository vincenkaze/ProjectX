import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

const LoginModal = ({onClose, onSwitchToSignUp,}: {onClose: () => void; onSwitchToSignUp: () => void;}) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(form.email, form.password); // fetch from backend
      login(user); // set into AuthContext
      localStorage.removeItem("predict_count");
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Log in to your account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            placeholder="Email"
            className="border px-3 py-2 w-full rounded"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            placeholder="Password"
            className="border px-3 py-2 w-full rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Log In
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
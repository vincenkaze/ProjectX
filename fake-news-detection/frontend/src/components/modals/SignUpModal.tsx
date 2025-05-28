import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const SignUpModal = ({ onClose, onSwitchToLogin, }: { onClose: () => void; onSwitchToLogin: () => void; }) => {

  const { signup } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(form.email, form.password, form.name);
      localStorage.removeItem("predict_count");
      onClose();
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err?.response?.data?.detail || err?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
      role="dialog" 
      aria-labelledby="signup-title" 
      aria-describedby="signup-desc"
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
        <h2 id="signup-title" className="text-lg font-bold mb-4">Create your account</h2>
        <p id="signup-desc" className="text-sm mb-4">Join us to continue using the service.</p>
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <input 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            placeholder="Full name" 
            className="border px-3 py-2 w-full rounded" 
          />
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
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            onClick={onSwitchToLogin}
            className="text-blue-600 underline cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
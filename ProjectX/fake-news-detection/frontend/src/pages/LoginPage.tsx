import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to TruthGuard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Track news authenticity with AI
          </p>
        </div>

        {/*  Reusable form */}
        <LoginForm />

        <div className="text-center text-sm text-gray-600">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
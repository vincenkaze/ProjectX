import PasswordRecoveryForm from "../components/forms/PasswordRecoveryForm";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Reset Your Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address to receive reset instructions.
          </p>
        </div>

        {/* Reusable form */}
        <PasswordRecoveryForm />

        {/* Footer link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
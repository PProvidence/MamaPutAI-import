import { useState } from "react";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/authclient";

const LoginPage = () => {
  const [step, setStep] = useState("options"); // 'options' | 'verify' | 'changeP'

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Ensure all fields are filled before enabling the button
  const [showPassword, setShowPassword] = useState(false);
  const passwordHasNumber = /\d/.test(formData.newPassword);
  const passwordHasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword);
  const isNewPasswordValid =
    formData.newPassword.length >= 8 && passwordHasNumber && passwordHasSymbol;
  const passwordsMatch = formData.newPassword === formData.confirmPassword;
  const isResetValid = isNewPasswordValid && passwordsMatch;
  const isFormValid =
    formData.email.length > 0 && formData.password.length >= 8;
  const isPasswordValid = formData.password.length >= 8;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess() {
            navigate("/dashboard");
          },
          onError(error) {
            console.log(error.response);
          },
        }
      );

      if (error) {
        setError(error.message || "An unknown error occurred");
        throw new Error(error.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center md:flex-row bg-white">
      <div className="w-full flex justify-center items-center p-6 md:p-12 ">
        <div className="w-full max-w-md bg-white p-10 shadow-2xl rounded-lg">
          {step === "options" && (
            // Step 1: Log In Options
            <div>
              <h2 className="text-2xl font-bold flex justify-center pb-6 mb-4">
                Log In
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label
                  htmlFor="email"
                  className="font-medium text-xs text-gray-900"
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Input your email address"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full p-3 mb-4 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                  required
                />

                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="font-medium text-xs text-gray-900"
                  >
                    Password
                  </label>
                  <p
                    className="text-right text-sm text-green-600 font-semibold cursor-pointer"
                    onClick={() => setStep("changeP")}
                  >
                    Forgot Password?
                  </p>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    minLength="8"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full p-3 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <FaRegEye className="w-5 h-5" />
                    ) : (
                      <FaRegEyeSlash className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {!isPasswordValid && formData.password.length > 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    Password must be at least 8 characters
                  </p>
                )}
                <p className="text-gray-400 font-medium text-xs mb-6">
                  Use 8 characters or more
                </p>
                <p className="text-red-500 text-center">{error}</p>
                <button
                  disabled={!isFormValid || isLoading}
                  onClick={handleSubmit}
                  className="w-full text-white py-2 rounded-lg font-semibold transition bg-green-600 hover:bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </form>
              <div className="mt-6 space-y-2">
                <button
                  onClick={async () => {
                    await authClient.signIn.social(
                      {
                        provider: "google",
                        callbackURL: "http://localhost:5173/dashboard"
                      },
                     
                    );
                  }}
                  className="w-full flex text-black items-center hover:opacity-80 justify-center gap-3 bg-white border border-gray-200 py-3 text-sm sm:text-base rounded-lg font-semibold transition hover:bg-gray-50"
                >
                  <FcGoogle />
                  Continue with Google
                </button>

                <button className="w-full flex text-black items-center hover:opacity-80 justify-center gap-3 bg-white border border-gray-200 py-3 text-sm sm:text-base rounded-lg font-semibold transition hover:bg-gray-50">
                  <FaApple />
                  Continue with Apple
                </button>
              </div>

              <p className="mt-4 text-sm text-center">
                New User?{" "}
                <Link to="/signup" className="text-green-600 font-semibold">
                  Sign up
                </Link>
              </p>
            </div>
          )}

          {step === "changeP" && (
            <div>
              <h2 className="text-2xl flex justify-center pb-4 font-bold mb-4">
                Create New Password
              </h2>
              <p className="text-sm text-gray-800 mb-6">
                Ensure your new password is 8 character long, contain at least
                one number and one symbol.
              </p>
              <label
                htmlFor="resetNewPassword"
                className="font-medium text-xs text-gray-900"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  minLength="8"
                  onChange={handleChange}
                  value={formData.newPassword}
                  className="w-full p-3 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <FaRegEye className="w-5 h-5" />
                  ) : (
                    <FaRegEyeSlash className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!isNewPasswordValid && formData.newPassword.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 8 characters and must contain at
                  least one character and symbol.
                </p>
              )}
              <p className="text-gray-400 font-medium text-xs mb-6">
                Use 8 characters or more
              </p>

              <label
                htmlFor="confirmPassword"
                className="font-medium text-xs text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  minLength="8"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className="w-full p-3 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <FaRegEye className="w-5 h-5" />
                  ) : (
                    <FaRegEyeSlash className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!isPasswordValid && formData.password.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 8 characters and must contain at
                  least one character and symbol.
                </p>
              )}
              {!passwordsMatch && formData.confirmPassword.length > 0 && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}

              <button
                onClick={() => setStep("options")}
                type="submit"
                disabled={!isResetValid}
                className={`w-full py-2 rounded-lg font-semibold transition mt-4 ${
                  isResetValid
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Reset Password
              </button>
              <button
                onClick={() => setStep("options")}
                className="w-full mt-4 text-sm text-gray-500 hover:underline"
              >
                ← Back to Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

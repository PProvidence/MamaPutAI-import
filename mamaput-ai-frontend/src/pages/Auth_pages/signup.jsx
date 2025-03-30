import { useState } from "react";
import {
  FaApple,
  FaCircleCheck,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/authclient";

const steps = [
  {
    title: "Get Started",
    description: "Create an account using your email, Google, or Apple.",
  },
  {
    title: "Setup Account",
    description:
      "Enter your dietary preferences, allergies, and health goals to get meal recommendations tailored to you.",
  },
  {
    title: "Get AI Personalised Meal Plans",
    description:
      "Monitor your meals, get AI-powered meal suggestions, and integrate with fitness apps for a holistic approach to wellness.",
  },
];

const SignupPage = () => {
  const [step, setStep] = useState("options"); // 'options' | 'signup' | 'verify'

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [OTP, setOTP] = useState("");
  const [isLoading, setIsLoading] = useState({
    create: false,
    verify: false,
  });

  const navigate = useNavigate();

  // Ensure all fields are filled before enabling the button
  const [showPassword, setShowPassword] = useState(false);
  const passwordHasNumber = /\d/.test(formData.password);
  const passwordHasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const isPasswordValid =
    formData.password.length >= 8 && passwordHasNumber && passwordHasSymbol;
  const isFormValid =
    formData.email.trim() &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    isPasswordValid;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading({ create: true });
    try {
      await authClient.signUp.email(
        {
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
        },
        {
          onError() {
            throw new Error("Email Exists");
          },
        }
      );
      await authClient.emailOtp.sendVerificationOtp({
        email: formData.email,
        type: "email-verification",
      });
      setStep("verify");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({ create: false });
    }
  };

  const handleVerify = async () => {
    setIsLoading({ verify: true });
    await authClient.emailOtp.verifyEmail(
      {
        email: formData.email,
        otp: OTP,
      },
      {
        onSuccess() {
          navigate("/dashboard");
        },
      }
    );
    setIsLoading({ verify: false });
  };

  return (
    <div className="h-screen flex flex-col-reverse items-center justify-center lg:flex-row bg-white gap-16">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-4 sm:p-6 md:p-12">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 mb-6">
            <FaCircleCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 fill-green-600" />
            <div>
              <p className="text-base font-semibold text-gray-800">
                {step.title}
              </p>
              <p className="text-xs text-gray-400">{step.description}</p>
            </div>
          </div>
        ))}
        <div>
          <p className="mt-12 text-xs font-medium text-gray-400">Contact Us</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 ">
        <div className="w-full max-w-md bg-white p-10 shadow-2xl rounded-lg">
          {step === "options" && (
            // Step 1: Sign Up Options
            <div>
              <h2 className="text-2xl flex justify-center pb-4 font-bold mb-4">
                Create Account
              </h2>

              <button
                onClick={() => setStep("signup")}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-2 rounded-lg font-semibold transition hover:bg-gray-50"
              >
                <MdEmail />
                Sign Up with Email
              </button>

              {/* OR Separator */}
              <div className="flex items-center gap-4 my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
              <div className="space-y-2">
                <button
                  onClick={async () => {
                    await authClient.signIn.social({
                      provider: "google",
                      callbackURL: "http://localhost:5173/dashboard",
                    });
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
                Existing User?{" "}
                <Link to="/login" className="text-green-600 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          )}

          {step === "signup" && (
            // Step 2: Email Signup Form
            <div>
              <h2 className="text-2xl font-bold flex justify-center pb-6 mb-4">
                Create Account
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
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-medium text-xs text-gray-900"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={formData.firstName}
                      className="w-full p-3 mb-4 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="font-medium text-xs text-gray-900"
                    >
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={formData.lastName}
                      className="w-full p-3 mb-4 border border-gray-300 focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-xs"
                      required
                    />
                  </div>
                </div>
                <label
                  htmlFor="password"
                  className="font-medium text-xs text-gray-900"
                >
                  Password
                </label>
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
                    Password must be at least 8 characters and must contain at
                    least one character and symbol.
                  </p>
                )}
                <p className="text-gray-400 font-medium text-xs mb-6">
                  Use 8 characters or more
                </p>
                <button
                  disabled={!isFormValid || isLoading.create}
                  onClick={handleSubmit}
                  className="w-full text-white py-2 rounded-lg font-semibold transition bg-green-600 hover:bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              </form>
              <button
                onClick={() => setStep("options")}
                className="w-full mt-4 text-sm text-gray-500 hover:underline"
              >
                ← Back to sign-up options
              </button>
            </div>
          )}

          {step === "verify" && (
            // Step 3: Verification Step
            <div>
              <h2 className="text-2xl flex justify-center pb-4 font-bold mb-4">
                Verify Email Address
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                To verify email, we’ve sent a one time password (OTP) to{" "}
                {formData.email}
              </p>
              <label
                htmlFor="number"
                className="font-medium text-xs text-gray-900"
              >
                OTP Code
              </label>
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                type="text"
                placeholder="Enter Code"
                className="w-full p-3 mb-4 border border-gray-300 text-lg text-center tracking-widest focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600 rounded-md"
                required
              />
              <button
                disabled={isLoading.verify}
                onClick={handleVerify}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-200 disabled:cursor-not-allowed w-full text-white h-12 rounded-md font-semibold"
              >
                Confirm Email
              </button>
              <p className="mt-4 text-sm text-center">
                Didn&apos;t get code?{" "}
                <button
                  onClick={async () => {
                    await authClient.emailOtp.sendVerificationOtp({
                      email: formData.email,
                      type: "email-verification",
                    });
                  }}
                  className="text-green-600 font-semibold"
                >
                  Resend
                </button>
              </p>
              <button
                onClick={() => setStep("signup")}
                className="w-full mt-4 text-sm text-gray-500 hover:underline"
              >
                ← Back to sign-up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

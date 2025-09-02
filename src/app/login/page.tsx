"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { hashPassword } from "@/utils/encryption";

type LoginStep = "username" | "secure-word" | "password" | "success";

export default function LoginPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<LoginStep>("username");
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getSecureWord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Failed to get secure word");
      }

      const data = await response.json();
      setSecureWord(data.secureWord);
      setCurrentStep("secure-word");
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Encrypt password before sending
      const encryptedPassword = await hashPassword(password);

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          encryptedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      setCurrentStep("success");

      // Trigger navbar hiding by dispatching custom event and setting session storage
      sessionStorage.setItem("loginSuccess", "true");
      window.dispatchEvent(new Event("loginSuccess"));

      // Auto-redirect with countdown
      let timeLeft = 3;
      setCountdown(timeLeft);

      const countdownInterval = setInterval(() => {
        timeLeft--;
        setCountdown(timeLeft);

        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          router.push("/dashboard");
        }
      }, 1000);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case "username":
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter Username</h2>
            <form
              onSubmit={handleUsernameSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        );

      case "secure-word":
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter Password</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your secure word is:</p>
              <p className="text-xl font-mono font-bold text-green-800">{secureWord}</p>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-6"
            >
              {/* Radio button section */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Is your Secure Word Phrase correct?
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="phraseCorrect"
                      value="yes"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="phraseCorrect"
                      value="no"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  If this is not your Secure Word Phrase, do not login. Contact Aeon Bank Customer Support at 03-2170 8000 for assistance.
                </p>
              </div>

              {/* Password input section */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        );

      case "password":
        return (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Enter Password</h2>
            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        );

      case "success":
        return (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-8">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Login Successful!</h2>
              <p className="text-green-600 mb-6">
                Welcome, {username}! You have been successfully logged in.
                <br />
                <span className="text-sm">Redirecting to dashboard in {countdown} seconds...</span>
              </p>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            <div
              className={`w-3 h-3 rounded-full ${
                currentStep === "username"
                  ? "bg-blue-600"
                  : ["secure-word", "password", "success"].includes(currentStep)
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                currentStep === "secure-word"
                  ? "bg-blue-600"
                  : ["password", "success"].includes(currentStep)
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                currentStep === "password"
                  ? "bg-blue-600"
                  : currentStep === "success"
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
            <div
              className={`w-3 h-3 rounded-full ${
                currentStep === "success" ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            Step{" "}
            {currentStep === "username"
              ? "1"
              : currentStep === "secure-word"
              ? "2"
              : currentStep === "password"
              ? "3"
              : "4"}{" "}
            of 4
          </p>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-lg shadow-lg p-8">{renderStep()}</div>
      </div>
    </div>
  );
}

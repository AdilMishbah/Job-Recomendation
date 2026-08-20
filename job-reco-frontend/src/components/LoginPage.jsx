import { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // ईमेल से नाम एक्सट्रेक्ट करना (जैसे adil@gmail.com -> Adil)
    const rawName = email.split("@")[0];
    const displayName =
      rawName.charAt(0).toUpperCase() + rawName.slice(1);

    onLoginSuccess({
      name: displayName,
      email: email.trim(),
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* Brand Logo */}
        <div className="login-brand">
          <span className="login-brand-icon">💼</span>
          <h2>
            Dream<span className="login-brand-blue">Jobs</span>
          </h2>
        </div>

        <div className="login-header">
          <h3>Welcome Back</h3>
          <p>Sign in to discover curated jobs and track applications.</p>
        </div>

        {error && <div className="login-error-badge">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div className="password-label-wrapper">
              <label htmlFor="login-password">Password</label>
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-extras">
            <label className="remember-me">
              <input type="checkbox" defaultChecked />
              <span>Remember me</span>
            </label>
            <a href="#forgot" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Sign In to Account
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="#signup" onClick={(e) => e.preventDefault()}>
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
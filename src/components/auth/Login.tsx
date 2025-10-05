import { useEffect, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  useRegisterMutation,
  useLoginMutation,
} from "../../features/auth/authApi";
import { setUser } from "../../features/auth/authSlice";
import { showErrorToast, showSuccessToast } from "../../ult/toast/toast";
import { useAppDispatch } from "../../app/hooks";
import Loader from "../../ult/loader/Loader";
import { useAuth } from "../../hook/useAuth";

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const Login: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [newAccount, setNewAccount] = useState(false);
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";

  // Sync input fields when toggling between login/register
  useEffect(() => {
    setFormData(
      newAccount
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" }
    );
  }, [newAccount]);

  // toggle between login/register
  const handleToggleForm = () => {
    setNewAccount((prev) => !prev);
  };

  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle navigation logic (common for both login and register)
  const handleNavigation = () => {
    const pendingReply = sessionStorage.getItem("pendingReply");
    const pendingComment = sessionStorage.getItem("pendingComment");

    if (pendingReply) {
      const replyData = JSON.parse(pendingReply);
      sessionStorage.removeItem("pendingReply");
      navigate(`/blogs/${replyData.blogId}`, {
        replace: true,
        state: { focusCommentId: replyData.targetCommentId },
      });
    } else if (pendingComment) {
      const { blogId } = JSON.parse(pendingComment);
      sessionStorage.removeItem("pendingComment");
      navigate(`/blogs/${blogId}`, { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // Basic validation
    if (!email || !password || (newAccount && !name)) {
      showErrorToast("Please fill in all required fields!");
      return;
    }

    try {
      if (newAccount) {
        // Register
        const res = await registerUser({ name, email, password }).unwrap();
        showSuccessToast(res.message || "Account created successfully!");

        // After registration, automatically log them in
        const loginRes = await loginUser({ email, password }).unwrap();
        if (loginRes.user) {
          dispatch(setUser({ user: loginRes.user }));
          handleNavigation();
          setTimeout(() => setNewAccount(false), 0);
        }
      } else {
        // Login
        const res = await loginUser({ email, password }).unwrap();

        // Save user + token in Redux
        dispatch(setUser({ user: res.user }));

        showSuccessToast("Logged in successfully!");
        setFormData({ email: "", password: "" });
        handleNavigation();
      }
    } catch (error: any) {
      showErrorToast(error?.data?.message || "Something went wrong!");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: string })?.from || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  // Loading state
  if (isRegistering || isLoggingIn) return <Loader />;

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto my-4 sm:my-20">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-8 text-zinc-700">
        <div className="max-w-md mx-auto">
          <div className="w-full mx-auto px-3">
            <h2 className="text-sm lg:text-lg font-bold text-center uppercase">
              {newAccount ? "Create an account" : "User Login"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name field (only for register) */}
              {newAccount && (
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full bg-white border border-zinc-200"
                    placeholder="Enter Name"
                    required={newAccount}
                  />
                </div>
              )}

              {/* Email field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-white border border-zinc-200"
                  placeholder="email@example.com"
                  required
                />
              </div>

              {/* Password field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full bg-white border border-zinc-200"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-yellow-500 w-full uppercase rounded border-0"
                  disabled={isRegistering || isLoggingIn}
                >
                  {isRegistering || isLoggingIn
                    ? "Processing..."
                    : newAccount
                    ? "Register"
                    : "Login"}
                </button>
              </div>
            </form>

            {/* Toggle link */}
            <div className="text-center py-2">
              {newAccount ? (
                <p>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-teal-600 underline cursor-pointer"
                    onClick={handleToggleForm}
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  No account?{" "}
                  <button
                    type="button"
                    className="text-teal-600 underline cursor-pointer"
                    onClick={handleToggleForm}
                  >
                    Create An Account
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

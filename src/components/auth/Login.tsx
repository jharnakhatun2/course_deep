import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./UserContext";
import { showErrorToast, showSuccessToast } from "../../ult/toast/toast";
import Button from "../../ult/button/Button";
import { FcGoogle } from 'react-icons/fc';

interface FormData {
  name?: string;
  email: string;
  password: string;
}

const Login = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const { createUser, userLogIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  // Sync input data structure when newAccount toggles
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

  // handle input change dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const { email, password } = formData;

    if (newAccount) {
      //create user
      createUser(email, password)
        .then((result) => {
          showSuccessToast("Account created successfully!");
          console.log("Create User Successfully", result);
          setFormData({ name: "", email: "", password: "" });
          navigate("/");
        })
        .catch((error) => console.error(error));
    } else {
      //login user
      userLogIn(email, password)
        .then((result) => {
          showSuccessToast("Logged in successfully!");
          console.log("User Login Successfully", result);
          setFormData({ email: "", password: "" });
          navigate("/");
        })
        .catch((error) => showErrorToast(error.message));
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        showSuccessToast("Logged in successfully!");
        console.log("User Login Successfully", result);
        navigate("/");
      })
      .catch((error) => showErrorToast(error.message));
  };
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto my-4 sm:my-20">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-2xl sm:rounded-3xl sm:p-8">
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
                  <label className="input input-bordered flex items-center gap-2 w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm4 1H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" />
                    </svg>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="grow"
                      placeholder="Enter Name"
                    />
                  </label>
                </div>
              )}

              {/* Email field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow"
                    placeholder="email@example.com"
                    required
                  />
                </label>
              </div>

              {/* Password field */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="grow"
                    placeholder="Enter password"
                    required
                  />
                </label>
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-yellow-500 w-full uppercase rounded"
                >
                  {newAccount ? "Register" : "Login"}
                </button>
              </div>
            </form>

            <div className="text-center">
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
            <div className="divider">OR</div>
            {/* Google signin */}
              <button onClick={handleGoogleSignIn} className="border w-full flex items-center justify-center gap-2 rounded p-2 bg-zinc-200 border-zinc-200 cursor-pointer hover:bg-zinc-100 shadow-lg hover:shadow transition-smooth"><FcGoogle className="text-xl"/>Google SignIn</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

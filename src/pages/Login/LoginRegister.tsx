import { useEffect, useState } from "react";
import styles from "./LoginRegister.module.scss";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import useForm from "../../hooks/useForm";
import * as Yup from "yup";
import { dummySlider } from "../../data/slider";
import { useAuth } from "../../provider/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingContent from "../../components/LoadingContent/LoadingContent";

const LoginRegister = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [sliderActive, setSliderActive] = useState(0);
  const [stopAnimate, setStopAnimate] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!stopAnimate) {
      setTimeout(() => {
        if (sliderActive < dummySlider.length - 1) {
          setSliderActive(sliderActive + 1);
        } else {
          setSliderActive(0);
        }
      }, 3000);
    }
  }, [sliderActive, stopAnimate]);

  // Validation schema for both login and register forms
  const validation = () =>
    Yup.object().shape({
      email: Yup.string().required("E-mail is required!"),
      password: Yup.string().required("Password is required!"),
      username: isLogin
        ? Yup.string().notRequired()
        : Yup.string().required("Username is required!"),
    });

  // Using the custom useForm hook for form management and validation
  const { values, setFieldValue, isValid } = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validation: validation(),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isValid) return;

    setLoading(true); // Set loading menjadi true saat proses mulai

    if (isLogin) {
      login(values.email, values.password);
      navigate("/"); // Redirect setelah login berhasil
      setLoading(false); // Set loading menjadi false setelah proses selesai
    } else {
      register({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      navigate("/"); // Redirect setelah registrasi berhasil
      setLoading(false); // Set loading menjadi false setelah proses selesai
    }
  };

  return (
    <div className={styles["auth-container"]}>
      {loading && <LoadingContent />}
      {/* Left Form */}
      <div className={styles["form-section"]}>
        <div className={styles["form-box"]}>
          <div className={styles["logo-container"]}>
            <img src="/logo.png" alt="logo" className={styles["logo"]} />
          </div>
          <form className={styles["form-content"]} onSubmit={handleFormSubmit}>
            <div className={styles["form-header"]}>
              <div className={styles["title"]}>Welcome!</div>
              <div className={styles["desc"]}>
                Please {isLogin ? "login" : "register"} to continue
              </div>
            </div>

            {/* Render username input only if registering */}
            {!isLogin && (
              <InputField
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={values.username}
                onChange={(e) => setFieldValue("username", e.target.value)}
                error={
                  submitted && !values.username ? "Username is required!" : ""
                }
              />
            )}

            <InputField
              label="E-mail"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              error={submitted && !values.email ? "E-mail is required!" : ""}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={(e) => setFieldValue("password", e.target.value)}
              error={
                submitted && !values.password ? "Password is required!" : ""
              }
            />

            {/* Toggle between login and register */}
            <div className={styles["toggle-container"]}>
              <div className={styles["toggle-text"]}>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </div>
              <div
                className={styles["toggle-text-option"]}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Register here" : "Log in"}
              </div>
            </div>

            {/* inputs as before, with your `error={submitted && !values.xxx ? …}` logic */}
            <Button type="submit" disabled={!isValid || !submitted}>
              {isLogin ? "Log in" : "Register"}
            </Button>
          </form>
        </div>
      </div>
      {/* Right Form */}
      <div className={styles["slider"]}>
        <div
          className={`${styles["slider-images"]}`}
          style={{
            width: 951 * (dummySlider.length - 1),
            transform: `translateX(-${
              (100 / (dummySlider.length - 1)) * sliderActive
            }%)`,
            transition: "transform .5s ease-in-out",
          }}
        >
          {dummySlider.map((item, key) => (
            <img
              key={key}
              alt="slider-illustration"
              src={item.image}
              className={styles["illustration"]}
            />
          ))}
        </div>
        <div className={styles["slider-overlay"]}></div>
        <div className={styles["slider-controller"]}>
          <div className={styles["slider-text"]}>
            {dummySlider[sliderActive].text}
          </div>
          <div className={styles["slider-subtext"]}>
            {dummySlider[sliderActive].subtext}
          </div>
          <div className={styles["slider-indicator-controller"]}>
            {dummySlider.map((_, key) => (
              <div
                key={key}
                className={`${styles["slider-indicator"]} ${
                  key === sliderActive ? styles["active"] : ""
                }`}
                onClick={() => {
                  setSliderActive(key);
                  setStopAnimate(true);
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

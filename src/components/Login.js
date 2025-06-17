import React, { useRef, useState } from "react";
import Header from "./Header";
import validate from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firrebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignin, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = validate(email.current.value, password.current.value);
    setErrorMessage(message);

    if (!isSignin) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://occ-0-3215-3663.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXTZ87gWedgajar1VOIJQNIy2U1sulesgGCIouHnReQp2bCq_rcl2zhI9rRDXIzT_X7240ZzVOcfMQ1DXAPdFsyGu2QeFd8.png?r=145",
          })
            .then(() => {
              const { uid, email, displayName, photoURl } = auth?.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURl: photoURl,
                })
              );
            })
            .catch((error) => { });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  const toggleSignUpForm = () => {
    setIsSignIn(!isSignin);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/04ef06cc-5f81-4a8e-8db0-6430ba4af286/web/IN-en-20250224-TRIFECTA-perspective_3a9c67b5-1d1d-49be-8499-d179f6389935_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignin ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignin && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or Phone number"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-500 text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={() => handleButtonClick()}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignUpForm}>
          {isSignin
            ? "New to Netflix? Sign up now"
            : "Already registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

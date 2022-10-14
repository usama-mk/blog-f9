import React, { useEffect } from "react";
import "./App.css";
// import pages
import HomePage from "./Pages/HomePage/HomePage";
import AddPostPage from "./Pages/AddPostPage/AddPostPage";
import PostDetails from "./Pages/PostDetails/PostDetails";
import MyPostPage from "./Pages/MyPostPage/MyPostPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import Error404 from "./Pages/Error404/Error404";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
// import utils
import ProtectedRoute from "./Utils/ProtectedRoute/ProtectedRoute";
// import router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { logIn, logOut, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs, limit, query, where } from "firebase/firestore";


function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectUser);

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        const q = query(
          collection(db, "users"),
          where("uid", "==", userAuth.uid),
          limit(1)
        );
        getDocs(q).then((querySnapshot) => {
          dispatch(
            logIn({
              uid: userAuth.uid,
              email: userAuth.email,
              name: userAuth.displayName,
              role: querySnapshot.docs[0].data().role,
              profilePic: querySnapshot.docs[0].data().profilePic,
            })
          );
        });
      } else {
        dispatch(logOut());
        console.log("na");
      }
    });
  }, [dispatch]);

  return (
    <div className="font-oswald">
      <BrowserRouter>
        <Routes>
          {/* 404 */}
          <Route path="*" element={<Error404 />} />

          {/* LOGIN & SIGNUP */}
          {/* public routes */}
          <Route path="/" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          {/* PAGES */}
          {/* protected routes */}
          <Route path="/home" element={<HomePage />} />

          <Route
            path="/add-post"
            element={
              <ProtectedRoute>
                <AddPostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-post/:postId"
            element={
              <ProtectedRoute>
                <AddPostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-posts"
            element={
              <ProtectedRoute>
                <MyPostPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

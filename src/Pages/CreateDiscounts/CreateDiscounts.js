import React from "react";
import { useState } from "react";
import { IoImagesOutline } from "react-icons/io5";
import Navbar from "../../Components/Navbar/Navbar";
// firebase imports
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
// imports for authentication
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Ribbon from "../../Components/Ribbon/Ribbon";

function CreateDiscounts() {
  const [title, setTitle] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [imageFile, setimageFile] = useState(null);
  const { user } = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  const navigate = useNavigate(); //Navigation

  const [error, setError] = useState("");

  function showImgName() {
    var imgName = document.getElementById("imgInput").value;
    if (imgName === "") {
      document.getElementById("inputImgName").innerText = "Add Image";
    } else {
      document.getElementById("inputImgName").innerText = imgName
        .split("\\")
        .pop();
    }
  }

  function addPost(event) {
    event.preventDefault();
    if (title === "" && imageFile === null) {
      // check if both inputs are empty
      setError("All fields cannot be empty");
    } else if (title !== "" && imageFile === null) {
      addDocumentToDatabase("");
    } else {
      addImageToStorage(); //call add image function
    }
  }

  function addImageToStorage() {
    const imageRef = ref(storage, `post-images/${imageFile.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageFile);
    uploadTask.on(
      "state-changed",

      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },

      (error) => {
        // error in image upload
        alert(">>> " + error);
      },

      () => {
        // successful image upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDocumentToDatabase(downloadURL); //call add document function
        });
      }
    );
  }

  async function addDocumentToDatabase(downloadURL) {
    try {
      await addDoc(collection(db, "discounts"), {
        posted_by: userId,
        username: userName,
        title: title,
        discountCode: discountCode,
        image: downloadURL,
        date: Timestamp.now(),
      });
      navigate("/discounts");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Navbar />
      <Ribbon />

      <div className="addPostPage__addPostSection">
        <form action="#" className="addPostPage__form">
          <h4>Create Discount</h4>

          <div className="text-[16px] text-[#454444] ">
            <span>Discount Title:</span>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className=" w-[40%] ml-2 "
              required
            />
          </div>

          <div className="text-[16px] text-[#454444] ">
            <span>Discount Code:</span>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value)}
              className=" w-[40%] ml-2 "
              required
            />
          </div>

          {/* image input */}
          <div className="addPostPage__formImg">
            <button>
              <span>
                <IoImagesOutline />
              </span>
              <p id="inputImgName">Add Image</p>
            </button>

            <input
              id="imgInput"
              type="file"
              text="hello"
              onChange={(event) => {
                showImgName();
                setimageFile(event.target.files[0]);
                setError("");
              }}
              accept="image/*"
            />
          </div>

          <p id="error">{error}</p>

          <button onClick={addPost} type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDiscounts;

import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./ProfilePage.css";
import { BiEditAlt } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import {
  BiLock,
  BiMessageAltCheck,
  BiUpvote,
  BiDownvote,
} from "react-icons/bi";
// firebase imports
import { auth, db } from "../../firebaseConfig";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
// imports for authentication
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import Ribbon from "../../Components/Ribbon/Ribbon";
import profileStaticPicture from "../../Assets/profileStaticPicture.png";

function ProfilePage() {
  const { user } = useSelector(selectUser);
  const userName = user.name;
  const userEmail = user.email;
  const userId = user.uid;

  // const userRegNo= user.re

  // reset input fields
  function resetInputs() {
    setName(userName);
    setEmail(userEmail);
    setPassword("");
    setConfirmPassword("");
  }

  // show edit panel
  const [showEdit, setshowEdit] = useState(false);
  function toggleEditPanel() {
    if (showEdit) {
      setshowEdit(false);
    } else {
      setshowEdit(true);
    }
  }

  // MAIN FUNCTIONS
  //
  //
  //

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [dob, setDob] = useState("");
  const [regNo, setRegNo] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserData() {
      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("uid", "==", userId), limit(1))
      );

      // .dob.toDate().toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit' }));
      setDob(querySnapshot.docs[0].data().dob);
      setCourse(querySnapshot.docs[0].data().course);
      setRegNo(querySnapshot.docs[0].data().reg_no);
      setProfilePic(
        querySnapshot.docs[0].data().profilePic
          ? querySnapshot.docs[0].data().profilePic
          : null
      );
    }
    getUserData();
  }, [userId]);

  // Update User
  async function updateUserInDatabase(event) {
    event.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("*all fields are required");
      return;
    } else if (password !== confirmPassword) {
      setError("*passwords don't match");
      return;
    }

    // username
    await updateProfile(auth.currentUser, { displayName: name })
      .then(async () => {
        // email
        await updateEmail(auth.currentUser, email)
          .then(async () => {
            // password
            await updatePassword(auth.currentUser, password)
              .then(() => {
                setError("* profile updated !");
                setTimeout(() => {
                  setError("");
                  setshowEdit(false);
                }, 3000);
              })
              .catch((error) => {
                setError(error.code);
              });
          })
          .catch((error) => {
            setError(error.code);
          });
      })
      .catch((error) => {
        setError(error.code);
      });
  }

  return (
    <div className="profilePage pb-10 bg-[#EBEBEB] ">
      <Navbar />
      <Ribbon />
      <div className="profilePage__profileSection">
        <form className="profilePage__form mt-5 " autoComplete="off">
          {/* <h4>
                       <span className='invisible' >User Profile</span>
                        <span
                            className={`profilePage__formToggleEdit ${showEdit && "profilePage__formToggleEdit--active"}`}
                            onClick={() => {
                                toggleEditPanel();
                                resetInputs();
                            }}
                        >
                            <BiEditAlt />
                        </span>
                    </h4> */}

          {/* name */}
          <div className="flex justify-center  ">
            <img
              src={
                profilePic
                  ? profilePic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              }
              className="object-contain w-[143px] h-[168px] "
              alt=""
            />

            <div className="be-white flex flex-col justify-between min-h-[168px] max-w-[185px] bg-[#FFFCFC]  ml-3 rounded-[10px] py-5 px-1 ">
              <div className="text-[16px] text-[#454444] ">
                <span>Name:</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className=" w-[40%] ml-2 "
                  readOnly={!showEdit}
                  required
                  onKeyUp={() => setError(" ")}
                />{" "}
              </div>

              <div className="text-[16px] text-[#454444] ">DOB: {dob} </div>

              <div className="text-[16px] text-[#454444] ">
                ID Number: {regNo}{" "}
              </div>
            </div>
          </div>

          <h3 className="text-[#652666] text-center my-6 ">
            Student Information
          </h3>

          {/* email */}
          <div className="grid grid-cols-5 gap-8 w-full justify-between ">
            <div className="col-span-2 text-right ml-5 ">
              <ProfileElement name="Email" />
              <ProfileElement name="Course" />
              <ProfileElement name="Year of Completion" />
              {/* <ProfileElement name="Course Head" /> */}
            </div>
            <div className="col-span-3 ml-5">
              <input
                className="mt-5 text-center"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                readOnly={!showEdit}
                required
                pattern="^([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))"
                title="Please enter a valid email address"
                onKeyUp={() => setError(" ")}
              />

              <input
                className="mt-5 text-center"
                type="text"
                name="course"
                placeholder="Course"
                value={course}
                readOnly={true}
                required
              />

              <input
                className="mt-5 text-center"
                type="text"
                name="course"
                placeholder="Course"
                value={`2024`}
                readOnly={true}
                required
              />

              {/* <input
                className="mt-5 text-center"
                type="text"
                name="head"
                placeholder="Head"
                value={`Gedward Nicholson`}
                readOnly={true}
                required
              /> */}
            </div>
          </div>

          {showEdit ? (
            <>
              {/*Edit Panel*/}

              <div className="profilePage__formInputGroup">
                <span>
                  <BiLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onKeyUp={() => setError(" ")}
                />
              </div>

              <div className="profilePage__formInputGroup">
                <span>
                  <BiLock />
                </span>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  onKeyUp={() => {
                    if (confirmPassword !== password) {
                      setError("*passwords dont match");
                    } else {
                      setError(" ");
                    }
                  }}
                />
                <p id="passwordError">{error}</p>
              </div>

              <button
                type="submit"
                className="profilePage__formInputButton"
                onClick={updateUserInDatabase}
              >
                Update
              </button>
            </>
          ) : (
            ""
          )}

          <br />

          <h5 className="text-[16px] font-[400] text-[#652666] text-center  ">
            To change any information, please contact your course head at the
            college.
          </h5>
        </form>
      </div>
      <div className="flex flex-col items-center ">
        <button className="bg-[#009661] text-center w-[341px] min-h-[26px] text-white my-5 ">
          HCFE Student Handbook
        </button>

        <button className="bg-[#E1007A] text-center w-[341px] min-h-[26px] text-white my-5 ">
          App Help
        </button>

        <button className="bg-[#0074BD] text-center w-[341px] min-h-[26px] text-white my-5 ">
          Terms & Conditions
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

const ProfileElement = ({ name }) => {
  return (
    <div className="bg-[#FFFCFC] w-[143px]  rounded-[6px] my-5  ">
      <h5 className="font-[400] text-[16px] text-[#454444] text-center ">
        {name}
      </h5>
    </div>
  );
};

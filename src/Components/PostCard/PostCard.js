import React, { useEffect, useState } from "react";
import "./PostCard.css";
import { BsPersonCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
// firebase imports
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  writeBatch,
  getDoc,
  Query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { BiComment, BiDownvote, BiEdit, BiTime, BiUpvote } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { editPostReducer } from "../../features/editPostSlice";

function PostCard({
  userId,
  postId,
  postedBy,
  username,
  date,
  description,
  image,
  allowDelete,
  postedByPic
}) {
    const [comments, setComments]= useState([])
  // show delete button
  const dispatch = useDispatch();
  const [showDel, setShowDel] = useState(false);
  const navigate = useNavigate();
  function showDelBtn() {
    if (showDel) {
      setShowDel(false);
    } else {
      setShowDel(true);
    }
  }

  const [postDeleted, setPostDeleted] = useState(false);
  async function deletePost() {
    try {
      setPostDeleted(true); // hide post

      // delete image if any
      const storage = getStorage();
      const querySnapshot2 = await getDoc(doc(db, "posts", postId));
      if (querySnapshot2.data().image !== "") {
        await deleteObject(ref(storage, querySnapshot2.data().image));
      }
      //delete post
      await deleteDoc(doc(db, "posts", postId));
      // delete post votes
      const batch = writeBatch(db);
      const d = query(collection(db, "votes"), where("post_id", "==", postId));
      const querySnapshot1 = await getDocs(d);
      if (querySnapshot1.docs.length > 0) {
        querySnapshot1.forEach(function (doc) {
          batch.delete(doc.ref);
        });
        await batch.commit();
      }
    } catch (error) {
      console.log(error.code);
    }
  }

  const editPost = () => {
    // dispatch(editPostReducer(post))
    navigate(`/add-post/${postId}`);
  };

  const navigateToPost=()=>{
    navigate(`/post/${postId}`)
  }
  const getComments = async (  callBackFunction) => {

    const q = query(collection(db, "posts", postId, "comments"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
         
      const commentsDB = [];
      querySnapshot.forEach((doc) => {
           commentsDB.push({id: doc.id, data:doc.data()});
      });
      console.log("Current commentsin post: ", commentsDB.join(", "));
      setComments(commentsDB)
    });
    

}
useEffect(()=>{
    getComments() 
},[])
  return (
    <div className="postcard">
      {postDeleted === false ? (
        <>
          <div className="postcard__header mt-3 ">
            <div className="flex items-center ">
                {
                   postedByPic?
                    <img src={postedByPic} className='w-12 object-contain' alt="" />
                    :<h5 className=" text-[#652666] ">
                    <BsPersonCircle className="w-12" />
                  </h5>
    
                }
              
              <span className="ml-2">
                <h4 className="font-bold text-black ">{username}</h4>
                {/* <small>{date}</small> */}
              </span>
            </div>
            {/* <h5 className="flex justify-end w-full ">
              <small className="text-black text-[0.9rem] ">{date}</small>
            </h5> */}

            {/* shows delete option for personal posts */}
            {postedBy === userId && (
              <h6>
                <BiEdit onClick={showDelBtn} />

                <button
                  className={
                    showDel === true ? "postcard__headerDelBtnShow" : ""
                  }
                  onClick={deletePost}
                >
                  delete
                </button>

                <button
                  className={
                    showDel === true ? "postcard__headerDelBtnShow" : ""
                  }
                  onClick={editPost}
                >
                  Edit
                </button>
              </h6>
            )}
          </div>

          <p onClick={navigateToPost}  className=" font-bold text-center text-black mt-5  cursor-pointer ">
            {description}
          </p>

          {/* Shows image only if provided */}
          {image !== "" ? (
            <>
              <div onClick={navigateToPost} className="postcard__image cursor-pointer">
                <img src={image} alt="" />
              </div>
            </>
          ) : (
            ""
          )}
           <div onClick={navigateToPost} className="postcard__voteContainer cursor-pointer ">
                        {/* down vote */}
                        <div
                            className={
                                `postcard__vote postcard__vote--downvote 
                        ${  "postcard__voted--down  "}`
                            }
                            onClick={() => {   }}
                        >
                            <BiComment className="mr-1" /><span> {comments?.length} Comments</span>
                        </div>

                        {/* up vote */}
                        <div
                            className={
                                `postcard__vote postcard__vote--upvote 
                        ${ "postcard__voted--up"}`
                            }
                            onClick={() => {   }}
                        >
                            <BiTime className="mr-2" /><span> <h5 className="flex justify-end w-full ">
              <small className="text-black text-[0.9rem] ">{date}</small>
            </h5></span>
                        </div>
                    </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default PostCard;

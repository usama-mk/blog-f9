import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Ribbon from '../../Components/Ribbon/Ribbon';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebaseConfig';

function PostDetails() {

    const user = useSelector(selectUser);
  const userName = user.user.name;
  const userId = user.user.uid;
//  console.log(user)
  let { postId } = useParams();
  const navigate = useNavigate(); 
  const [description, setDescription] = useState("");
  const [postUsername, setPostUsername] = useState("");
  const [imageFile, setimageFile] = useState(null);
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [postedByPic, setPostedByPic] = useState([]);
  
  

    const addComment= async ()=>{

        try {
            await addDoc(collection(db, 'posts', postId, 'comments' ),
              {
                posted_by: userId,
                username: userName,
                description: description,
                profilePic: '',
                date: Timestamp.now(),
                comment: comment,
                postedByPic: user.user.profilePic,
              })
            // navigate("/home")
            setComment('')
          } catch (err) {
            alert(err)
          }
        // navigate("/home");
        
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

        const getPost= async ()=>{
         const post= await getDoc(doc(db, "posts", postId));
         setDescription(post.data().description)
         setimageFile(post.data().image)
         setPostUsername(post.data().username)
         setPostedByPic(post.data().postedByPic)
        //  setComments(post.data().comments)
       }
       if(postId){
         getPost()
         getComments()
       }
     },[])
  return (
   
        <div class="bg-white overflow-hidden h-screen shadow-none">
            <Navbar/>
            <Ribbon/>
    <div class="md:grid grid-cols-3 min-w-full mt-5 ">

        <div class="col-span-2 w-full flex justify-center ">
            <img class="w-96  object-contain "
                src={imageFile?imageFile:""}
                alt="Description"/>
        </div>

        <div class="col-span-1 relative pl-4">
            <header class="border-b border-grey-400">
                <a href="#" class="block cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                    <img src={postedByPic} class="h-9 w-9 rounded-full object-cover"
                    alt="user" />
                    <p class="block ml-2 font-bold">{postUsername}</p> <br />
                    
                </a>
                <div>
                    <p class="block ml-2 font-bold">{description}</p>
                    </div>
            </header>
            

            <div className='max-h-[250px] overflow-auto' >

            {
                comments?.map(comment =>
                    <div key={comment.id} class="pt-1  ">
                    <div class="text-sm mb-2 flex flex-start items-center">
                        <div>
                            <a href="#" class="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                <img class="h-8 w-8 rounded-full object-cover"
                                src={comment.data.postedByPic}
                                alt="user" />
                            </a>
                        </div>
                        <p class="font-bold ml-2 flex justify-between w-full">
                            <div className='w-full flex items-center' >
                            <a class="cursor-pointer">{comment.data.username} :</a>
                            <span class="text-gray-700 max-w-[80%] overflow-x-hidden overflow-y-auto break-words font-medium ml-1"> {comment.data.comment}
                           
                            </span>
                            </div>

                            <div>
                                {comment.data.date?.toDate().toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </p>
                    </div>
                </div>
                    )
               }
                
                 
            </div>

            <div class=" pl-4 ">
                <div class="pt-4">
                    <div class="mb-2">
                        <div class="flex items-center">
                            {/* <span class="mr-3 inline-flex items-center cursor-pointer">
                                <svg class="fill-heart text-gray-700 inline-block h-7 w-7 heart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </span> */}
                            <span class="mr-3 inline-flex items-center cursor-pointer">
                                <svg class="text-gray-700 inline-block h-7 w-7 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </span>
                            
                        </div>
                        <span class="text-gray-600 text-sm font-bold">{comments.length} Comments</span>
                    </div>
                    
                </div>

                <div class="pt-4 pb-1 pr-3">
                    <div class="flex items-start">
                        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} class="w-full resize-none outline-none appearance-none bg-gray-400 rounded-md text-center mr-3 h-[36px]" aria-label="Comment here" placeholder="Comment here.."  autocomplete="off" autocorrect="off"></textarea>
                        <button class="mb-2 focus:outline-none border-none bg-transparent text-blue-600" onClick={addComment} >Publish</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    
  )
}

export default PostDetails
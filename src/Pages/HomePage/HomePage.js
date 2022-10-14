import React, { useEffect, useState } from 'react'
import "./HomePage.css"
// import components
import Navbar from "../../Components/Navbar/Navbar"
import PostCard from '../../Components/PostCard/PostCard'
// firebase imports
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Ribbon from '../../Components/Ribbon/Ribbon';
import { stringify } from 'postcss';

function HomePage() {

    const { user } = useSelector(selectUser);
 
    const userId = user?.uid;
    console.log(JSON.stringify(user))


    const [allPosts, setAllPosts] = useState([]);
    useEffect(() => {
        async function getAllPostsFromDatabase() {
            const q = query(
                collection(db, "posts"),
                orderBy("date")
            )
            const querySnapshot = await getDocs(q);

            setAllPosts(querySnapshot.docs.reverse().map
                (
                    (doc) => (
                        {
                            doc_id: doc.id,
                            doc_data: doc.data(),
                        }
                    )
                )
            );
        }

        return () => getAllPostsFromDatabase();
    }, [userId])




    return (
        <div className='homepage'>
            <Navbar activePage={"home"} />
            <Ribbon/>
            <div className="homepage__postSection">
                {
                    allPosts.map(
                        ({ doc_id, doc_data }) => (
                            < PostCard
                                key={doc_id}
                                postId={doc_id}
                                postedBy={doc_data.posted_by}
                                userId={userId}
                                username={doc_data.username}
                                date={
                                    doc_data.date.toDate().toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
                                }
                                description={doc_data.description}
                                image={doc_data.image}
                                postedByPic={doc_data.postedByPic}
                                
                            />
                        )
                    )
                }
            </div>

        </div >
    )
}

export default HomePage
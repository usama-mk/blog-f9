import React, { useEffect, useState } from "react";
import DiscountProduct from "../../Components/DiscountProduct/DiscountProduct";
import Navbar from "../../Components/Navbar/Navbar";
import Ribbon from "../../Components/Ribbon/Ribbon";
import discountOne from "../../Assets/discountOne.png";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Discounts() {
  const { user } = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  const [discounts, setAllDiscounts] = useState([]);
  useEffect(() => {
    async function getRelevantPosts() {
      const querySnapshot1 = await getDocs(
        query(collection(db, "discounts"), orderBy("date"))
      );

      querySnapshot1.docs.reverse().forEach((doc) => {
        console.log(doc.data().title);
        setAllDiscounts((discounts) => [
          ...discounts,
          {
            doc_id: doc.id,
            doc_data: doc.data(),
          },
        ]);
      });
    }

    return () => getRelevantPosts();
  }, [userId]);

  return (
    <div>
      <Navbar />
      <Ribbon />
      <div className="mt-5 flex flex-wrap ">
        {discounts?.map(({ doc_id, doc_data }) => (
          <DiscountProduct
            key={doc_id}
            img={doc_data.image}
            title={doc_data.title}
            discountCode={doc_data.discountCode}
          />
        ))}
      </div>
      <h5 className="text-[#652666] text-[16px] text-center mt-14 font-[400] ">
        Don’t see your favourite retailer? Get in touch with the college to
        request one!
      </h5>
    </div>
  );
}

export default Discounts;

import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Navbar from "../../Components/Navbar/Navbar";
import Ribbon from "../../Components/Ribbon/Ribbon";
import "./Calender.css";
import MyCalendar from "./MyCalendar";

function Calendar() {
  const [value, onChange] = useState(new Date());
  return (
    <div className="pb-14">
      <Navbar activePage={"home"} />
      <Ribbon />

      <div className="flex justify-center items-center mt-5 ">
        <MyCalendar />
      </div>

      <h5 className="text-center font-bold my-5 text-[#652666] ">
        Classes Today
      </h5>
      <div className="flex items-center px-5 ">
        <div className="w-[28px] h-[29px] bg-[#D9D9D9] rounded-full my-3 "></div>
        <h6 className="text-[16px] text-[#652666] ml-3">
          Computer Science – 9:00am-10:00am
        </h6>
      </div>

      <div className="flex items-center px-5 ">
        <div className="w-[28px] h-[29px] bg-[#D9D9D9] rounded-full my-3 "></div>
        <h6 className="text-[16px] text-[#652666] ml-3">
          Computer Science – 1:00am-2:30pm
        </h6>
      </div>
    </div>
  );
}

export default Calendar;

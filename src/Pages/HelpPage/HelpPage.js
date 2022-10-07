import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Ribbon from "../../Components/Ribbon/Ribbon";
import { selectUser } from "../../features/userSlice";
import "./HelpPage.css";

const HelpPage = () => {
  const { user } = useSelector(selectUser);
  const userName = user.name;
  const userId = user.uid;

  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);
  const [q4, setQ4] = useState(null);
  const [q5, setQ5] = useState(null);
  const [q6, setQ6] = useState(null);

  const clearOthers = (current) => {
    switch (current) {
      case 1:
        setQ2(null);
        setQ3(null);
        setQ4(null);
        setQ5(null);
        setQ6(null);
        break;
      case 2:
        setQ3(null);
        setQ4(null);
        setQ5(null);
        setQ6(null);
        break;
      case 3:
        setQ4(null);
        setQ5(null);
        setQ6(null);
        break;
      case 4:
        setQ5(null);
        setQ6(null);
        break;
      case 5:
        setQ6(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="HelpPage pb-16 font-oswald ">
      <Navbar activePage={"help"} />
      <Ribbon />
      {/* Q1 */}
      <h4 className="mt-5">
        <h5 className="text-[20px] text-center font-oswald ">
          1. Do you have a concern?
        </h5>

        <div className="answer--group flex justify-around my-3   ">
          <button
            htmlFor="q1_y"
            className="w-[143px] h-[52px] bg-[#652666] text-white mr-4 "
            onClick={(e) => {
              clearOthers(1);
              setQ1("yes");
            }}
          >
            Yes
          </button>

          <button
            htmlFor="q1_y"
            className="w-[143px] h-[52px] bg-[#652666] text-white ml-4 "
            onClick={(e) => {
              setQ1("no");
            }}
          >
            No
          </button>
        </div>

        {q1 === "yes" ? (
          <div className="flex flex-col items-center ">
            <h5>What is your concern?</h5>
            <button className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 ">
              Travelling to college
            </button>

            <button className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 ">
              Unsure as to whether you can claim bursary (travel/lunch money)
            </button>

            <button className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 ">
              Family concerns
            </button>
          </div>
        ) : (
          ""
        )}
      </h4>

      <br />

      {/* Q2 */}
      {(q1 === "no") === true && (
        <>
          <div className="flex flex-col items-center ">
            <h5>What emotion have you felt today?</h5>
            <button
              className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 "
              onClick={() => setQ2("happy")}
            >
              Happy
            </button>

            <button
              className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 "
              onClick={() => setQ2("sad")}
            >
              Sad
            </button>

            <button
              className="w-[333px]  bg-[#652666] text-white mr-4 px-[5px] py-2 my-2 "
              onClick={() => setQ2("anxious")}
            >
              Anxious
            </button>
          </div>
          <h4>
            {q2 === "sad" || q2 === "anxious" ? (
              <div className="options">
                <h6 className="text-center">
                  Click on the link: <br />
                  <a href="https://togetherall.com/en-gb/" target={"blank"}>
                    togetherall
                  </a>
                </h6>
              </div>
            ) : (
              ""
            )}
          </h4>
        </>
      )}

      <br />

      {/* Q3 */}
      {(q1 === "no" && q2 === "happy") === true && (
        <div className="text-center">
          <h4>
            3. Would you like to talk privately with a WARM about how you’re
            feeling or something on your mind?
            <div className="answer--group flex justify-center my-3   ">
              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white mr-4 "
                onClick={(e) => {
                  setQ3("yes");
                }}
              >
                Yes
              </button>

              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white ml-4 "
                onClick={(e) => {
                  setQ3("no");
                }}
              >
                No
              </button>
            </div>
            {q3 === "yes" ? (
              <div className="options text-center ">
                <h6>Email: needtotalk@hartlepoolfe.ac.uk</h6>
              </div>
            ) : (
              ""
            )}
          </h4>
        </div>
      )}

      <br />

      {/* Q4 */}
      {(q1 === "no" && q2 === "happy" && q3 === "no") === true && (
        <div className="text-center">
          <h4>
            4. Do you ever feel that something or a situation just does not feel
            right, and you want to report it, however, too frightened to?
            <div className="answer--group flex justify-center my-3   ">
              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white mr-4 "
                onClick={(e) => {
                  clearOthers(4);
                  setQ4("yes");
                }}
              >
                Yes
              </button>

              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white ml-4 "
                onClick={(e) => {
                  setQ4("no");
                }}
              >
                No
              </button>
            </div>
            {q4 === "yes" ? (
              <div className="options flex justify-center  ">
                <h6 className="text-cenetr">
                  Use the below link to Report anonymously: <br />
                  <a href="hartlepoolfe.ac.uk" target={"blank"}>
                    Report + Support - Hartlepool College of Further Education
                  </a>
                </h6>
              </div>
            ) : (
              ""
            )}
          </h4>
        </div>
      )}

      <br />

      {/* Q5 */}
      {(q1 === "no" && q2 === "happy" && q3 === "no" && q4 === "no") ===
        true && (
        <div className="text-center">
          <h4>
            5. Do you know your way around College and know where all your
            classrooms, welfare and student support are?
            <div className="answer--group flex justify-center my-3   ">
              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white mr-4 "
                onClick={(e) => {
                  setQ5("yes");
                }}
              >
                Yes
              </button>

              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white ml-4 "
                onClick={(e) => {
                  clearOthers(5);
                  setQ5("no");
                }}
              >
                No
              </button>
            </div>
            {q5 === "no" ? (
              <div className="options">
                <h6>
                  Click on the link: <br />
                  <Link to="/map">A map of the college</Link>
                </h6>
              </div>
            ) : (
              ""
            )}
          </h4>
        </div>
      )}

      <br />

      {/* Q6 */}
      {(q1 === "no" &&
        q2 === "happy" &&
        q3 === "no" &&
        q4 === "no" &&
        q5 === "yes") === true && (
        <div className="text-center">
          <h4>
            6. Do you feel in Crisis at any time?
            <div className="answer--group flex justify-center my-3   ">
              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white mr-4 "
                onClick={(e) => {
                  setQ6("yes");
                }}
              >
                Yes
              </button>

              <button
                htmlFor="q1_y"
                className="w-[143px] h-[52px] bg-[#652666] text-white ml-4 "
                onClick={(e) => {
                  setQ6("no");
                }}
              >
                No
              </button>
            </div>
            {q6 === "yes" ? (
              <div className="options text-center">
                <h6>Contact crisis team: 0300 0132000</h6>
                <h6>
                  Do you feel low in mood – click on the below link Now:
                  <a href="https://togetherall.com/en-gb/" target={"blank"}>
                    togetherall
                  </a>
                </h6>
              </div>
            ) : (
              ""
            )}
            {q6 === "no" ? (
              <div className="options text-center ">
                <h6>Thank you for completing the questions</h6>
              </div>
            ) : (
              ""
            )}
          </h4>
        </div>
      )}
    </div>
  );
};

export default HelpPage;

import { Button, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useState, useEffect } from "react";
import BasicButton from "../BasicButton";
import { useSelector } from "react-redux";
import RankComponent from "./RankComponent";
import {
  getContestQuestions,
  submitContestAnswer,
  getContestRanking,
  getQuestionIndex,
} from "../../api/contest";
import { useNavigate } from "react-router";
import useInterval from "./useInterval";
import "animate.css";
export default function ContestDetail() {
  const contestId = useSelector((state) => state.ContestInfo.contestId);
  const contestName = useSelector((state) => state.ContestInfo.contestName);
  const contestEndTime = useSelector(
    (state) => state.ContestInfo.contestEndTime
  );
  const accountName = useSelector(
    (state) => state.AccountInfo.accountInfo.accountName
  );
  const navigate = useNavigate();
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [ranking, setRanking] = useState([]);
  const [myRank, setMyRank] = useState({});
  const [index, setIndex] = useState(0);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [contestQuestionList, setContestQuestionList] = useState([
    {
      answerRes: { answers: [], rightAnswer: 0 },
      labels: [],
      questionExp: "",
      questionId: 1,
      questionTitle: "",
    },
  ]);
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    console.log(newArr);
    // 사용자 로그 찍는거
    setSelectedAnswer(idx);
  };

  const submitAnswer = () => {
    console.log(selectedAnswer);
    console.log(contestName + "-----");
    const contestAnswerReq = {
      contestId: contestId,
      isAnswer: rightAnswer === selectedAnswer ? true : false,
      problemIdx: index,
      endTime: contestEndTime,
    };
    console.log("jfashdfuaselfajhef" + contestAnswerReq.problemIdx);

    if (index + 1 < contestQuestionList.length) {
      setIndex(index + 1);

      submitContestAnswer(
        contestAnswerReq,
        Token,
        (res) => {
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      // 결과 페이지 또는 끝내기

      if (window.confirm("마지막 문제입니다. 대회를 종료하시겠습니까?")) {
        alert("수고하셨습니다.");
        submitContestAnswer(
          contestAnswerReq,
          Token,
          (res) => {
            console.log(res.data);
            navigate("/mainpage");
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }

    const newArr = Array(answerList.length).fill(false);
    setIsCategorySelect(newArr);
  };

  useEffect(() => {
    getContestQuestions(
      contestId,
      Token,
      (res) => {
        console.log(res.data);
        setContestQuestionList(res.data);
        setQuestionTitle(res.data[index].questionTitle);
        setAnswerList(res.data[index].answerRes.answers);
        setRightAnswer(res.data[index].answerRes.rightAnswer);
        const listSize = res.data.length;

        getQuestionIndex(
          contestId,
          Token,
          (res) => {
            console.log("getQuestionIndex", res.data + 1);
            console.log(listSize + "sdfasdf");
            if (listSize > res.data + 1) {
              setIndex(res.data + 1);
            } else {
              navigate("/mainpage");
              alert("대회 참여가 종료되었습니다.");
            }
          },
          (err) => {
            console.log(err);
          }
        );
        getContestRanking(
          contestId,
          Token,
          (res) => {
            console.log("getContestRanking res.data: ", res.data);
            let arr = [...res.data.highRanking];
            arr.push({ accountNickname: "경준", accountScore: 14.8734 });
            arr.push(res.data.highRanking[0]);
            arr.push(res.data.highRanking[0]);
            arr.push(res.data.highRanking[0]);
            arr.push(res.data.highRanking[0]);
            arr.push(res.data.highRanking[0]);

            setMyRank(res.data.contestMyRankingRes);

            setRanking(arr);
            console.log(arr);
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useInterval(() => {
    getContestRanking(
      contestId,
      Token,
      (res) => {
        console.log("getContestRanking res.data: ", res.data);
        setMyRank(res.data.contestMyRankingRes);

        setRanking(res.data.highRanking);
      },
      (err) => {
        console.log(err);
      }
    );
  }, 5000);

  useEffect(() => {
    setQuestionTitle(contestQuestionList[index].questionTitle);
    setAnswerList(contestQuestionList[index].answerRes.answers);
    setRightAnswer(contestQuestionList[index].answerRes.rightAnswer);
  }, [index]);

  return (
    <div style={{ display: "block", width: "99%" }}>
      <div
        style={{
          float: "left",
          width: "78%",
          borderRight: "1px solid lightgray",
        }}
      >
        <h1
          style={{
            wordBreak: "break-all",
            marginBottom: "0px",
          }}
        >
          <img
            alt=""
            src="img/trophy.png"
            style={{ width: "5%", marginRight: "3vh" }}
          ></img>
          {contestName}
          <img
            alt=""
            src="img/trophy.png"
            style={{ width: "5%", marginLeft: "3vh" }}
          ></img>
        </h1>
        {answerList != null && answerList.length > 0 ? (
          <div>
            {" "}
            <Box
              sx={{
                width: "90%",
                margin: "auto",
                display: "block",
                whiteSpace: "pre-line",
              }}
            >
              <br />
              <br></br>
              <h1
                style={{
                  wordBreak: "break-all",
                  width: "100%",
                  marginTop: "0px",
                }}
              >
                Q. {questionTitle}
              </h1>
              <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
                {answerList.map((elm, index) => {
                  return (
                    <BasicButton
                      key={index}
                      isSelected={isCategorySelect[index]}
                      handleClick={handleClick}
                      elementIndex={index}
                      content={elm}
                    />
                  );
                })}
              </Grid>
            </Box>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: "#64b5f6" }}
              onClick={submitAnswer}
            >
              정답 제출
            </Button>
          </div>
        ) : null}
      </div>
      <div
        style={{
          float: "right",
          width: "21%",
          height: "85vh",
        }}
      >
        <div>
          {" "}
          <img
            alt=""
            src="img/ranking.png"
            style={{ width: "25%", marginTop: "2vh" }}
          ></img>
          <h3>
            순위&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;닉네임&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;점수
          </h3>
          <Divider></Divider>
          <Divider></Divider>
          <Divider></Divider>
          {/* <img alt="" src="img/first.png" style={{ width: "25%" }}></img>
          lapaho8645 */}
          {ranking.map((rank, i) => (
            // <h1 className="animate__animated animate__flipInX">{user.rank}</h1>
            <RankComponent
              key={Math.random()}
              nickname={rank.accountNickname}
              score={rank.accountScore}
              myrank={myRank.myRank}
              index={i}
            ></RankComponent>
          ))}
          {myRank.isExistMeInLeaderboard === true ||
          ranking.length <= 0 ? null : (
            <div>
              ...{" "}
              <RankComponent
                key={Math.random()}
                nickname={accountName}
                score={myRank.myScore}
                myrank={myRank.myRank}
                index={myRank.myRank}
              ></RankComponent>
              ...
            </div>
          )}
          {/* <RankComponent></RankComponent>
          <RankComponent></RankComponent> */}
        </div>
      </div>
    </div>
  );
}

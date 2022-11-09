import { Button, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { useState, useEffect } from "react";
import BasicButton from "../BasicButton";
import { useSelector } from "react-redux";
import RankComponent from "./RankComponent";
export default function ContestDetail() {
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [contestTitle, setContestTitle] = useState("");
  const [index, setIndex] = useState(0);
  const [questionTitle, setQuestionTitle] = useState("");
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [contestQuestionList, setContestQuestionList] = useState([
    {
      no: 0,
      questionTitle: "1번문제",
      questionExp: "1번문제 해설",
      answerList: [
        "1번보기1번보기1번보기1번보기1번보기",
        "2번보기2번보기2번보기2번보기2번보기2번보기",
        "3번보기3번보기3번보기3번보기3번보기3번보기3번보기",
        "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기",
      ],
      rightAnswer: 2,
    },
    {
      no: 1,
      questionTitle: "2번문제",
      questionExp: "2번문제 해설",
      answerList: [
        "1번보기1번보기1번보기1번보기1번보기22222",
        "2번보기2번보기2번보기2번보기2번보기2번보기22222",
        "3번보기3번보기3번보기3번보기3번보기3번보기3번보기22222222",
        "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기222222",
      ],
      rightAnswer: 1,
    },
    {
      no: 2,
      questionTitle: "3번문제",
      questionExp: "3번문제 해설",
      answerList: [
        "1번보기1번보기1번보기1번보기1번보기22222",
        "2번보기",
        "3번보기",
        "4번 보기",
      ],
      rightAnswer: 0,
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
    setIndex(index + 1);
    const newArr = Array(answerList.length).fill(false);
    setIsCategorySelect(newArr);
  };

  useEffect(() => {
    setContestQuestionList([
      {
        no: 0,
        questionTitle: "1번문제",
        questionExp: "1번문제 해설",
        answerList: [
          "1번보기1번보기1번보기1번보기1번보기",
          "2번보기2번보기2번보기2번보기2번보기2번보기",
          "3번보기3번보기3번보기3번보기3번보기3번보기3번보기",
          "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기",
        ],
        rightAnswer: 2,
      },
      {
        no: 1,
        questionTitle: "2번문제",
        questionExp: "2번문제 해설",
        answerList: [
          "1번보기1번보기1번보기1번보기1번보기22222",
          "2번보기2번보기2번보기2번보기2번보기2번보기22222",
          "3번보기3번보기3번보기3번보기3번보기3번보기3번보기22222222",
          "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기222222",
        ],
        rightAnswer: 1,
      },
      {
        no: 2,
        questionTitle: "3번문제",
        questionExp: "3번문제 해설",
        answerList: [
          "1번보기1번보기1번보기1번보기1번보기22222",
          "2번보기",
          "3번보기",
          "4번 보기",
        ],
        rightAnswer: 0,
      },
    ]);
    setContestTitle("현중배 제 1회 싸피컵");
    console.log();
    setQuestionTitle(contestQuestionList[index].questionTitle);
    setAnswerList(contestQuestionList[index].answerList);
    setRightAnswer(contestQuestionList[index].rightAnswer);
    // getProfile();
  }, []);

  useEffect(() => {
    setQuestionTitle(contestQuestionList[index].questionTitle);
    setAnswerList(contestQuestionList[index].answerList);
    setRightAnswer(contestQuestionList[index].rightAnswer);
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
          {contestTitle}
          <img
            alt=""
            src="img/trophy.png"
            style={{ width: "5%", marginLeft: "3vh" }}
          ></img>
        </h1>
        {answerList != null && answerList.length > 0 ? (
          <div>
            {" "}
            <Box sx={{ width: "90%", margin: "auto", display: "block" }}>
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
                {/* <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        1번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        2번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        3번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        4번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0][0]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid> */}

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
          <h1></h1>
          <Divider></Divider>
          <Divider></Divider>
          <Divider></Divider>
          {/* <img alt="" src="img/first.png" style={{ width: "25%" }}></img>
          lapaho8645 */}
          <RankComponent></RankComponent>
          <RankComponent></RankComponent>
        </div>
      </div>
    </div>
  );
}

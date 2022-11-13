import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { getWorkbook } from "../..//api/workbook";
import { getQuestion } from "../../api/question";
import Swal from "sweetalert2";

import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import BasicButton from "../BasicButton";
import { SET_QUESTION_INDEX } from "../../redux/QuestionInfo";

export default function WorkbookDetail() {
  const Swal = require("sweetalert2");
  const dispatch = useDispatch();
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [questionId, setQuestionId] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const questionIndex = useSelector(
    (state) => state.QuestionInfo.questionIndex
  );
  const workbookId = useSelector((state) => state.WorkbookInfo.workbookIndex);
  const [questionList, setQuestionList] = useState([]);

  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [questionLog, setQuestionLog] = useState([
    { time: "2022-04-21", isRight: false, selected: 2 },
    { time: "2022-04-21", isRight: true, selected: 3 },
  ]);
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    console.log(newArr);

    console.log("answerRes", answerRes[1], questionExp);
    var data2 = [];
    for (var i = 0; i < questionLog.length; i++) {
      var isCorrect = "";
      if (questionLog[i].isRight) {
        isCorrect = "O";
      } else {
        isCorrect = "X";
      }
      data2.push(
        "<tr>",
        '<td align="center">' + questionLog[i].time + "</td>",

        '<td align="center">' + isCorrect + "</td>",
        '<td align="center">' + questionLog[i].selected + "</td>",
        "</tr>"
      );
    }
    if (answerRes[1] !== idx) {
      Swal.fire({
        title: "틀렸습니다.",
        icon: "error",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "해설 보기",
        denyButtonText: `풀이 내역보기`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(questionExp, "", "info");
        } else if (result.isDenied) {
          Swal.fire({
            html:
              `<table id="table" border=1>
            <thead>
                <tr>
                    <th>푼 날짜</th>
                    <th>정답 여부</th>
                    <th>선택한 답</th>
                    
                </tr>
            </thead>
            <tbody>
       ` +
              data2.join("") +
              `         
    </tbody>
    </table>`,
          });
        }
      });
    } else if (answerRes[1] === idx) {
      Swal.fire({
        title: "맞았습니다.",
        icon: "success",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "해설 보기",
        denyButtonText: `풀이 내역보기`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(questionExp, "", "info");
        } else if (result.isDenied) {
          Swal.fire({
            html:
              `<table id="table" border=1>
            <thead>
                <tr>
                    <th>푼 날짜</th>
                    <th>정답 여부</th>
                    <th>선택한 답</th>
                    
                </tr>
            </thead>
            <tbody>
       ` +
              data2.join("") +
              `         
    </tbody>
    </table>`,
          });
        }
      });
    }
    // 사용자 로그 찍는거
  };

  const handleQuestionIndex = (data) => {
    console.log(data);
    dispatch(SET_QUESTION_INDEX(data));
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      dispatch(SET_QUESTION_INDEX(questionIndex - 1));
    } else {
      dispatch(SET_QUESTION_INDEX(0));
    }
    console.log("prev move:", questionIndex);
  };

  const nextQuestion = () => {
    if (questionIndex < questionList.length - 1) {
      dispatch(SET_QUESTION_INDEX(questionIndex + 1));
    } else {
      dispatch(SET_QUESTION_INDEX(questionList.length - 1));
    }
    console.log("next move:", questionIndex);
  };

  useEffect(() => {
    console.log("workbookdeatil rendering.... workbookId:", workbookId);
    dispatch(SET_QUESTION_INDEX(0));
    getWorkbook(
      workbookId,
      Token,
      (res) => {
        console.log("res.data:", res.data);
        setQuestionList(res.data.questionIdList);
        setQuestionId(res.data.questionIdList[questionIndex]);
        console.log(questionId, "----------------------");
        getQuestion(
          questionId,
          Token,
          (res) => {
            console.log(res.data);
            setQuestionTitle(res.data.questionTitle);
            setQuestionExp(res.data.questionExp);
            setAnswerRes([
              res.data.answerRes.answers,
              res.data.answerRes.rightAnswer,
            ]);
            console.log(res.data.answerRes);
            console.log(answerRes[0]);
            setAnswerList(res.data.answerRes.answers);
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

  useEffect(() => {
    console.log("questionIndex changed...", questionIndex);
    console.log("questionInfo:", questionList);
    if (questionList.length !== 0) {
      getQuestion(
        questionList[questionIndex],
        Token,
        (res) => {
          console.log(res.data);
          setQuestionTitle(res.data.questionTitle);
          setQuestionExp(res.data.questionExp);
          setAnswerRes([
            res.data.answerRes.answers,
            res.data.answerRes.rightAnswer,
          ]);
          setAnswerList(res.data.answerRes.answers);
        },
        (err) => {
          console.log(err);
        }
      );
      const newArr = Array(answerList.length).fill(false);
      setIsCategorySelect(newArr);
      console.log(newArr);
    }
  }, [questionIndex]);

  return (
    <div style={{ margin: "0vh 4vh" }}>
      <div style={{ display: "flex" }}>
        <div
          style={{
            float: "left",
            width: "25%",
          }}
        >
          <SideBar
            handleQuestionIndex={handleQuestionIndex}
            questionList={questionList}
          ></SideBar>
        </div>

        {/* 버튼을 누르면 전에 있는 문제를 불러와야함 */}
        <div style={{ margin: "auto" }} onClick={prevQuestion}>
          <Button size="large" style={{ backgroundColor: "black" }}>
            <ChevronLeftOutlinedIcon fontSize="large"></ChevronLeftOutlinedIcon>
          </Button>
        </div>
        <div
          style={{
            float: "right",
            width: "75%",
          }}
        >
          <span>
            {" "}
            {answerRes[0] != null && answerRes[0].length > 0 ? (
              <Box sx={{ width: "100%" }}>
                <h1 style={{ wordBreak: "break-all" }}>Q. {questionTitle}</h1>
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
            ) : null}
          </span>
        </div>
        <div style={{ margin: "auto" }} onClick={nextQuestion}>
          <Button style={{ backgroundColor: "black" }}>
            <ChevronRightOutlinedIcon fontSize="large"></ChevronRightOutlinedIcon>
          </Button>
        </div>
      </div>
    </div>
  );
}

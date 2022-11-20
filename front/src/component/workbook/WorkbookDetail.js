import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { getWorkbook } from "../..//api/workbook";
import { getQuestion, registerLogs, getLogs } from "../../api/question";

import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
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
  const workbookTitle = useSelector(
    (state) => state.WorkbookInfo.workbookTitle
  );
  const [questionList, setQuestionList] = useState([]);

  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [questionLog, setQuestionLog] = useState([
    { time: "", isRight: false, selected: 1 },
  ]);
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    const answerRequestReq = {
      questionId: questionId,
      checkNumber: idx,
      isAnswer: answerRes[1] !== idx ? false : true,
    };

    registerLogs(
      answerRequestReq,
      Token,
      (res) => {},
      (err) => {
        console.log(err);
      }
    );

    if (answerRes[1] !== idx) {
      Swal.fire({
        title: "틀렸습니다.",
        icon: "error",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "해설 보기",
        denyButtonText: `풀이 내역보기`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(questionExp, "", "info");
        } else if (result.isDenied) {
          getLogs(
            questionId,
            Token,
            (res) => {
              setQuestionLog(res.data);
              var data2 = [];
              for (var i = res.data.length - 1; i >= 0; i--) {
                var isAnswer = "";
                if (res.data[i].isAnswer) {
                  isAnswer = "O";
                } else {
                  isAnswer = "X";
                }
                data2.push(
                  "<tr>",
                  '<td align="center">' +
                    res.data[i].timestamp.split("T")[0] +
                    " " +
                    res.data[i].timestamp.split("T")[1].split(".")[0] +
                    "</td>",

                  '<td align="center">' + isAnswer + "</td>",
                  '<td align="center">' +
                    (res.data[i].checkNumber + 1) +
                    "</td>",
                  "</tr>"
                );

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
            },
            (err) => {
              console.log(err);
            }
          );
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
          getLogs(
            questionId,
            Token,
            (res) => {
              setQuestionLog(res.data);
              var data2 = [];
              for (var i = res.data.length - 1; i >= 0; i--) {
                var isAnswer = "";
                if (res.data[i].isAnswer) {
                  isAnswer = "O";
                } else {
                  isAnswer = "X";
                }
                data2.push(
                  "<tr>",
                  '<td align="center">' +
                    res.data[i].timestamp.split("T")[0] +
                    " " +
                    res.data[i].timestamp.split("T")[1].split(".")[0] +
                    "</td>",

                  '<td align="center">' + isAnswer + "</td>",
                  '<td align="center">' +
                    (res.data[i].checkNumber + 1) +
                    "</td>",
                  "</tr>"
                );

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
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    }
    // 사용자 로그 찍는거
  };

  const handleQuestionIndex = (data) => {
    dispatch(SET_QUESTION_INDEX(data));
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      dispatch(SET_QUESTION_INDEX(questionIndex - 1));
    } else {
      dispatch(SET_QUESTION_INDEX(0));
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questionList.length - 1) {
      dispatch(SET_QUESTION_INDEX(questionIndex + 1));
    } else {
      dispatch(SET_QUESTION_INDEX(questionList.length - 1));
    }
  };

  useEffect(() => {
    dispatch(SET_QUESTION_INDEX(0));
    getWorkbook(
      workbookId,
      Token,
      (res) => {
        setQuestionList(res.data.questionIdList);
        setQuestionId(res.data.questionIdList[0]);
        getQuestion(
          res.data.questionIdList[0],
          Token,
          (res) => {
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
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    setQuestionId(questionList[questionIndex]);
    if (questionList.length !== 0) {
      getQuestion(
        questionList[questionIndex],
        Token,
        (res) => {
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
    }
  }, [questionIndex]);

  const Clicklistitem = (index) => {
    dispatch(SET_QUESTION_INDEX(index));
  };
  return (
    <div style={{ margin: "0vh 4vh" }}>
      <h1
        style={{
          wordBreak: "break-all",
          marginBottom: "0px",
        }}
      >
        <img
          alt=""
          src="img/book.png"
          style={{ width: "5%", marginRight: "3vh" }}
        ></img>
        {workbookTitle}
        <img
          alt=""
          src="img/book.png"
          style={{ width: "5%", marginLeft: "3vh" }}
        ></img>
      </h1>

      <div style={{ display: "flex" }}>
        <div
          style={{
            float: "left",
            width: "25%",
          }}
        >
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              overflow: "auto",
              maxHeight: 500,
            }}
          >
            {questionList.map((data, index) => {
              const current = index === questionIndex;
              return (
                <ListItem
                  key={data}
                  // component="div"
                  disablePadding
                  style={
                    current
                      ? {
                          borderBottom: "solid #9DCFFF 1px",
                          width: "90%",
                          margin: "auto",
                          backgroundColor: "#9DCFFF",
                        }
                      : {
                          borderBottom: "solid #9DCFFF 1px",
                          width: "90%",
                          margin: "auto",
                          backgroundColor: "white",
                        }
                  }
                >
                  <ListItemButton onClick={() => Clicklistitem(index)}>
                    <ListItemText primary={index + 1 + `번문제`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
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
              <Box sx={{ width: "100%", whiteSpace: "pre-line" }}>
                <h1 style={{ wordBreak: "break-all" }}>
                  Q{questionIndex + 1}. {questionTitle}
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

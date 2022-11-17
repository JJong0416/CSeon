import { getQuestion, registerLogs, getLogs } from "../../api/question";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import BasicButton from "../BasicButton";
import WestIcon from "@mui/icons-material/West";
import { useNavigate } from "react-router";
export default function QuestionsDetail() {
  const questionId = useSelector((state) => state.QuestionInfo.questionId);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);

  const [questionLog, setQuestionLog] = useState([
    { time: "", isRight: false, selected: 1 },
  ]);
  const navigate = useNavigate();
  const clickQuestionList = () => {
    //redux에 세팅 or props
    navigate("/questionslist");
  };
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    console.log(newArr);

    console.log("answerRes", answerRes[1], questionExp);

    var data2 = [];

    const answerRequestReq = {
      questionId: questionId,
      checkNumber: idx,
      isAnswer: answerRes[1] !== idx ? false : true,
    };

    registerLogs(
      answerRequestReq,
      Token,
      (res) => {
        console.log(res.data);
      },
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
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire(questionExp, "", "info");
        } else if (result.isDenied) {
          getLogs(
            questionId,
            Token,
            (res) => {
              console.log(res.data);
              setQuestionLog(res.data);
              var data2 = [];
              for (var i = res.data.length - 1; i >= 0; i--) {
                var isAnswer = "";
                if (res.data.isAnswer) {
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

                  "<td>" + isAnswer + "</td>",
                  "<td>" + (res.data[i].checkNumber + 1) + "</td>",
                  "</tr>"
                );

                Swal.fire({
                  html:
                    `<table>
                  <thead>
                      <tr>
                      <th
                    >푼 날짜</th>
                    <th
                    
                  >정답 여부</th>
                  <th
                
                >선택한 답</th>
                          
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
              console.log(res.data);
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
  useEffect(() => {
    console.log("getQuestion API start..");
    getQuestion(
      questionId,
      Token,
      (res) => {
        console.log("getQuestion res.data:", res.data);
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

    // getProfile();
  }, []);

  return (
    <div style={{ margin: "5vh" }}>
      {" "}
      {answerRes[0] != null && answerRes[0].length > 0 ? (
        <div>
          {" "}
          <Box sx={{ width: "100%", display: "block" }}>
            <Button
              size="large"
              variant="contained"
              style={{
                backgroundColor: "#64b5f6",
                float: "left",
              }}
              onClick={clickQuestionList}
            >
              <WestIcon size="large"></WestIcon>
            </Button>
            <br />
            <br></br>
            <h1 style={{ wordBreak: "break-all", width: "100%" }}>
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
        </div>
      ) : null}
    </div>
  );
}

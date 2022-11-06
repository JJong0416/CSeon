import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { getWorkbookQuestion } from "../..//api/workbook";
import { getQuestion } from "../../api/question";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  getListItemAvatarUtilityClass,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";
import BasicButton from "./BasicButton";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function WorkbookDetail() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [answerList, setAnswerList] = useState(["", "", "", ""]);

  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setSelectedAnswer(idx);
    console.log(newArr);
    handleClickOpen();
  };

  const handleQuestionIndex = (data) => {
    console.log(data);
    setQuestionIndex(data);
  };
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const [questionId, setQuestionId] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [workbookId, setWorkbookId] = useState(1);
  const [questionList, setQuestionList] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);

  const prevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else {
      setQuestionIndex(0);
    }
    console.log("prev" + questionIndex);
  };

  const nextQuestion = () => {
    if (questionIndex < questionList.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(questionList.length - 1);
    }
    console.log(questionIndex);
  };

  useEffect(() => {
    getWorkbookQuestion(
      workbookId,
      Token,
      (res) => {
        console.log(res.data.questionList.split(", ")[questionIndex]);
        setQuestionList(res.data.questionList.split(", "));
        setQuestionId(res.data.questionList.split(", ")[questionIndex]);
        console.log(questionId);
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
    console.log(questionList);
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ margin: "auto" }}>
          {answerRes[1] === selectedAnswer ? (
            <h3>
              {" "}
              <MoodIcon fontSize="large" color="primary"></MoodIcon>
              정답입니다.
            </h3>
          ) : (
            <h3>
              {" "}
              <SentimentDissatisfiedIcon
                fontSize="large"
                color="warning"
              ></SentimentDissatisfiedIcon>
              틀렸습니다.
            </h3>
          )}
        </DialogTitle>
        <DialogContent style={{ margin: "auto" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {questionExp}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

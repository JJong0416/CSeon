import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { getWorkbookQuestion } from "../..//api/workbook";
import { getQuestion } from "../../api/question";
import Swal from "sweetalert2";

// CommonJS

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
import { useDispatch, useSelector } from "react-redux";
import BasicButton from "./BasicButton";
import { SET_QUESTION_INDEX } from "../../redux/QuestionInfo";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function WorkbookDetail() {
  const Swal = require("sweetalert2");
  const dispatch = useDispatch();
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
    console.log(newArr);
    handleClickOpen();

    console.log("answerRes", answerRes[1], questionExp);

    if (answerRes[1] !== idx) {
      Swal.fire({
        icon: "error",
        title: "틀렸습니다.",
        text: questionExp,
      });
    } else if (answerRes[1] === idx) {
      Swal.fire({
        icon: "success",
        title: "맞았습니다.",
        text: questionExp,
      });
    }
    // 사용자 로그 찍는거
  };

  const handleQuestionIndex = (data) => {
    console.log(data);
    dispatch(SET_QUESTION_INDEX(data));
  };
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const [questionId, setQuestionId] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const questionIndex = useSelector(
    (state) => state.QuestionInfo.questionIndex
  ); // redux 상태관리
  const [workbookId, setWorkbookId] = useState(1);
  const [questionList, setQuestionList] = useState([]);

  const prevQuestion = () => {
    if (questionIndex > 0) {
      dispatch(SET_QUESTION_INDEX(questionIndex - 1));
    } else {
      dispatch(SET_QUESTION_INDEX(0));
    }
    console.log("prev" + questionIndex);
  };

  const nextQuestion = () => {
    if (questionIndex < questionList.length - 1) {
      dispatch(SET_QUESTION_INDEX(questionIndex + 1));
    } else {
      dispatch(SET_QUESTION_INDEX(questionList.length - 1));
    }
    console.log(questionIndex);
  };

  useEffect(() => {
    dispatch(SET_QUESTION_INDEX(0));
    getWorkbookQuestion(
      workbookId,
      Token,
      (res) => {
        console.log(res.data.questionList.split(", ")[questionIndex]);
        setQuestionList(res.data.questionList.split(", "));
        setQuestionId(res.data.questionList.split(", ")[questionIndex]);
        console.log(
          res.data.questionList.split(", ")[0] + "----------------------"
        );
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
    console.log(questionList);
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

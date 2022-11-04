import { AutoFixHighSharp, LineAxisOutlined } from "@mui/icons-material";
import { getWorkbookQuestion } from "../..//api/workbook";
import { getQuestion } from "../../api/question";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  getListItemAvatarUtilityClass,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";

export default function WorkbookDetail() {
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const [questionId, setQuestionId] = useState(1);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionExp, setQuestionExp] = useState("");
  const [answerRes, setAnswerRes] = useState([[], 0]);
  const [answers, setAnswers] = useState([
    "1번보기1번보기1번보기1번보기1번보기1번보기1번보기",
    "2번보기2번보기2번보기2번보기2번보기2번보기2번보기",
    "3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기",
    "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기",
  ]);
  const [workbookId, setWorkbookId] = useState(1);

  useEffect(() => {
    getWorkbookQuestion(
      workbookId,
      Token,
      (res) => {
        console.log(res.data.questionList.split(", ")[0]);
        setQuestionId(res.data.questionList.split(", ")[0]);
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
            console.log(answerRes);
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

    //  getListItemAvatarUtilityClass().then({
    //   setQuestionnum[arr[0]]
    //   getQuestion(
    //     questionId,
    //     Token,
    //     (res) => {
    //       console.log(res.data);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }, []);

  //   // getProfile();
  // }, []);

  useEffect(() => {
    // axios로 보기 내용 받아오기
    // setAnswers([
    //   "1번보기1번보기1번보기1번보기1번보기1번보기1번보기",
    //   "2번보기2번보기2번보기2번보기2번보기2번보기2번보기",
    //   "3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기3번 보기",
    //   "4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기4번 보기",
    // ]);
    // setQuestiontitle(
    //   "문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제문제"
    // );
  });

  useEffect(() => {
    // axios.get()
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
      },
      (err) => {
        console.log(err);
      }
    );
  }, [questionId]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          float: "left",
          width: "30%",
        }}
      >
        <SideBar></SideBar>
      </div>
      {/* 버튼을 누르면 전에 있는 문제를 불러와야함 */}
      <Button>&lt;&lt;</Button>
      <div
        style={{
          float: "right",
          width: "70%",
        }}
      >
        <span>
          {" "}
          {answerRes[0] != null && answerRes[0].length > 0 ? (
            <Box sx={{ width: "100%" }}>
              <h2>Q. {questionTitle}</h2>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6} sx={{ my: 5 }}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        1번
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answerRes[0].answers[0]}
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
                        {answerRes.answers[1]}
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
                        {answerRes.answers[2]}
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
                        {answerRes.answers[3]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : null}
        </span>
      </div>
      <Button>&gt;&gt;</Button>
    </div>
  );
}

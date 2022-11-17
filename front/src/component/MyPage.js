import { useSelector } from "react-redux";
import { getUserProfile } from "../api/accountinfo";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { SET_WORKBOOK_INDEX } from "../redux/WorkbookInfo";
import { SET_QUESTION_ID } from "../redux/QuestionInfo";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
export default function MyPage() {
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const accountName = useSelector(
    (state) => state.AccountInfo.accountInfo.accountName
  );
  const dispatch = new useDispatch();
  const [correctList, setCorrectList] = useState([]);
  const [unCorrectList, setUncorrectList] = useState([]);
  const badges = ["현중배 1등", "요청 문제 정식 등록 10회"];
  const [workbooks, setWorkbooks] = useState(null);
  const goWorkbookDetail = (workbookId) => {
    dispatch(SET_WORKBOOK_INDEX(workbookId));
    console.log(workbookId);
  };
  const goQuestionDetail = (questionId) => {
    dispatch(SET_QUESTION_ID(questionId));
    console.log(questionId);
  };
  useEffect(() => {
    console.log("Mypage render..");
    getUserProfile(
      token,
      (res) => {
        console.log(res);
        setWorkbooks(res.data.workbooks);
        setCorrectList(res.data.correctQuestion);
        setUncorrectList(res.data.wrongQuestion);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div style={{ padding: "2vh 12vh 0vh 12vh" }}>
      <h2 style={{ float: "left" }}>{accountName}님의 정보 </h2>
      <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
        <Card
          raised
          sx={{
            width: "100%",
            margin: "0vh 4vh 4vh 4vh",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                backgroundColor: "lightgray",
                textAlign: "left",
                padding: "1vh 2vh",
                fontFamily: "GangwonEdu_OTFBoldA",
              }}
            >
              맞은 문제
            </Typography>
            <Typography variant="h6" style={{ float: "left", padding: "2vh" }}>
              {correctList.map((questionId) => (
                <a
                  onClick={() => goQuestionDetail(questionId)}
                  href="questionsdetail"
                  style={{ margin: "2vh", color: "green" }}
                >
                  {questionId}
                </a>
              ))}
            </Typography>
          </CardContent>
        </Card>
        <Card
          raised
          sx={{
            width: "100%",
            margin: "0vh 4vh 4vh 4vh",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                backgroundColor: "lightgray",
                textAlign: "left",
                padding: "1vh 2vh",
                fontFamily: "GangwonEdu_OTFBoldA",
              }}
            >
              틀린 문제
            </Typography>
            <Typography variant="h6" style={{ float: "left", padding: "2vh" }}>
              {unCorrectList.map((questionId) => (
                <a
                  onClick={() => goQuestionDetail(questionId)}
                  href="questionsdetail"
                  style={{ margin: "2vh", color: "red" }}
                >
                  {questionId}
                </a>
              ))}
            </Typography>
          </CardContent>
        </Card>

        <Card
          raised
          sx={{
            width: "100%",
            margin: "0vh 4vh 4vh 4vh",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                backgroundColor: "lightgray",
                textAlign: "left",
                padding: "1vh 2vh",
                fontFamily: "GangwonEdu_OTFBoldA",
              }}
            >
              내가 만든 문제집들
            </Typography>
            {workbooks != null ? (
              <Typography
                variant="h6"
                style={{
                  float: "left",
                  padding: "2vh",
                }}
              >
                {workbooks.map((workbook) => (
                  <a
                    onClick={() => goWorkbookDetail(workbook.workbookId)}
                    href="workbookdetail"
                    style={{ margin: "2vh", color: "black" }}
                  >
                    {workbook.workbookName}
                  </a>
                ))}
              </Typography>
            ) : null}
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../api/accountinfo";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
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
  const correctList = [1, 2, 3, 4];
  const unCorrectList = [1, 2, 3, 4];
  const badges = ["현중배 1등", "요청 문제 정식 등록 10회"];
  const workbooks = [
    "지수의 첫번째 시크릿 문제집",
    "지수의 두번째 시크릿 문제집",
  ];

  useEffect(() => {
    console.log("Mypage render..");
    getUserProfile(
      token,
      (res) => {
        console.log(res);
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
                  href="questiondetail"
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
                  href="questiondetail"
                  style={{ margin: "2vh", color: "red" }}
                >
                  {questionId}
                </a>
              ))}
            </Typography>
          </CardContent>
        </Card>
        {/* <Card
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
              내 칭호들
            </Typography>
            <Typography
              variant="h6"
              style={{
                float: "left",
                padding: "2vh",
              }}
            >
              {badges.map((badge) => (
                <div style={{ margin: "2vh", backgroundColor: "#4fc3f7" }}>
                  {badge}
                </div>
              ))}
            </Typography>
          </CardContent>
        </Card> */}
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
            <Typography
              variant="h6"
              style={{
                float: "left",
                padding: "2vh",
              }}
            >
              {workbooks.map((workbook) => (
                <a
                  href="workbookdetail"
                  style={{ margin: "2vh", color: "black" }}
                >
                  {workbook}
                </a>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

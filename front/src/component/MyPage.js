import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../api/user";
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
        <Card sx={{ width: "100%", margin: "0vh 4vh 4vh 4vh" }}>
          <CardActionArea>
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
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ float: "left", padding: "2vh" }}
              >
                {correctList.map((questionId) => (
                  <a href="mainpage" style={{ margin: "2vh" }}>
                    {questionId}
                  </a>
                ))}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ width: "100%", margin: "0vh 4vh 4vh 4vh" }}>
          <CardActionArea>
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
              <Typography
                variant="body2"
                color="text.secondary"
                style={{ float: "left", padding: "2vh" }}
              >
                {unCorrectList.map((questionId) => (
                  <a href="mainpage" style={{ margin: "2vh" }}>
                    {questionId}
                  </a>
                ))}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
}

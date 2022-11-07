import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { SET_LOGOUT } from "../redux/UserInfo";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ClickQuestions = () => {
    navigate("/questionslist");
  };
  const ClickHome = () => {
    navigate("/mainpage");
  };
  const ClickWorkbook = () => {
    navigate("/workbooklist");
  };
  const ClickCompetition = () => {
    navigate("/competitionlist");
  };
  const ClickMypage = () => {
    navigate("/mypage");
  };

  const Logout = () => {
    // session 비우기
    sessionStorage.clear();
    dispatch(SET_LOGOUT());
    navigate("/");
  };
  return (
    <div style={{ boxShadow: "0px 0px 5px 0px", margin: "0px 0px 2vh 0px" }}>
      <header>
        <img
          onClick={ClickHome}
          alt="메인 로고"
          src={require("../assets/메인로고2.png")}
          style={{ width: "18%", padding: "2vh 4vh" }}
          onClick={ClickHome}
        />

        <nav>
          <ul>
            <li onClick={ClickQuestions}>문제 풀기</li>
            <li onClick={ClickWorkbook}>문제집</li>
            <li onClick={ClickCompetition}>실시간 대회</li>
            <li>
              <button onClick={Logout}>로그아웃</button>
              <button onClick={ClickMypage}>마이페이지</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>

    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={3}>
    //       <Item onClick={ClickHome}>
    //         <img
    //           src={require("../assets/메인로고2.png")}
    //           width="70%"
    //           height="70%"
    //         />
    //       </Item>
    //     </Grid>
    //     <Grid item xs={2}>
    //       <Item onClick={ClickQuestions}>문제 풀기</Item>
    //     </Grid>
    //     <Grid item xs={2}>
    //       <Item onClick={ClickWorkbook}>문제집</Item>
    //     </Grid>
    //     <Grid item xs={2}>
    //       <Item onClick={ClickCompetition}>실시간 대회</Item>
    //     </Grid>
    //     <Grid item xs={3}>
    //       <Item>
    //         <button>로그아웃</button>
    //         <button onClick={ClickMypage}>마이페이지</button>
    //       </Item>
    //     </Grid>
    //     {/* <Grid item xs={4}>
    //       <Item>xs=4</Item>
    //     </Grid>
    //     <Grid item xs={8}>
    //       <Item>xs=8</Item>
    //     </Grid> */}
    //   </Grid>
    // </Box>
  );
}

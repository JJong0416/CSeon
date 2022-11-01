import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // color: theme.palette.text.secondary,
}));

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item>
            <img
              src={require("../assets/메인로고2.png")}
              width="70%"
              height="70%"
            />
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item>문제 풀기</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>문제집</Item>
        </Grid>
        <Grid item xs={2}>
          <Item>실시간 대회</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <button>버튼</button>
          </Item>
        </Grid>
        {/* <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid> */}
      </Grid>
    </Box>
  );
}

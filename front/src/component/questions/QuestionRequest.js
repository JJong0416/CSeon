import {
  Button,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function QuestionRequest() {
  const [title, setTitle] = useState("");
  const [answer0, setAnswer0] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [explain, setExplain] = useState("");
  const handleClick = (idx) => {
    const newArr = Array(4).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setRightAnswer(idx);
  };
  const ClickRegisterRequest = () => {
    console.log("등록 요청");
    console.log("title:", title);
    console.log("right answer:", rightAnswer);
    console.log("answerList:", answer0, answer1, answer2, answer3);
    console.log("exp:", explain);
    // axios 호출해서 DB에 저장(2022.11.08)
  };

  const AnswerForm = () => {
    console.log("AnswerForm");
    const clickedButtonStyle = {
      textColor: "white",
      backgroundColor: "#90caf9",
      margin: "0vh 5vh 5vh 5vh",
    };

    const buttonStyle = {
      textColor: "black",
      backgroundColor: "white",
      margin: "0vh 5vh 5vh 5vh",
    };
    const OnChangeAnswer = (e, i) => {
      console.log(e.target.value, i);
      if (i === 0) setAnswer0(e.target.value);
      else if (i === 1) setAnswer1(e.target.value);
      else if (i === 2) setAnswer2(e.target.value);
      else setAnswer3(e.target.value);
    };
    const result = [];

    for (let i = 0; i < 4; i++) {
      result.push(
        <Grid xs={6} sx={{ mt: 5 }} style={{ textAlign: "center" }}>
          <Card
            style={isCategorySelect[i] ? clickedButtonStyle : buttonStyle}
            onClick={() => handleClick(i)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {i + 1} 번
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-multiline-static"
                  placeholder="보기를 작성해주세요."
                  multiline
                  rows={4}
                  onChange={(e) => OnChangeAnswer(e, i)}
                />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return result;
  };

  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        Q.{" "}
        <TextField
          helperText="100자 이하로 작성해주세요."
          placeholder="질문을 작성해주세요."
          style={{ width: "70%" }}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </h1>
      <h4>정답을 눌러주세요.</h4>
      <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
        {AnswerForm()}
      </Grid>
      <Divider></Divider> <Divider></Divider>
      <h1>해설</h1>
      <TextField
        style={{ width: "90%", marginBottom: "4vh" }}
        id="outlined-multiline-static"
        placeholder="해설을 작성해주세요."
        multiline
        rows={4}
        onChange={(e) => setExplain(e.target.value)}
      />
      <div style={{ marginBottom: "4vh" }}>
        <Button
          size="large"
          variant="contained"
          style={{ backgroundColor: "#64b5f6" }}
          onClick={ClickRegisterRequest}
        >
          등록 요청
        </Button>
      </div>
    </Box>
  );
}

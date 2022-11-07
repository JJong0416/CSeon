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
import BasicButton from "../BasicButton";
import AnswerForm from "./AnswerForm";

export default function QuestionRequest() {
  const [answerList, setAnswerList] = useState(["", "", "", ""]);
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const handleClick = (idx) => {
    const newArr = Array(answerList.length).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setRightAnswer(idx);
  };
  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        Q.{" "}
        <TextField
          helperText="100자 이하로 작성해주세요."
          placeholder="질문을 작성해주세요."
          style={{ width: "70%" }}
        />{" "}
      </h1>
      <h4>정답을 눌러주세요.</h4>
      <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
        {/* <Grid xs={6} sx={{ my: 5 }} style={{ textAlign: "center" }}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                1번
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <input></input>
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}

        {answerList.map((elm, index) => {
          return (
            <AnswerForm
              key={index}
              isSelected={isCategorySelect[index]}
              handleClick={handleClick}
              elementIndex={index}
              content={elm}
            />
          );
        })}
      </Grid>
      <Divider></Divider> <Divider></Divider>
      <h1>해설</h1>
      <TextField
        style={{ width: "90%", marginBottom: "4vh" }}
        id="outlined-multiline-static"
        placeholder="해설을 작성해주세요."
        multiline
        rows={4}
      />
      <div style={{ marginBottom: "4vh" }}>
        <Button
          size="large"
          variant="contained"
          style={{ backgroundColor: "#64b5f6" }}
        >
          등록 요청
        </Button>
      </div>
    </Box>
  );
}

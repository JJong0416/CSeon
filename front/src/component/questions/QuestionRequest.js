import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import BasicButton from "../workbook/BasicButton";
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
    <Box sx={{ width: "100%" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        Q. <input></input>
      </h1>
      <h3>정답을 눌러주세요.</h3>
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
      <div>
        해설 <input></input>
      </div>
      <Button>등록 요청</Button>
    </Box>
  );
}

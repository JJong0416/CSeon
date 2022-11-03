import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { useEffect, useState } from "react";

function renderRow(props) {
  console.log(props);
  const { data, index, style } = props;

  const Clicklistitem = (idx) => {
    console.log("click", idx);
  };

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton
        style={{ borderBottom: "solid black 1px" }}
        onClick={() => selectQuestion(data[index])}
      >
        <ListItemText primary={data[index].questionTitle} />
      </ListItemButton>
    </ListItem>
  );
}

function selectQuestion(questionInfo) {
  // questionId로 문제 가져와서 문제 바꿔주는 함수
  console.log("문제 선택" + questionInfo.questionId);
}

export default function SideBar() {
  const [questionList, setQuestionList] = useState([
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
    { questionId: 1, questionTitle: "1번문제!!!!!!!!!!!!!!!" },
    { questionId: 2, questionTitle: "2번문제!!!!!!!!!!!!!!!" },
  ]);

  useEffect(() => {});

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={questionList.length}
        overscanCount={5}
        itemData={questionList}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}

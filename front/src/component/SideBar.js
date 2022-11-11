import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { useEffect, useState } from "react";
import { getWorkbookQuestion } from "../api/workbook";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { SET_QUESTION_INDEX } from "../redux/QuestionInfo";

// function selectQuestion(questionInfo) {
//   // questionId로 문제 가져와서 문제 바꿔주는 함수
//   console.log("문제 선택" + questionInfo);

// }

export default function SideBar(props) {
  function renderRow(props) {
    const { data, index } = props;
    console.log(props);

    const Clicklistitem = () => {
      //
      console.log("click", index);
      dispatch(SET_QUESTION_INDEX(index));
    };

    return (
      <ListItem
        key={index}
        component="div"
        disablePadding
        style={{
          borderBottom: "solid #9DCFFF 1px",
          width: "90%",
          margin: "auto",
        }}
      >
        <ListItemButton onClick={Clicklistitem}>
          <ListItemText primary={data[index] + `번문제`} />
        </ListItemButton>
      </ListItem>
    );
  }
  const dispatch = useDispatch();
  const questionIndex = useSelector(
    (state) => state.QuestionInfo.questionIndex
  ); // redux 상태관리
  console.log(props);
  const Token = useSelector((state) => state.UserInfo.accessToken);
  const [workbookId, setWorkbookId] = useState(1);

  useEffect(() => {
    console.log(props.questionList);
  }, []);

  return (
    <Box
      sx={{
        mt: 3,
        mr: 2,
        ml: 1,
        width: "70%",
        height: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderColor: "#0099FF",
        borderStyle: "solid",
      }}
    >
      {/* <FixedSizeList
        height={200}
        width={100}
        itemSize={46}
        itemCount={props.questionList.length}
        overscanCount={5}
        itemData={props.questionList}
      >
        {renderRow}
      </FixedSizeList> */}

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            className="List"
            height={height}
            itemCount={props.questionList.length}
            itemData={props.questionList}
            itemSize={35}
            width={width}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
}

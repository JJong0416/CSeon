import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoSizer from "react-virtualized-auto-sizer";
import { SET_QUESTION_INDEX } from "../redux/QuestionInfo";

export default function SideBar(props) {
  function renderRow(props) {
    const { data, index } = props;
    const current = index === questionIndex;

    const Clicklistitem = () => {
      dispatch(SET_QUESTION_INDEX(index));
    };

    return (
      <ListItem
        key={index}
        component="div"
        disablePadding
        style={
          current
            ? {
                borderBottom: "solid #9DCFFF 1px",
                width: "90%",
                margin: "auto",
                backgroundColor: "#9DCFFF",
              }
            : {
                borderBottom: "solid #9DCFFF 1px",
                width: "90%",
                margin: "auto",
                backgroundColor: "white",
              }
        }
      >
        <ListItemButton onClick={Clicklistitem}>
          <ListItemText primary={index + 1 + `번문제`} />
        </ListItemButton>
      </ListItem>
    );
  }
  const dispatch = useDispatch();
  const questionIndex = useSelector((state) => state.QuestionInfo.questionIndex);

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

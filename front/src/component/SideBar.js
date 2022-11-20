import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_QUESTION_INDEX } from "../redux/QuestionInfo";
import { AutoSizer } from "react-virtualized";

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
  useEffect(() => {
    console.log("sidebar: ", props);
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
        overflow: "scroll",
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          // <FixedSizeList
          //   height={height}
          //   itemCount={props.questionList.length}
          //   itemSize={35}
          //   width={width}
          // >
          //   {renderRow}
          // </FixedSizeList>
          <List
            // ref="List"
            // ref={(el) => {
            //   this.List = el;
            // }}
            // className={"List"}
            height={height}
            width={width}
            //   overscanRowCount={overscanRowCount}
            // noRowsRenderer={this._noRowsRenderer}
            rowCount={props.questionList.length}
            rowHeight={
              50
              // useDynamicRowHeight ? this._getRowHeight : listRowHeight
            }
            rowRenderer={renderRow}
          />
        )}
      </AutoSizer>
    </Box>
  );
}

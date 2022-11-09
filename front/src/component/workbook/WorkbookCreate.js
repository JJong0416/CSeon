import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function WorkbookCreate() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3, 8, 9, 10]);
  const [right, setRight] = useState([4, 5, 6, 7, 11, 12]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ height: "60vh", overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <div>
      {" "}
      <h1 style={{ wordBreak: "break-all" }}>
        제목{" "}
        <TextField
          helperText="100자 이하로 작성해주세요."
          placeholder="문제집 제목을 작성해주세요."
          style={{ width: "70%" }}
        />{" "}
      </h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Box style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              float: "left",
              width: "50%",
              border: "1px solid black",
              margin: "4vh",
            }}
          >
            <Grid item>
              {" "}
              <TextField
                focused
                color="info"
                placeholder="문제 검색하기"
                id="outlined-start-adornment"
                sx={{ m: 4, width: "60vh" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />{" "}
              {customList(left)}
            </Grid>
          </div>{" "}
          <div style={{ margin: "auto" }}>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                {" "}
                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                <ChevronRightIcon></ChevronRightIcon>
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                {" "}
                <ChevronLeftIcon></ChevronLeftIcon>
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                {" "}
                <KeyboardDoubleArrowLeftIcon></KeyboardDoubleArrowLeftIcon>
              </Button>
            </Grid>
          </div>
          <div
            style={{
              float: "right",
              width: "50%",
              border: "1px solid black",
              margin: "4vh",
            }}
          >
            <Grid item>{customList(right)}</Grid>
          </div>
        </Box>
      </Grid>
    </div>
  );
}

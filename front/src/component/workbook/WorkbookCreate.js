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
import {
  getAllQuestionList,
  getQuestionListWithKeyword,
} from "../../api/question";
import { registerWorkbook } from "../../api/workbook";
import { useNavigate } from "react-router";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function WorkbookCreate() {
  const navigate = useNavigate();
  const accountName = useSelector(
    (state) => state.AccountInfo.accountInfo.accountName
  );
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [title, setTitle] = useState("");
  useEffect(() => {
    getAllQuestionList(
      Token,
      (res) => {
        console.log("getAllQuestionList res.data: ", res.data);
        setLeft(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(value);
    console.log(left);
    console.log("dd" + right);
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
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    console.log("keyword changed..", e.target.value);
    setSearch(e.target.value);
  };

  const ClickSearchBtn = () => {
    if (search !== "") {
      getQuestionListWithKeyword(
        search,
        Token,
        (res) => {
          console.log("getQuestionListWithKeyword res.data: ", res.data);
          setLeft(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const ClickRegisterRequest = () => {
    let workbookRequest = {
      questionId: right.map((question) => question.questionId),
      workbookName: title,
      workbookCreatedBy: accountName,
    };
    registerWorkbook(
      workbookRequest,
      Token,
      (res) => {
        console.log("registerWorkbook res.data: ", res.data);
        navigate("/workbooklist");
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(right + "dfsafsdfs");
    console.log(title + "workbookname");
  };
  const customList = (items) => (
    <Paper sx={{ height: "60vh", overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.questionId}
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
              <ListItemText
                id={labelId}
                primary={` ${value.questionTitle + 1}`}
              />
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
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </h1>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Box style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              float: "left",
              width: "45%",

              margin: "5vh",
            }}
          >
            <Grid item style={{ border: "1px solid black" }}>
              {" "}
              <TextField
                sx={{ m: 4, width: "50vh" }}
                focused
                color="info"
                placeholder="문제 검색하기"
                id="outlined-start-adornment"
                value={search}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                        onClick={ClickSearchBtn}
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
              width: "45%",
              margin: "5vh",
            }}
          >
            <Grid item style={{ border: "1px solid black" }}>
              {customList(right)}
            </Grid>
            <Button
              size="large"
              variant="contained"
              style={{ margin: "4vh" }}
              onClick={ClickRegisterRequest}
            >
              만들기
            </Button>
          </div>
        </Box>
      </Grid>
    </div>
  );
}

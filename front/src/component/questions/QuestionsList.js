import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import {
  getAllQuestionList,
  getQuestionListWithBoth,
  getQuestionListWithKeyword,
  getQuestionListWithLabel,
} from "../../api/question";
import { useDispatch, useSelector } from "react-redux";
import { SET_QUESTION_ID } from "../../redux/QuestionInfo";
import { getLabels } from "../../api/label";

export default function QuestionsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const accountRole = useSelector(
    (state) => state.AccountInfo.accountInfo.accountRole
  );
  const [selectedLabel, setSelectedLabel] = useState("NONE");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [labels, setLabels] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleLabelChange = (e) => {
    if (e.target.value === "NONE") {
      getAllQuestionList(
        token,
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      getQuestionListWithLabel(
        e.target.value,
        token,
        (res) => {
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    setSelectedLabel(e.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getAllQuestionList(
      token,
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
    getLabels(
      token,
      (res) => {
        setLabels(res.data.split(", "));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const ClickTitle = (questionId) => {
    dispatch(SET_QUESTION_ID(questionId));
    navigate("/questionsdetail");
  };
  const clickQuestionCreate = () => {
    navigate("/questionrequest");
  };
  const clickQuestionConfirm = () => {
    navigate("/requestquestionlist");
  };
  const ClickSearchBtn = () => {
    if (search !== "") {
      if (selectedLabel === "NONE") {
        getQuestionListWithKeyword(
          search,
          token,
          (res) => {
            setList(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        getQuestionListWithBoth(
          selectedLabel,
          search,
          token,
          (res) => {
            setList(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      if (selectedLabel === "NONE") {
        getAllQuestionList(
          token,
          (res) => {
            setList(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        getQuestionListWithLabel(
          selectedLabel,
          token,
          (res) => {
            setList(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  };
  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        <Box sx={{ minWidth: 120, mb: 4 }}>
          <FormControl sx={{ mr: 10, width: "15%" }} focused>
            <InputLabel>라벨 선택</InputLabel>
            <Select
              value={selectedLabel}
              onChange={handleLabelChange}
              defaultValue={"NONE"}
              label="라벨 선택"
            >
              <MenuItem value={"NONE"}>
                <em>선택 안함</em>
              </MenuItem>
              {labels.map((label) => (
                <MenuItem key={label} value={label}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ ml: 10, width: "50%" }}
            focused
            color="info"
            placeholder="문제 검색하기"
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
          />
        </Box>
      </div>
      <div style={{ width: "90%", margin: "2vh auto" }}>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table size="large">
            <TableHead sx={{ backgroundColor: "#64b5f6" }}>
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    width: "10%",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  No
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    width: "10%",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  문제 아이디
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  문제
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map(({ questionId, questionTitle }, i) => (
                  <TableRow key={questionId}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                    >
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "2vh",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                      onClick={() => ClickTitle(questionId)}
                    >
                      {questionId}
                    </TableCell>
                    {/* <TableCell align="right">
                    {label.map((l) => ({ l }))}
                  </TableCell> */}
                    <TableCell
                      sx={{
                        fontSize: "2vh",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                      onClick={() => ClickTitle(questionId)}
                    >
                      {questionTitle}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={list.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        {accountRole === "USER" ? (
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: "#64b5f6",
              float: "right",
              margin: "0vh 4vh 4vh 0vh",
            }}
            onClick={clickQuestionCreate}
          >
            문제 만들기
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: "#64b5f6",
              float: "right",
              margin: "0vh 4vh 4vh 0vh",
            }}
            onClick={clickQuestionConfirm}
          >
            요청 문제 확인
          </Button>
        )}
      </div>
    </div>
  );
}

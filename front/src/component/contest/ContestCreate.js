import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
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
import { useDispatch, useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SearchIcon from "@mui/icons-material/Search";
import { getAllWorkbookList, getWorkbookWithKeyWord } from "../../api/workbook";
import { createContest } from "../../api/contest";
export default function ContestCreate() {
  const dispatch = new useDispatch();
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [checkedworkbook, setCheckedworkbook] = useState(-1);
  const [contestTitle, setContestTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const onChange = (e) => {
    // console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const ClickSearchBtn = () => {
    console.log("search keywork: ", search);
    if (search !== "") {
      getWorkbookWithKeyWord(
        search,
        Token,
        (res) => {
          console.log("getWorkbookWithKeyWord res.data: ", res.data);
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      getAllWorkbookList(
        Token,
        (res) => {
          console.log("getAllWorkbookList res.data:", res.data);
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  // 체크박스 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedworkbook(id);
    } else {
      setCheckedworkbook(-1);
    }
  };
  const timesetting = (time) => {
    function pad(n) {
      return n < 10 ? "0" + n : n;
    }
    let year = time.$y;
    let month = pad(time.$M + 1);
    let day = pad(time.$D);
    let hour = pad(time.$H);
    let minute = pad(time.$m);
    return year + "-" + month + "-" + day + "T" + hour + ":" + minute+":00+09:00[Asia/Seoul]";
  };
  function timestamp() {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().substring(0, 16);
  }

  const ClickContestRegist = () => {
    console.log("contestTitle: ", contestTitle);
    let stime = timesetting(startTime);
    let etime = timesetting(endTime);
    let nowtime = timestamp();
    console.log("startTime: ", stime);
    console.log("endTime: ", etime);
    console.log("nowTime: ", nowtime);
    console.log("checkedworkbookId: ", checkedworkbook);
    // 시간 올바른지 체킹하기
    if (nowtime >= stime)
      alert("시작시간 다시 세팅해주세요~ (현재 시간보다 빠름)");
    else if (stime >= etime) alert("대회 시간 다시 세팅해주세요~");
    else {
      // API 보내기
      const contestReq = {
        workbookId: checkedworkbook,
        contestName: contestTitle,
        contestStart: stime,
        contestEnd: etime,
      };
      createContest(
        contestReq,
        Token,
        (res) => {
          console.log("createContest res.data: ", res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  useEffect(() => {
    console.log("workbooklist rendering...");
    getAllWorkbookList(
      Token,
      (res) => {
        console.log("res.data:", res.data);
        setList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        대회명{" "}
        <TextField
          helperText="25자 이하로 작성해주세요."
          placeholder="대회명을 작성해주세요."
          style={{ width: "70%" }}
          value={contestTitle}
          onChange={(e) => {
            setContestTitle(e.target.value);
          }}
        />
      </h1>

      <h1>
        시작 시간{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        종료 시간{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        문제집 선택하기{" "}
        <div
          style={{
            margin: "auto",
            border: "1px black solid",
            width: "80%",
            padding: "2vh",
          }}
        >
          <div style={{ marginTop: "3vh" }}>
            {/* <input type="text" value={search} onChange={onChange} /> */}
            <TextField
              focused
              color="info"
              placeholder="문제집 검색하기"
              value={search}
              onChange={onChange}
              id="outlined-start-adornment"
              sx={{ mb: 4, width: "40vh" }}
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
          </div>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {/* <TableCell>No</TableCell> */}
                  <TableCell>번호</TableCell>
                  <TableCell align="left">만든 사람</TableCell>
                  <TableCell align="left">문제집 제목</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map(({ workbookId, workbookCreatedBy, workbookName }, i) => (
                    <TableRow key={workbookId}>
                      {/* <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell> */}
                      <TableCell>{workbookId}</TableCell>
                      <TableCell align="left">{workbookCreatedBy}</TableCell>
                      <TableCell align="left">{workbookName}</TableCell>
                      <TableCell align="left">
                        <input
                          type="checkbox"
                          name={workbookName}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, workbookId)
                          }
                          // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                          checked={
                            checkedworkbook === workbookId ? true : false
                          }
                        />
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
        </div>{" "}
      </h1>
      <Button variant="contained" size="large" onClick={ClickContestRegist}>
        만들기
      </Button>
    </Box>
  );
}

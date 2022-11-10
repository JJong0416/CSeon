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
import { getAllWorkbookList } from "../../api/workbook";
export default function ContestCreate() {
  const dispatch = new useDispatch();
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [value, setValue] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

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
        />{" "}
      </h1>

      <h1>
        시작 시간{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
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
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
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
      <Button variant="contained" size="large">
        만들기
      </Button>
    </Box>
  );
}

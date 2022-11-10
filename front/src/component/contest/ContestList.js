import {
  Button,
  IconButton,
  InputAdornment,
  InputBase,
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
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router";
import { getWorkbookList } from "../../api/workbook";
import { useDispatch, useSelector } from "react-redux";
import { getAllContestList } from "../../api/contest";
export default function ContestList() {
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contestList, setContestList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getAllContestList(
      Token,
      (res) => {
        console.log(res.data);
        setContestList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
    faker.seed(123);
    faker.locale = "ko";
    setUsers(
      Array(53)
        .fill()
        .map(() => ({
          id: 11,
          name: faker.name.lastName() + faker.name.firstName(),
          title: "XX 대회",
          count: 0,
        }))
    );
  }, []);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  const ClickTitle = () => {
    //redux에 세팅 or props
    navigate("/contestdetail");
  };

  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <TextField
          focused
          color="info"
          placeholder="대회 검색하기"
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
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>

              <TableCell align="right">대회명</TableCell>
              <TableCell align="right">대회 기간</TableCell>
              <TableCell align="right">대회 상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contestList
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(
                (
                  { contestId, contestTitle, endTime, expired, startTime },
                  i
                ) => (
                  <TableRow key={contestId}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell align="right">{contestTitle}</TableCell>
                    <TableCell align="right">
                      {startTime} ~ <br></br>
                      {endTime}
                    </TableCell>
                    <TableCell align="right" onClick={ClickTitle}>
                      {expired ? (
                        <Button>결과 보기</Button>
                      ) : (
                        <Button>참여하기</Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={users.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

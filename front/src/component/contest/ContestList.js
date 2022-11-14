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
import {
  getAllContestList,
  checkValidation,
  getContestQuestions,
} from "../../api/contest";
import { SET_CONTEST_ID } from "../../redux/ContestInfo";
export default function ContestList() {
  const accountRole = useSelector(
    (state) => state.AccountInfo.accountInfo.accountRole
  );
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contestList, setContestList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  //const contestId = useSelector((state) => state.ContestInfo.contestId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const showResult = (contestId) => {
    console.log("결과 보기");
  };

  const joinContest = (contestId) => {
    dispatch(SET_CONTEST_ID(contestId));
    checkValidation(
      contestId,
      Token,
      (res) => {
        console.log(res.data);
        if (res.data === "대회 진행") {
          navigate("/contestdetail");
        } else {
          alert("대회가 시작되지 않았음");
        }
      },
      (err) => {
        console.log(err);
      }
    );
    //   navigate("/contestdetail");
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

  const ClickContetCreate = ()=>{
    navigate("/contestcreate");
  }

  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <h2>실시간 대회</h2>
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
                  { contestId, contestTitle, endTime, isExpired, startTime },
                  i
                ) => (
                  <TableRow key={contestId}>
                    <TableCell component="th" scope="row">
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell align="right">{contestTitle}</TableCell>
                    <TableCell align="right">
                      {startTime.split("T")[0] +
                        " " +
                        startTime.split("T")[1].split("+")[0]}{" "}
                      ~ <br></br>
                      {endTime.split("T")[0] +
                        " " +
                        endTime.split("T")[1].split("+")[0]}
                    </TableCell>

                    {/* <TableCell align="right" onClick={ClickTitle}> */}
                    <TableCell align="right">
                      {isExpired === "대회 종료" ? (
                        <Button onClick={() => showResult(contestId)}>
                          결과 보기
                        </Button>
                      ) : (
                        <Button onClick={() => joinContest(contestId)}>
                          참여하기
                        </Button>
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
      {accountRole === "ADMIN" ? (
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "#64b5f6",
            float: "right",
            margin: "0vh 4vh 4vh 0vh",
          }}
          onClick={ClickContetCreate}
        >
          대회 생성
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}

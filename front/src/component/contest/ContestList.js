import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllContestList, checkValidation, getContestQuestions } from "../../api/contest";
import { SET_CONTEST_ID, SET_CONTEST_NAME, SET_CONTEST_ENDTIME } from "../../redux/ContestInfo";
export default function ContestList() {
  const accountRole = useSelector((state) => state.AccountInfo.accountInfo.accountRole);

  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contestList, setContestList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const contestId = useSelector((state) => state.ContestInfo.contestId);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const showResult = (contestId) => {
    dispatch(SET_CONTEST_ID(contestId));
    navigate("/contestresult");
  };

  const joinContest = (contestId, contestName, contestEndTime) => {
    dispatch(SET_CONTEST_ID(contestId));
    dispatch(SET_CONTEST_NAME(contestName));
    dispatch(SET_CONTEST_ENDTIME(contestEndTime));
    console.log(contestEndTime);
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
        console.log("getAllContestList res.data: ", res.data);
        setContestList(res.data);
      },
      (err) => {
        console.log(err);
      }
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

  const ClickContetCreate = () => {
    navigate("/contestcreate");
  };

  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <h1>실시간 대회</h1>
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
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  대회명
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    width: "20%",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  대회 기간
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    width: "10%",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  대회 상태
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contestList
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map(({ contestId, contestName, endTime, isExpired, startTime }, i) => (
                  <TableRow key={contestId}>
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
                    >
                      {contestName}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "2vh",
                        width: "20%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                    >
                      {startTime.split("T")[0] + " " + startTime.split("T")[1].split("+")[0]} ~{" "}
                      <br></br>
                      {endTime.split("T")[0] + " " + endTime.split("T")[1].split("+")[0]}
                    </TableCell>

                    {/* <TableCell align="right" onClick={ClickTitle}> */}
                    <TableCell
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                    >
                      {isExpired === "대회 종료" ? (
                        <Button onClick={() => showResult(contestId)}>결과 보기</Button>
                      ) : (
                        <Button onClick={() => joinContest(contestId, contestName, endTime)}>
                          참여하기
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={contestList.length}
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
    </div>
  );
}

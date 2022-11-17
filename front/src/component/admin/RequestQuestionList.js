import {
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
import { getRequestQuestionList } from "../../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { SET_REQUEST_QUESTION_ID } from "../../redux/QuestionInfo";

export default function RequestQuestionList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getRequestQuestionList(
      token,
      (res) => {
        console.log("getRequestQuestionList res.data: ", res.data);
        setList(res.data.responseDto);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const ClickTitle = (requestquestionId) => {
    console.log("ClickTitle requestquestionId: ", requestquestionId);
    dispatch(SET_REQUEST_QUESTION_ID(requestquestionId));
    navigate("/requestquestiondetail");
  };
  return (
    <div style={{ width: "90%", margin: "2vh auto" }}>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
        <h1>요청된 문제들</h1>
      </div>
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
                문제
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "2.5vh",
                  width: "10%",
                  fontFamily: "GangwonEdu_OTFBoldA",
                }}
                align="center"
              >
                만든 이
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(
                ({ questionId, accountId, accountName, questionTitle }, i) => (
                  <TableRow key={questionId}>
                    <TableCell
                      align="center"
                      component="th"
                      scope="row"
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                    >
                      {page * rowsPerPage + i + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => ClickTitle(questionId)}
                      sx={{
                        fontSize: "2vh",

                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                    >
                      {questionTitle}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                    >
                      {accountName}
                    </TableCell>
                  </TableRow>
                )
              )}
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
    </div>
  );
}

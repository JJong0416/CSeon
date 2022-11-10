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
    <div>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Creator</TableCell>
              <TableCell align="left">Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ questionId, accountId, questionTitle }, i) => (
                <TableRow key={questionId}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="left">{questionId}</TableCell>
                  <TableCell align="left">{accountId}</TableCell>
                  <TableCell
                    align="left"
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
    </div>
  );
}

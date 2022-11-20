import {
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
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SET_WORKBOOK_INDEX, SET_WORKBOOK_TITLE } from "../../redux/WorkbookInfo";
import { getAllWorkbookList, getWorkbookWithKeyWord } from "../../api/workbook";

export default function WorkbookList() {
  const dispatch = new useDispatch();
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const ClickTitle = (title, id) => {
    dispatch(SET_WORKBOOK_TITLE(title));
    dispatch(SET_WORKBOOK_INDEX(id));
    navigate("/workbookdetail");
  };
  const ClickSearchBtn = () => {
    if (search !== "") {
      getWorkbookWithKeyWord(
        search,
        Token,
        (res) => {
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
          setList(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };
  const clickWorkbookCreate = () => {
    navigate("/workbookcreate");
  };

  useEffect(() => {
    getAllWorkbookList(
      Token,
      (res) => {
        setList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
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
                  번호
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    width: "10%",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  만든 사람
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "2.5vh",
                    fontFamily: "GangwonEdu_OTFBoldA",
                  }}
                  align="center"
                >
                  문제집 제목
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map(({ workbookId, workbookCreatedBy, workbookName }, i) => (
                  <TableRow key={workbookId}>
                    <TableCell
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      align="center"
                    >
                      {workbookId}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "2vh",
                        width: "10%",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                    >
                      {workbookCreatedBy}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "2vh",
                        fontFamily: "GangwonEdu_OTFBoldA",
                      }}
                      onClick={() => ClickTitle(workbookName, workbookId)}
                    >
                      {workbookName}
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
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "#64b5f6",
            float: "right",
            margin: "0vh 4vh 4vh 0vh",
          }}
          onClick={clickWorkbookCreate}
        >
          문제집 만들기
        </Button>
      </div>
    </div>
  );
}

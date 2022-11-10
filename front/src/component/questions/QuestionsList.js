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
export default function QuestionsList() {
  const navigate = useNavigate();
  const [selectedLabel, setSelectedLabel] = useState("NONE");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleLabelChange = (event) => {
    setSelectedLabel(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    console.log("handle", event.target);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    setUsers(
      Array(60)
        .fill()
        .map(() => ({
          id: 11,
          label: "Java",
          title: "java문제 제목제목",
          solved: "X",
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
    navigate("/questionsdetail");
  };
  const clickQuestionCreate = () => {
    //redux에 세팅 or props
    navigate("/questionrequest");
  };

  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        <Box sx={{ minWidth: 120, mb: 4 }}>
          <FormControl sx={{ mr: 15, minWidth: 120 }} focused>
            <InputLabel id="demo-simple-select-standard-label">
              라벨 선택
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedLabel}
              onChange={handleLabelChange}
              defaultValue={"NONE"}
              label="라벨 선택"
            >
              <MenuItem value={"NONE"}>
                <em>선택 안함</em>
              </MenuItem>
              <MenuItem value={"OS"}>운영체제</MenuItem>
              <MenuItem value={"JAVA"}>자바</MenuItem>
              <MenuItem value={"DATASTRUCTURE"}>자료 구조</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ ml: 15 }}
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
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* <input type="text" value={search} onChange={onChange} /> */}
      </div>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Label</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Solved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, label, title, solved }, i) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="right">{id}</TableCell>
                  <TableCell align="right">{label}</TableCell>
                  <TableCell align="right" onClick={ClickTitle}>
                    {title}
                  </TableCell>
                  <TableCell align="right">{solved}</TableCell>
                </TableRow>
              ))}
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
      <Button onClick={clickQuestionCreate}>문제 만들기</Button>
    </div>
  );
}

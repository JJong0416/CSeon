import {
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

export default function WorkbookList() {
  const navigate = useNavigate();
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
    faker.seed(123);
    faker.locale = "ko";
    setUsers(
      Array(53)
        .fill()
        .map(() => ({
          id: 11,
          name: faker.name.lastName() + faker.name.firstName(),
          title: "XX의 문제집",
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
    navigate("/workbookdetail");
  };

  return (
    <div>
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
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, name, title, count }, i) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="right">{id}</TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right" onClick={ClickTitle}>
                    {title}
                  </TableCell>
                  <TableCell align="right">{count}</TableCell>
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
    </div>
  );
}

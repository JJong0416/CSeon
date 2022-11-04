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
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router";

export default function QuestionsList() {
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
    console.log({
      id: 11,
      name: faker.name.lastName() + faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    });
    setUsers(
      Array(53)
        .fill()
        .map(() => ({
          id: 11,
          name: faker.name.lastName() + faker.name.firstName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        }))
    );
  }, []);
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const ClickTitle = () => {
    //redux에 세팅 or props
    navigate("/questionsdetail");
  };

  return (
    <div>
      <div>
        <input type="text" value={search} onChange={onChange} />
      </div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map(({ id, name, email, phone }, i) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {page * rowsPerPage + i + 1}
                  </TableCell>
                  <TableCell align="right">{id}</TableCell>
                  <TableCell align="right" onClick={ClickTitle}>
                    {name}
                  </TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{phone}</TableCell>
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

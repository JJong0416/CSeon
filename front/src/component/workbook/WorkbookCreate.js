import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
export default function WorkbookCreate() {
  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        제목{" "}
        <TextField
          helperText="100자 이하로 작성해주세요."
          placeholder="문제집 제목을 작성해주세요."
          style={{ width: "70%" }}
        />{" "}
      </h1>
      <Box style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            float: "left",
            width: "50%",
            border: "1px solid black",
            margin: "4vh",
          }}
        >
          <TextField
            focused
            color="info"
            placeholder="문제 검색하기"
            id="outlined-start-adornment"
            sx={{ m: 4, width: "60vh" }}
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
        <div
          style={{
            float: "right",
            width: "50%",
            border: "1px solid black",
            margin: "4vh",
          }}
        >
          dsfasdfasdf
        </div>
      </Box>
    </Box>
  );
}

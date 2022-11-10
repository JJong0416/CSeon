import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
export default function ContestCreate() {
  const [value, setValue] = useState("");

  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        대회명{" "}
        <TextField
          helperText="25자 이하로 작성해주세요."
          placeholder="대회명을 작성해주세요."
          style={{ width: "70%" }}
        />{" "}
      </h1>

      <h1>
        시작 시간{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        종료 시간{" "}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
      </h1>
      <h1>
        문제집 번호
        <TextField
          placeholder="문제집 번호를 작성해주세요."
          style={{ width: "30%", margin: "0vh 0vh 0vh 1vh" }}
        />{" "}
      </h1>
      <Button variant="contained" size="large">
        만들기
      </Button>
    </Box>
  );
}

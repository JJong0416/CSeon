import { Divider } from "@mui/material";

export default function ContestDetail() {
  return (
    <div style={{ display: "block" }}>
      <div style={{ float: "left", width: "80%" }}>
        <h1>현중배 제 1회 싸피컵</h1>
      </div>
      <div style={{ float: "right", width: "20%" }}>
        <div>
          <h1>현재 순위표</h1>
          <Divider></Divider>
          <Divider></Divider>
          <Divider></Divider>
        </div>
      </div>
    </div>
  );
}

import { Box, Divider } from "@mui/material";
import "animate.css";
export default function RankComponent(props) {
  return (
    <div
      style={{ margin: "1vh 1vh 1vh 1vh" }}
      className="animate__animated animate__flipInX"
    >
      <img alt="" src="img/first.png" style={{ width: "10%" }}></img>
      {props.rankinfo.rank}
      <Divider></Divider>
    </div>
  );
}

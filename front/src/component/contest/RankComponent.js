import { Box, Divider } from "@mui/material";
import "animate.css";
export default function RankComponent(props) {
  return (
    <div
      style={{ margin: "1vh 1vh 1vh 1vh" }}
      className="animate__animated animate__flipInX"
    >
      {props.index == 0 ? (
        <img alt="" src="img/first.png" style={{ width: "10%" }}></img>
      ) : props.index == 1 ? (
        <img alt="" src="img/second.png" style={{ width: "10%" }}></img>
      ) : props.index == 2 ? (
        <img alt="" src="img/third.png" style={{ width: "10%" }}></img>
      ) : (
        <p>{props.index + 1}</p>
      )}
      {props.rankinfo.accountNickname} : {(parseInt)(props.rankinfo.accountScore)}{" "}
      {props.index}
      <Divider></Divider>
    </div>
  );
}

import { Box, Divider } from "@mui/material";
import "animate.css";
export default function RankComponent(props) {
  const myStyle = {
    border: "3px solid #64b5f6",
    margin: "1vh 1vh 1vh 1vh",
  };
  const defaultStyle = {
    backgroundColor: "white",
    margin: "1vh 1vh 1vh 1vh",
  };

  return (
    <div
      style={props.index === props.myrank ? myStyle : defaultStyle}
      className="animate__animated animate__flipInX"
    >
      {props.index === 0 ? (
        <img alt="" src="img/first.png" style={{ width: "10%" }}></img>
      ) : props.index === 1 ? (
        <img alt="" src="img/second.png" style={{ width: "10%" }}></img>
      ) : props.index === 2 ? (
        <img alt="" src="img/third.png" style={{ width: "10%" }}></img>
      ) : (
        <p>{props.index + 1}</p>
      )}
      {props.nickname} : {parseInt(props.score)} {props.index}
      <Divider></Divider>
    </div>
  );
}

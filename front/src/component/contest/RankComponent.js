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
        <h3>
          <img alt="" src="img/first.png" style={{ width: "10%" }}></img>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {props.nickname}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {parseInt(props.score)}
        </h3>
      ) : props.index === 1 ? (
        <h3>
          <img alt="" src="img/second.png" style={{ width: "10%" }}></img>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {props.nickname}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {parseInt(props.score)}
        </h3>
      ) : props.index === 2 ? (
        <h3>
          <img alt="" src="img/third.png" style={{ width: "10%" }}></img>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {props.nickname}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {parseInt(props.score)}
        </h3>
      ) : (
        <h3>
          {props.index + 1}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {props.nickname}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
          {parseInt(props.score)}
        </h3>
      )}
      <Divider></Divider>
    </div>
  );
}

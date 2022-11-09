import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function AnswerForm(props) {
  const clickedButtonStyle = {
    textColor: "white",
    backgroundColor: "#90caf9",
    margin: "0vh 5vh 5vh 5vh",
  };

  const buttonStyle = {
    textColor: "black",
    backgroundColor: "white",
    margin: "0vh 5vh 5vh 5vh",
  };
  const { icon, content, isSelected, handleClick, elementIndex } = props;
  const Token = useSelector((state) => state.AccountInfo.accessToken);

  return (
    <Grid xs={6} sx={{ mt: 5 }} style={{ textAlign: "center" }}>
      <Card
        style={isSelected ? clickedButtonStyle : buttonStyle}
        onClick={() => handleClick(elementIndex)}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {elementIndex + 1} 번
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* <TextField
              style={{ width: "100%" }}
              id="standard-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              placeholder="보기를 작성해주세요."
              variant="standard"
            /> */}
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              placeholder="보기를 작성해주세요."
              multiline
              rows={4}
            />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

import styled from "@emotion/styled";
import { Button, Card, CardContent, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RegistRequestQuestion } from "../../api/accountquestion";
import { getLabels } from "../../api/label";

export default function QuestionRequest() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const [title, setTitle] = useState("");
  const [answer0, setAnswer0] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(-1);
  const [explain, setExplain] = useState("");
  const [labels, setLables] = useState([]);
  const [selectedlabels, setSelectedlabels] = useState([]);

  useEffect(() => {
    getLabels(
      token,
      (res) => {
        setLables(res.data.split(", "));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handleClick = (idx) => {
    const newArr = Array(4).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setRightAnswer(idx);
  };
  const ClickRegisterRequest = () => {
    let questionRequestReq = {
      // questionId : ,
      questionTitle: title,
      questionExp: explain,
      answers: [answer0, answer1, answer2, answer3],
      rightAnswer: rightAnswer,
      // accountId: ,
      labels: selectedlabels,
    };
    if (rightAnswer === -1) {
      alert("정답 체크해주세요");
    } else {
      RegistRequestQuestion(
        questionRequestReq,
        token,
        (res) => {
          alert("등록 요청 성공!");
          navigate("/questionslist");
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  const AnswerForm = () => {
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
    const OnChangeAnswer = (e, i) => {
      console.log(e.target.value, i);
      if (i === 0) setAnswer0(e.target.value);
      else if (i === 1) setAnswer1(e.target.value);
      else if (i === 2) setAnswer2(e.target.value);
      else setAnswer3(e.target.value);
    };
    const result = [];

    for (let i = 0; i < 4; i++) {
      result.push(
        <Grid xs={6} sx={{ mt: 5 }} style={{ textAlign: "center" }}>
          <Card
            style={isCategorySelect[i] ? clickedButtonStyle : buttonStyle}
            onClick={() => handleClick(i)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {i + 1} 번
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-multiline-static"
                  placeholder="보기를 작성해주세요."
                  multiline
                  rows={4}
                  onChange={(e) => OnChangeAnswer(e, i)}
                />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    }
    return result;
  };
  // 체크박스 단일 선택
  const handleSingleCheck = (checked, label) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setSelectedlabels((prev) => [...prev, label]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setSelectedlabels(selectedlabels.filter((el) => el !== label));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 selectedlabels 상태 업데이트
      const idArray = [];
      labels.forEach((label) => idArray.push(label));
      setSelectedlabels(idArray);
    } else {
      // 전체 선택 해제 시 selectedlabels 를 빈 배열로 상태 업데이트
      setSelectedlabels([]);
    }
  };

  return (
    <Box style={{ width: "100%", marginTop: "3vh" }}>
      <h1 style={{ wordBreak: "break-all" }}>
        Q.{" "}
        <TextField
          helperText="100자 이하로 작성해주세요."
          placeholder="질문을 작성해주세요."
          style={{ width: "70%" }}
          id="outlined-multiline-static"
          multiline
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </h1>
      <h3>정답을 눌러주세요.</h3>
      <Grid style={{ textAlign: "center" }} container rowSpacing={1}>
        {AnswerForm()}
      </Grid>
      <Divider></Divider> <Divider></Divider>
      <h1>해설</h1>
      <TextField
        style={{ width: "90%", marginBottom: "4vh" }}
        id="outlined-multiline-static"
        placeholder="해설을 작성해주세요."
        multiline
        onChange={(e) => setExplain(e.target.value)}
      />
      <div style={{ marginBottom: "4vh" }}>
        <Button
          size="large"
          variant="contained"
          style={{ backgroundColor: "#64b5f6" }}
          onClick={ClickRegisterRequest}
        >
          등록 요청
        </Button>
      </div>
    </Box>
  );
}

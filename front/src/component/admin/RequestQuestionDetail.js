import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getRequestQuestion, AdoptRequestQuestion } from "../../api/admin";
import { getLabels } from "../../api/label";

const StyledTable = styled.table`
  text-align: center;
  border-collapse: collapse;
  thead {
    tr {
      th {
        padding: 10px 15px;
        background-color: #888;
        color: #fff;
        font-weight: 700;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 7px 15px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .second-row {
    width: 150px;
  }
`;

export default function RequestQuestionDetail() {
  const navigate = useNavigate();
  const requestquestionId = useSelector(
    (state) => state.QuestionInfo.requestquestionId
  );
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const [questionId, setQuestionId] = useState("");
  const [title, setTitle] = useState("");
  const [answer0, setAnswer0] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [explain, setExplain] = useState("");
  const [creator, setCreator] = useState("");
  const [labels, setLables] = useState([]);
  const [selectedlabels, setSelectedlabels] = useState([]);

  const handleClick = (idx) => {
    const newArr = Array(4).fill(false);
    newArr[idx] = true;
    setIsCategorySelect(newArr);
    setRightAnswer(idx);
  };
  const ClickRegisterRequest = () => {
    console.log("등록");
    // axios 호출해서 DB에 저장(2022.11.08)
    let requestQuestionInfo = {
      questionId: questionId,
      questionTitle: title,
      questionExp: explain,
      answers: [answer0, answer1, answer2, answer3],
      rightAnswer: rightAnswer,
      accountId: creator,
      labels: selectedlabels,
    };
    console.log("requestQuestionInfo : ", requestQuestionInfo);
    AdoptRequestQuestion(
      requestQuestionInfo,
      token,
      (res) => {
        alert("등록 성공")
        console.log("AdoptRequestQuestion res.data: ", res.data);
        navigate("/requestquestionlist");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const AnswerForm = () => {
    console.log("AnswerForm");
    const clickedButtonStyle = {
      textColor: "white",
      backgroundColor: "#64b5f6",
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
                  value={
                    i === 0
                      ? answer0
                      : i === 1
                      ? answer1
                      : i === 2
                      ? answer2
                      : answer3
                  }
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
  useEffect(() => {
    getLabels(
      token,
      (res) => {
        console.log("GetLabels res.data: ", res.data);
        setLables(res.data.split(", "));
      },
      (err) => {
        console.log(err);
      }
    );
    getRequestQuestion(
      requestquestionId,
      token,
      (res) => {
        console.log("getRequestQuestion res.data: ", res.data);
        setQuestionId(res.data.responseDto.questionId);
        setTitle(res.data.responseDto.questionTitle);
        setExplain(res.data.responseDto.questionExp);
        setAnswer0(res.data.responseDto.answerRes.answers[0]);
        setAnswer1(res.data.responseDto.answerRes.answers[1]);
        setAnswer2(res.data.responseDto.answerRes.answers[2]);
        setAnswer3(res.data.responseDto.answerRes.answers[3]);
        setRightAnswer(res.data.responseDto.answerRes.rightAnswer);
        setCreator(res.data.responseDto.accountId);
        // setLables(res.data.responseDto.labels);
        const newArr = Array(4).fill(false);
        newArr[res.data.responseDto.answerRes.rightAnswer] = true;
        setIsCategorySelect(newArr);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
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
          placeholder="질문을 작성해주세요."
          multiline
          style={{ width: "70%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
      </h1>
      <h4>정답을 눌러주세요.</h4>
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
        rows={4}
        value={explain}
        onChange={(e) => setExplain(e.target.value)}
      />
      <StyledTable
        style={{ width: "60%", margin: "auto", border: "1px solid #64b5f6" }}
      >
        <thead>
          <tr>
            <th
              style={{
                width: "10%",
                fontSize: "2.5vh",
                backgroundColor: "#64b5f6",
              }}
            >
              <input
                type="checkbox"
                name="select-all"
                onChange={(e) => handleAllCheck(e.target.checked)}
                // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                checked={selectedlabels.length === labels.length ? true : false}
              />
            </th>
            <th style={{ fontSize: "2.5vh", backgroundColor: "#64b5f6" }}>
              라벨 목록
            </th>
          </tr>
        </thead>
        <tbody>
          {labels?.map((label, key) => (
            <tr key={key}>
              <td style={{ border: "1px solid #64b5f6" }}>
                <input
                  type="checkbox"
                  name={`select-${label}`}
                  onChange={(e) => handleSingleCheck(e.target.checked, label)}
                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                  checked={selectedlabels.includes(label) ? true : false}
                />
              </td>
              <td
                className="second-row"
                style={{ fontSize: "2vh", border: "1px solid #64b5f6" }}
              >
                {" "}
                {label}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <div style={{ margin: "4vh" }}>
        <Button
          size="large"
          variant="contained"
          style={{ backgroundColor: "#64b5f6" }}
          onClick={ClickRegisterRequest}
        >
          등록
        </Button>
      </div>
    </Box>
  );
}

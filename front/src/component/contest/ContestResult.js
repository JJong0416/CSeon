import RankComponent from "./RankComponent";
import { getContestResult } from "../../api/contest";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_WORKBOOK_INDEX } from "../../redux/WorkbookInfo";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
export default function ContestResult() {
  const contestId = useSelector((state) => state.ContestInfo.contestId);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const dispatch = new useDispatch();
  const navigate = useNavigate();
  const [workbookId, setWorkbookId] = useState(1);
  const [ranking, setRanking] = useState([]);
  const [myRank, setMyRank] = useState({});
  const [contestName, setContestName] = useState("");
  const accountName = useSelector((state) => state.AccountInfo.accountInfo.accountName);
  const goWorkbookDetail = () => {
    dispatch(SET_WORKBOOK_INDEX(workbookId));
    navigate("/workbookdetail");
  };
  useEffect(() => {
    getContestResult(
      contestId,
      Token,
      (res) => {
        setWorkbookId(res.data.workbookId);
        setRanking(res.data.contestInfoRes.highRanking);
        setMyRank(res.data.contestInfoRes.contestMyRankingRes);
        setContestName(res.data.contestName);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        <h1
          style={{
            wordBreak: "break-all",
            marginBottom: "0px",
          }}
        >
          <img alt="" src="img/trophy.png" style={{ width: "3%", marginRight: "3vh" }}></img>
          {contestName}
          <img alt="" src="img/trophy.png" style={{ width: "3%", marginLeft: "3vh" }}></img>
        </h1>
        <h1>대회 결과</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", float: "left" }}></div>{" "}
        <div style={{ width: "50%", float: "right" }}>
          <h4 style={{ marginRight: "4vh" }} onClick={goWorkbookDetail}>
            <Button
              variant="text"
              style={{
                color: "#64b5f6",
                fontSize: "2vh",
                fontFamily: "GangwonEdu_OTFBoldA",
              }}
            >
              문제집 보기
            </Button>
          </h4>
        </div>
      </div>
      <div style={{ width: "30%", margin: "auto" }}>
        {ranking.map((rank, i) =>
          rank.accountScore !== 0 ? (
            <RankComponent
              key={Math.random()}
              nickname={rank.accountNickname}
              score={rank.accountScore}
              myrank={myRank.myRank}
              index={i}
            ></RankComponent>
          ) : null
        )}

        {myRank.accountScore !== 0 ? (
          myRank.isExistMeInLeaderboard === true ? null : (
            <div>
              .<br></br>.<br></br>.<br></br>
              <RankComponent
                key={Math.random()}
                nickname={accountName}
                score={myRank.myScore}
                myrank={myRank.myRank}
                index={myRank.myRank}
              ></RankComponent>
              <br></br>.<br></br>.<br></br>.
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

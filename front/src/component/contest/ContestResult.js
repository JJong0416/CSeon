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
  const accountName = useSelector(
    (state) => state.AccountInfo.accountInfo.accountName
  );
  const goWorkbookDetail = () => {
    dispatch(SET_WORKBOOK_INDEX(workbookId));
    navigate("/workbookdetail");
  };
  useEffect(() => {
    getContestResult(
      contestId,
      Token,
      (res) => {
        console.log("", res.data);
        setWorkbookId(res.data.workbookId);
        console.log("getContestRanking res.data: ", res.data);
        let arr = [...res.data.contestInfoRes.highRanking];
        arr.push({ accountNickname: "경준", accountScore: 14.8734 });
        arr.push(res.data.contestInfoRes.highRanking[0]);
        arr.push(res.data.contestInfoRes.highRanking[0]);
        arr.push(res.data.contestInfoRes.highRanking[0]);
        arr.push(res.data.contestInfoRes.highRanking[0]);
        arr.push(res.data.contestInfoRes.highRanking[0]);
        setRanking(arr);

        setMyRank(res.data.contestInfoRes.contestMyRankingRes);

        console.log(arr);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <div style={{ marginTop: "3vh" }}>
        {/* <input type="text" value={search} onChange={onChange} /> */}
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
      <div style={{ width: "60%", margin: "auto" }}>
        {ranking.map((rank, i) => (
          // <h1 className="animate__animated animate__flipInX">{user.rank}</h1>
          <RankComponent
            key={Math.random()}
            nickname={rank.accountNickname}
            score={rank.accountScore}
            myrank={myRank.myRank}
            index={i}
          ></RankComponent>
        ))}
        {myRank.isExistMeInLeaderboard === true ? null : (
          <div>
            ...
            <RankComponent
              key={Math.random()}
              nickname={accountName}
              score={myRank.myScore}
              myrank={myRank.myRank}
              index={myRank.myRank}
            ></RankComponent>
            ...
          </div>
        )}
      </div>
    </div>
  );
}

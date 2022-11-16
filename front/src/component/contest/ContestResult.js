import RankComponent from "./RankComponent";
import { getContestResult } from "../../api/contest";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_WORKBOOK_INDEX } from "../../redux/WorkbookInfo";
import { useNavigate } from "react-router";
export default function ContestResult() {
  const contestId = useSelector((state) => state.ContestInfo.contestId);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const dispatch = new useDispatch();
  const navigate = useNavigate();
  const [highRanking, setHighRanking] = useState();
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
      <h2>대회 결과보기</h2>
      <h4 onClick={goWorkbookDetail}>문제집 보기</h4>
      <div style={{ width: "40%", margin: "auto" }}>
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
            ...{" "}
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

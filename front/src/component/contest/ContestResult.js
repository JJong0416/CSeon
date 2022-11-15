import RankComponent from "./RankComponent";
import { getContestResult } from "../../api/contest";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function ContestResult() {
  const contestId = useSelector((state) => state.ContestInfo.contestId);
  const Token = useSelector((state) => state.AccountInfo.accessToken);
  const [highRanking, setHighRanking] = useState();
  const [ranking, setRanking] = useState([
    { rank: 0 },
    { rank: 1 },
    { rank: 2 },
    { rank: 3 },
    { rank: 4 },
    { rank: 5 },
    { rank: 6 },
    { rank: 7 },
    { rank: 8 },
    { rank: 9 },
  ]);
  useEffect(() => {
    getContestResult(
      contestId,
      Token,
      (res) => {
        console.log("", res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <h2>대회 결과보기</h2>
      <h4>문제집 보기</h4>
      <div style={{ width: "40%", margin: "auto" }}>
        {ranking.map((rank) => (
          // <h1 className="animate__animated animate__flipInX">{user.rank}</h1>
          <RankComponent key={Math.random()} rankinfo={rank}></RankComponent>
        ))}
      </div>
    </div>
  );
}

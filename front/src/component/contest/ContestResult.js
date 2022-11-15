import RankComponent from "./RankComponent";

export default function ContestResult() {
  return (
    <div>
      <h2>대회 결과보기</h2>
      <h4>문제집 보기</h4>
      <div style={{ width: "40%", margin: "auto" }}>
        <RankComponent></RankComponent>
      </div>
    </div>
  );
}

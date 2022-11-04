import { useNavigate } from "react-router";

export default function WorkbookList() {
  const navigate = useNavigate();

  const ClickQuestionDetail = () => {
    navigate("/workbookdetail");
  };

  return (
    <div>
      {" "}
      <button onClick={ClickQuestionDetail}>풀기</button>
    </div>
  );
}

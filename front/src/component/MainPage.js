import { useNavigate } from "react-router";
import { useSelector } from "react-redux/es/exports";


export default function MainPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.UserInfo.accessToken); // redux 상태관리
  console.log(sessionStorage.getItem("token"));

  const Logout = () =>{
    // session 비우기
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <div>
      <h2>MainPage</h2>
      <button onClick={Logout}>Logout</button>
      <h2>Token : {token}</h2>
    </div>
  );
}

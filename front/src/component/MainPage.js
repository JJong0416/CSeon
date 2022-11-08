import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";

export default function MainPage() {
  const token = useSelector((state) => state.UserInfo.accessToken); // redux 상태관리

  useEffect(() => {
    console.log("token:", token);
    // getProfile();
  }, []);
  return (
    <div>
      <h2>MainPage</h2>
      <h2>메인 사진 띄울 예정</h2>
      <img src="메인로고.png"></img>
    </div>
  );
}

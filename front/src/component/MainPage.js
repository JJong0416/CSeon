import { useNavigate } from "react-router";
import { useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";


export default function MainPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.UserInfo.accessToken); // redux 상태관리
  console.log(sessionStorage.getItem("token"));
  
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };
  const Logout = () =>{
    // session 비우기
    sessionStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>MainPage</h2>
      <button onClick={Logout}>Logout</button>
      <h2>Token : {token}</h2>
      <h2>{user_id}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage}></img>
    </div>
  );
}

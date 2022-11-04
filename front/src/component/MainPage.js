import { useNavigate } from "react-router";
import { useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import axios from "axios";
import { apitest } from "../api/user";
import { SET_LOGOUT } from "../redux/UserInfo";

export default function MainPage() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.UserInfo.accessToken); // redux 상태관리

  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  // const getProfile = async () => {
  //   try {
  //     // Kakao SDK API를 이용해 사용자 정보 획득
  //     let data = await window.Kakao.API.request({
  //       url: "/v2/user/me",
  //     });
  //     // 사용자 정보 변수에 저장
  //     setUserId(data.id);
  //     setNickName(data.properties.nickname);
  //     setProfileImage(data.properties.profile_image);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    console.log("token:", token);
    apitest(
      token,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    // getProfile();
  }, []);
  return (
    <div>
      <h2>MainPage</h2>
      <h2>Token : {token}</h2>
      <h2>{user_id}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage}></img>
    </div>
  );
}

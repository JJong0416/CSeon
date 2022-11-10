import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserProfile } from "../api/user";

export default function MyPage() {
  const token = useSelector((state)=>state.UserInfo.accessToken);

  useEffect(() => {
    console.log("Mypage render..");
    getUserProfile(
      token,
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  });
  return <div>Mypage</div>;
}

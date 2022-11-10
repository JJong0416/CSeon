import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { getUserType } from "../api/accountinfo";
import { SET_ACCOUNT_INFO } from "../redux/AccountInfo";
import { useDispatch } from "react-redux";
export default function MainPage() {
  const token = useSelector((state) => state.AccountInfo.accessToken); // redux 상태관리
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("mainpage render..");
    getUserType(
      token,
      (res) => {
        console.log("getUserType res.data: ",res.data);
        dispatch(SET_ACCOUNT_INFO(res.data));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      <h2>MainPage</h2>
      <h2>메인 사진 띄울 예정</h2>
      <img src={require("../assets/메인로고2.png")}></img>
    </div>
  );
}

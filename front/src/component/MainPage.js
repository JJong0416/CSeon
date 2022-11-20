import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { getUserType } from "../api/accountinfo";
import { SET_ACCOUNT_INFO } from "../redux/AccountInfo";
import { useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
export default function MainPage() {
  const token = useSelector((state) => state.AccountInfo.accessToken);
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    getUserType(
      token,
      (res) => {
        dispatch(SET_ACCOUNT_INFO(res.data));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  return (
    <div>
      {" "}
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        <img src={require("../assets/메인이미지.jpg")} width="80%"></img>
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        style={{ height: "25vh" }}
      >
        <img src={require("../assets/시선이답.png")} width="50%"></img>
      </div>
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        {" "}
        <img src={require("../assets/만나보세요.png")} width="40%"></img>
      </div>
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        {" "}
        <img src={require("../assets/문제리스트피피티.png")} width="70%"></img>
      </div>{" "}
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        {" "}
        <img src={require("../assets/원쏙.png")} width="25%"></img>
      </div>{" "}
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        {" "}
        <img src={require("../assets/재쏙.png")} width="30%"></img>
      </div>{" "}
      <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
        {" "}
        <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
          {" "}
          <img src={require("../assets/문제풀이화면.PNG")} width="70%"></img>
        </div>{" "}
        <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
          {" "}
          <img src={require("../assets/실시간대횡ㅇ.png")} width="40%"></img>
        </div>{" "}
        <div
          style={{ marginBottom: "8vh" }}
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
        >
          {" "}
          <img src={require("../assets/실시간대회.png")} width="70%"></img>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

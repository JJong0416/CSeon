import { useSelector } from "react-redux/es/exports";
import { useEffect } from "react";
import { getUserType } from "../api/accountinfo";
import { SET_ACCOUNT_INFO } from "../redux/AccountInfo";
import { useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
export default function MainPage() {
  const token = useSelector((state) => state.AccountInfo.accessToken); // redux 상태관리
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init();
    console.log("mainpage render..");
    getUserType(
      token,
      (res) => {
        console.log("getUserType res.data: ", res.data);
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
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        style={{ height: "50vh" }}
      >
        <img src={require("../assets/아저씨.png")}></img>
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        style={{ height: "25vh" }}
      >
        <img src={require("../assets/시선이답.png")}></img>
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {" "}
        <img src={require("../assets/만나보세요.png")}></img>
      </div>
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {" "}
        <img src={require("../assets/문제리스트피피티.png")}></img>
      </div>{" "}
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {" "}
        <img src={require("../assets/원쏙.png")}></img>
      </div>{" "}
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {" "}
        <img src={require("../assets/재쏙.png")}></img>
      </div>{" "}
      <div
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {" "}
        <img src={require("../assets/재쏙.png")}></img>
      </div>
    </div>
  );
}

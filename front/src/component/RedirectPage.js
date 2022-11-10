import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { SET_LOGIN, SET_TOKEN } from "../redux/AccountInfo";
import { useDispatch } from "react-redux";

function RedirectPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.search);
  const CODE = location.search.split("code=")[1];
  // let code = new URL(window.location.href).searchParams.get("code");

  const sendCode = () => {
    console.log("카카오 로그인 실행");
    axios({
      method: "get",
      url: `/api/login/kakao/${CODE}`,
    })
      .then((res) => {
        // 토큰, 유저정보 받아오기(미완 백엔드 수정(AuthController))
        // localStorage.setItem("token", res.data.token);
        dispatch(SET_LOGIN());
        dispatch(SET_TOKEN(res.data.token));
        console.log(res.data);
        navigate("/mainpage");
      })
      .catch((err) => {
        console.error(err);
        alert("kakao login 실패");
        navigate("/");
      });
  };
  useEffect(() => {
    console.log("rendering");
    sendCode();
  }, []);
  return <></>;
}
export default RedirectPage;

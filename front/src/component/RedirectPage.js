import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

function RedirectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const CODE = location.search.split("code=")[1];
  
  // let code = new URL(window.location.href).searchParams.get("code");
  const sendCode = () => {
    axios({
      method: "get",
      url: `/api/login/kakao/${CODE}`,
    })
      .then((res) => {
        // 토큰, 유저정보 받아오기(미완 백엔드 수정(AuthController))
        sessionStorage.setItem("token", res.data.token);
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

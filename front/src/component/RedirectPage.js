import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

function RedirectPage() {
  const location = useLocation();
  const CODE = location.search.split("=")[1];
  const sendCode = () => {
    axios({
      method: "get",
      url: `http://localhost:7070/kakao/${CODE}`,
    })
      .then(function (res) {
        sessionStorage.setItem("token", res.data);
        console.log(res.data);
        window.location.replace("/");
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  useEffect(() => {
    sendCode();
  }, []);
  return <></>;
}
export default RedirectPage;

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

function RedirectPage() {
  const location = useLocation();
  const CODE = location.search.split("code=")[1];
  const sendCode = () => {
    axios({
      method: "get",
      url: `/api/login/kakao/${CODE}`,
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
    console.log(location.search);
    console.log(CODE);
  }, []);
  return (
    <div>
      <button onClick={sendCode}> btn</button>
    </div>
  );
}
export default RedirectPage;

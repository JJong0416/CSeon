import { useEffect } from "react";

import "../App.css";
export default function LoginPage() {
  const ClickLoginBtn = () => {
    window.location.replace(
      "https://kauth.kakao.com/oauth/authorize?client_id=237be15b2e18e8a188bff253550e714c&redirect_uri=https://k7a606.p.ssafy.io/oauth/redirect&response_type=code"
    );
  };

  return (
    <div className="main-container">
      <div className="left">
        <div>
          <img
            alt="카카오로그인"
            style={{ width: "130%" }}
            src={require("../assets/kakao_login_medium_narrow.png")}
            onClick={ClickLoginBtn}
          ></img>
        </div>
      </div>
      <div className="right">
        <div>
          <img
            alt="메인 로고"
            style={{ width: "80%" }}
            src={require("../assets/메인로고.png")}
          ></img>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0); // 변하면 재렌더링되는 변수들

  const ClickLoginBtn = () => {
    // navigate("/mainpage");
    window.location.replace(
      "https://kauth.kakao.com/oauth/authorize?client_id=237be15b2e18e8a188bff253550e714c&redirect_uri=http://localhost:3000/oauth/redirect&response_type=code"
    );
  };
  const ClickPlus = () => {
    setValue(value + 1); // useState로 선언된 변수들은 변하면 자동으로 re-rendering됨
  };

  useEffect(() => {
    // [] 안에 들어가 있는게 변경되면 실행(re-rendering), 처음에도 실행(created)
    console.log("rendering start..");
  }, []);
  return (
    <div>
      <button onClick={ClickLoginBtn}>Login Btn</button>
      <button onClick={ClickPlus}>{value}</button>
    </div>
  );
}

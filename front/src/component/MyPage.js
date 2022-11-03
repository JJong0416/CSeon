import { useEffect } from "react";

export default function MyPage() {

  useEffect(()=>{
    
    console.log("Mypage render..");
  });
  return <div>Mypage</div>;
}

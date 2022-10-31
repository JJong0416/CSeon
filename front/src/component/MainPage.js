export default function MainPage() {
  console.log(sessionStorage.getItem("token"));
  return <h2>MainPage</h2>;
}

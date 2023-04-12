import Navbarre from "../components/Navbar";
import "../styles/home.scss";
import Calendar from "../components/Calendar";

function Home() {

  return (
    <div className="app">
      <Navbarre />
      <Calendar></Calendar>
     
    </div>
  );
}
export default Home;

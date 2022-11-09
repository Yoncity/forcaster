import "./index.scss";
import logo from "../../assets/logo.svg";

type Props = {
  setShowCreateForcast: any;
  setShowMyForcasts: any;
};
function Home({ setShowCreateForcast, setShowMyForcasts }: Props) {
  return (
    <div className="home_container">
      <div className="home_container__wrapper">
        <img src={logo} alt="Forcaster Logo" />
        <div className="home_container__wrapper__content">
          <p className="home_container__wrapper__content__description">
            Create forcasts for anything and see how they fare against the real
            world. Your forcasts are also saved so you don't lose them 😉.
          </p>
          <div className="home_container__wrapper__content__actions">
            <button
              className="button primary"
              onClick={() => setShowCreateForcast(true)}
            >
              New Forcast
            </button>
            <button
              className="button secondary"
              onClick={() => setShowMyForcasts(true)}
            >
              My Forcasts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

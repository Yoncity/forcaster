import "./index.scss";
import { Forcast } from "../../types/shared";
import left from "../../assets/left.png";
import BarChart from "../../components/BarChart";

type Props = {
  show: boolean;
  setShow: any;
  forcast: Forcast;
  setShowEditForcast: any;
};

function ViewForcast({ show, setShow, forcast, setShowEditForcast }: Props) {
  return (
    <div
      className={`view_forcast_container ${
        show ? "show_view_forcast" : "hide_view_forcast"
      }`}
    >
      <div className="view_forcast_container__header">
        <div className="view_forcast_container__header__nav">
          <img
            src={left}
            className="view_forcast_container__header__nav__back"
            alt="Back navigation icon"
            onClick={() => setShow(false)}
          />
          <p className="view_forcast_container__header__nav__title">
            My Forcasts
          </p>
        </div>

        <div className="view_forcast_container__header__actions">
          <button
            className="button primary"
            onClick={() => setShowEditForcast(true)}
          >
            Edit
          </button>
        </div>
      </div>
      <div className="view_forcast_container__content">
        <BarChart forcast={forcast} height={500} />
      </div>
    </div>
  );
}

export default ViewForcast;

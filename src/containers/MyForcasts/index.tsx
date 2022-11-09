import { useEffect, useState } from "react";
import "./index.scss";
import { Forcast } from "../../types/shared";
import logo from "../../assets/logo.svg";
import left from "../../assets/left.png";
import { getForcasts } from "../../helpers/storage";
import dayjs from "dayjs";

type Props = {
  show: boolean;
  setShow: any;
  showForcastInDetails: any;
};

function MyForcasts({ show, setShow, showForcastInDetails }: Props) {
  const [myForcasts, setMyForcasts] = useState<Array<Forcast>>([]);

  useEffect(() => {
    const fetchForcasts = async () => {
      const existingForcasts = await getForcasts();

      const parsed: Array<Forcast> = existingForcasts
        ? JSON.parse(existingForcasts)
        : [];

      setMyForcasts(parsed);
    };

    fetchForcasts();
  }, [show]);

  return (
    <div
      className={`my_forcasts_container ${
        show ? "show_my_forcasts" : "hide_my_forcasts"
      }`}
    >
      <div className="my_forcasts_container__header">
        <div className="my_forcasts_container__header__nav">
          <img
            src={left}
            className="my_forcasts_container__header__nav__back"
            alt="Back navigation icon"
            onClick={() => setShow(false)}
          />
          <img
            src={logo}
            className="my_forcasts_container__header__nav__title"
            alt="Forcaster Logo"
          />
        </div>
      </div>

      <div className="my_forcasts_container__content">
        <p className="my_forcasts_container__content__title">My Forcasts</p>

        {myForcasts.length === 0 && (
          <div className="div my_forcasts_container__content__no_forcasts">
            You don't have any forcasts
          </div>
        )}

        <div className="my_forcasts_container__content__rows">
          {myForcasts.map((item, i) => (
            <div
              key={`${item.id}_${i}`}
              className="my_forcasts_container__content__rows__item"
              onClick={() => showForcastInDetails(item)}
            >
              <div className="my_forcasts_container__content__rows__item__preview"></div>
              <div className="my_forcasts_container__content__rows__item__details">
                <p className="my_forcasts_container__content__rows__item__details__title">
                  {item.details.forcastTitle}
                </p>
                <p className="my_forcasts_container__content__rows__item__details__date">
                  {dayjs(item.date).format("DD MMM, YYYY")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyForcasts;

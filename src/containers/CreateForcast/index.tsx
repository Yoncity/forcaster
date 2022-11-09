import { useState } from "react";
import "./index.scss";
import Canvas from "../../components/Canvas";
import { Cordinates, Forcast, ForcastDetails } from "../../types/shared";
import logo from "../../assets/logo.svg";
import left from "../../assets/left.png";
import { addForcast, getForcasts } from "../../helpers/storage";
import dayjs from "dayjs";

type Props = {
  show: boolean;
  setShow: any;
};
function CreateForcast({ show, setShow }: Props) {
  const [predictions, setPredictions] = useState<Array<Cordinates>>([]);

  const [forcastDetails, setForcastDetails] = useState<ForcastDetails>({
    forcastTitle: "",
    xTitle: "",
    yTitle: "",
  });

  const [clearForcast, setClearForcast] = useState(false);

  const handleClear = () => {
    setClearForcast(true);
    setTimeout(() => {
      setClearForcast(false);
    }, 500);
  };

  const handleInput = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setForcastDetails({ ...forcastDetails, [name]: value });
  };

  const handleForcastSave = async () => {
    const existingForcasts = await getForcasts();

    const parsed: Array<Forcast> = existingForcasts
      ? JSON.parse(existingForcasts)
      : [];

    const forcast: Forcast = {
      details: {
        forcastTitle: forcastDetails.forcastTitle || "Untitled",
        xTitle: forcastDetails.xTitle || "Untitled",
        yTitle: forcastDetails.yTitle || "Untitled",
      },
      data: predictions,
      date: dayjs().format("YYYY-MM-DD"),
      id: parsed.length + 1,
    };

    parsed.push(forcast);

    await addForcast(JSON.stringify(parsed));

    resetCreateCanvasPage();
  };

  const resetCreateCanvasPage = () => {
    handleClear();
    setForcastDetails({ forcastTitle: "", xTitle: "", yTitle: "" });
  };

  return (
    <div
      className={`create_forcast_container ${
        show ? "show_create_forcast" : "hide_create_forcast"
      }`}
    >
      <div className="create_forcast_container__header">
        <div className="create_forcast_container__header__nav">
          <img
            src={left}
            className="create_forcast_container__header__nav__back"
            alt="Back navigation icon"
            onClick={() => setShow(false)}
          />
          <img
            src={logo}
            className="create_forcast_container__header__nav__title"
            alt="Forcaster Logo"
          />
        </div>

        <div className="create_forcast_container__header__actions">
          <button className="button danger" onClick={handleClear}>
            Clear
          </button>
          <button className="button primary" onClick={handleForcastSave}>
            Save
          </button>
        </div>
      </div>
      <div className="create_forcast_container__content">
        <Canvas
          predictions={predictions}
          setPredictions={setPredictions}
          clear={clearForcast}
          forcastDetails={forcastDetails}
          handleInput={handleInput}
        />
      </div>
    </div>
  );
}

export default CreateForcast;

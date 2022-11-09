import { useEffect, useState } from "react";
import "./index.scss";
import Canvas from "../../components/Canvas";
import { Cordinates, Forcast, ForcastDetails } from "../../types/shared";
import left from "../../assets/left.png";
import { addForcast, getForcasts } from "../../helpers/storage";
import dayjs from "dayjs";

type Props = {
  show: boolean;
  setShow: any;
  forcast: Forcast;
  setCurrentForcast: any;
};
function EditForcast({ show, setShow, forcast, setCurrentForcast }: Props) {
  const [predictions, setPredictions] = useState<Array<Cordinates>>([
    ...forcast.data,
  ]);

  const [forcastDetails, setForcastDetails] = useState<ForcastDetails>({
    ...forcast.details,
  });

  const handleInput = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    setForcastDetails({ ...forcastDetails, [name]: value });
  };

  const handleForcastUpdate = async () => {
    const existingForcasts = await getForcasts();

    const parsed: Array<Forcast> = existingForcasts
      ? JSON.parse(existingForcasts)
      : [];

    const updatedForcast: Forcast = {
      ...forcast,
      details: forcastDetails,
      data: predictions,
      date: dayjs().format("YYYY-MM-DD"),
    };

    const forcastIndex = parsed.findIndex((p) => p.id === forcast.id);

    if (forcastIndex === -1) return;

    parsed[forcastIndex] = updatedForcast;

    await addForcast(JSON.stringify(parsed));

    setCurrentForcast(updatedForcast);

    alert("Forcast updated successfully.");
  };

  const resetCreateCanvasPage = () => {
    setPredictions([...forcast.data]);
    setForcastDetails({
      ...forcast.details,
    });
  };

  useEffect(() => {
    setPredictions([...forcast.data]);
    setForcastDetails({
      ...forcast.details,
    });
  }, [forcast]);

  return (
    <div
      className={`edit_forcast_container ${
        show ? "show_edit_forcast" : "hide_edit_forcast"
      }`}
    >
      <div className="edit_forcast_container__header">
        <div className="edit_forcast_container__header__nav">
          <img
            src={left}
            className="edit_forcast_container__header__nav__back"
            alt="Back navigation icon"
            onClick={() => setShow(false)}
          />
          <p className="edit_forcast_container__header__nav__title">Back</p>
        </div>

        <div className="edit_forcast_container__header__actions">
          <button className="button" onClick={resetCreateCanvasPage}>
            Reset
          </button>
          <button className="button primary" onClick={handleForcastUpdate}>
            Update
          </button>
        </div>
      </div>
      <div className="edit_forcast_container__content">
        <Canvas
          predictions={predictions}
          setPredictions={setPredictions}
          clear={false}
          forcastDetails={forcastDetails}
          handleInput={handleInput}
          edit
        />
      </div>
    </div>
  );
}

export default EditForcast;

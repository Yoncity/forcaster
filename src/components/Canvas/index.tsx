import { useEffect, useRef } from "react";
import { Cordinates, ForcastDetails } from "../../types/shared";
import "./index.scss";

type Props = {
  predictions: Array<Cordinates>;
  setPredictions: any;
  clear: boolean;
  forcastDetails: ForcastDetails;
  handleInput: any;
  edit?: boolean;
};

const Canvas: React.FC<Props> = ({
  predictions,
  setPredictions,
  clear,
  forcastDetails,
  handleInput,
  edit = false,
}) => {
  const canvasRef = useRef<any>();
  const contextRef = useRef<any>();

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `70vw`;
    canvas.style.height = `70vh`;

    const context = canvas.getContext("2d");
    context.scale(2.85, 2.85);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "white";
    context.lineWidth = 3;
    contextRef.current = context;
  };

  const populatePredictions = (predictions: Array<Cordinates>) => {
    // when editing we send predictions, so populate the predictions
    if (predictions.length > 0) {
      contextRef.current.beginPath();
      predictions.forEach(({ x: offsetX, y: offsetY }, i) => {
        const previousPoints = predictions[i - 1];

        contextRef.current.moveTo(previousPoints?.x, previousPoints?.y);
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.arc(offsetX, offsetY, 2, 0, Math.PI * 2, true);
        contextRef.current.stroke();
      });
      contextRef.current.closePath();
    }
  };

  const draw = ({
    nativeEvent: { offsetX, offsetY },
  }: {
    nativeEvent: { offsetX: number; offsetY: number };
  }) => {
    const previousPoints = predictions.at(-1);

    const validOffset = isValidOffsetX(previousPoints?.x || 0, offsetX);

    if (validOffset) {
      setPredictions([...predictions, { x: offsetX, y: offsetY }]);

      contextRef.current.beginPath();
      contextRef.current.moveTo(previousPoints?.x, previousPoints?.y);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.arc(offsetX, offsetY, 2, 0, Math.PI * 2, true);
      contextRef.current.stroke();
      contextRef.current.closePath();
    } else alert("Cannot time travel, kindly select time in the future ");
  };

  const isValidOffsetX = (prevOffsetX: number, currOffsetX: number) => {
    // This is to validate the user only select forward point for X
    // to prevent going back e.g prevent time travel 😄
    return prevOffsetX < currOffsetX;
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Backspace") {
      setPredictions([...predictions.slice(0, predictions.length - 1)]);

      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      populatePredictions([...predictions.slice(0, predictions.length - 1)]);
    }
  };

  useEffect(() => {
    prepareCanvas();
  }, []);

  useEffect(() => {
    if (clear || edit) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
    if (clear) setPredictions([]);
    if (edit) populatePredictions(predictions);
  }, [clear, predictions, edit]);

  return (
    <div className="canvas_container">
      <input
        type="text"
        name="forcastTitle"
        className="input_text canvas_container__main_title"
        placeholder="Untitled"
        onChange={handleInput}
        value={forcastDetails.forcastTitle}
      />
      <input
        type="text"
        name="yTitle"
        className="input_text canvas_container__y_title"
        placeholder="Untitled"
        onChange={handleInput}
        value={forcastDetails.yTitle}
      />
      <canvas
        tabIndex={0}
        className="canvas_container__drawing_paper_canvas"
        onMouseDown={draw}
        ref={canvasRef}
        onKeyDown={handleKeyDown}
      />
      <input
        type="text"
        name="xTitle"
        className="input_text canvas_container__x_title"
        placeholder="Untitled"
        onChange={handleInput}
        value={forcastDetails.xTitle}
      />
    </div>
  );
};

export default Canvas;

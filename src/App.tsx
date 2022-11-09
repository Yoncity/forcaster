import { useState } from "react";
import "./App.scss";
import CreateForcast from "./containers/CreateForcast";
import EditForcast from "./containers/EditForcast";
import Home from "./containers/Home";
import MyForcasts from "./containers/MyForcasts";
import ViewForcast from "./containers/ViewForcast";
import { Forcast } from "./types/shared";

function App() {
  const [showCreateForcast, setShowCreateForcast] = useState(false);
  const [showEditForcast, setShowEditForcast] = useState(false);
  const [showMyForcasts, setShowMyForcasts] = useState(false);

  const [showViewForcast, setShowViewForcast] = useState(false);
  const [currentForcast, setCurrentForcast] = useState<Forcast>({
    data: [],
    date: "",
    details: {
      forcastTitle: "",
      xTitle: "",
      yTitle: "",
    },
    id: 0,
  });

  const showForcastInDetails = (forcast: Forcast) => {
    setShowViewForcast(true);
    setCurrentForcast(forcast);
  };

  return (
    <div className="app_container">
      <Home
        setShowCreateForcast={setShowCreateForcast}
        setShowMyForcasts={setShowMyForcasts}
      />

      <CreateForcast show={showCreateForcast} setShow={setShowCreateForcast} />

      <MyForcasts
        show={showMyForcasts}
        setShow={setShowMyForcasts}
        showForcastInDetails={showForcastInDetails}
      />

      <ViewForcast
        show={showViewForcast}
        setShow={setShowViewForcast}
        forcast={currentForcast as Forcast}
        setShowEditForcast={setShowEditForcast}
      />

      <EditForcast
        show={showEditForcast}
        setShow={setShowEditForcast}
        forcast={currentForcast as Forcast}
        setCurrentForcast={setCurrentForcast}
      />

      {/* {currentForcast && (
        <>
          <ViewForcast
            show={showViewForcast}
            setShow={setShowViewForcast}
            forcast={currentForcast as Forcast}
            setShowEditForcast={setShowEditForcast}
          />

          <EditForcast
            show={showEditForcast}
            setShow={setShowEditForcast}
            forcast={currentForcast as Forcast}
          />
        </>
      )} */}
    </div>
  );
}

export default App;

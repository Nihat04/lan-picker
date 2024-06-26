import { useState } from "react";
import "./App.css";
import data from "./db/main.json";
import PlayersPickList from "./components/PlayersPickList/PlayersPickList";

function App() {
    console.log(data);

    const click = () => {
        data.teams[0].players.push("misha");
        console.log(data);
    };

    return (
        <>
          <PlayersPickList />
        </>
    );
}

export default App;

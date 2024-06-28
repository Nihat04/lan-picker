import { useState } from "react";
import "./App.css";
import data from "./db/main.json";
import PlayersPickList from "./components/PlayersPickList/PlayersPickList";
import axios from "axios";

function App() {
    axios.get('https://open.faceit.com/data/v4/search/players?nickname=M1jack').then(res => console.log(res));

    return (
        <>
          {/* <PlayersPickList /> */}
        </>
    );
}

export default App;

import { useSelector } from "react-redux";

const PlayersPickList = () => {
    const players = useSelector((state) => state.players)
    console.log(players)
    return <ul></ul>;
};

export default PlayersPickList;

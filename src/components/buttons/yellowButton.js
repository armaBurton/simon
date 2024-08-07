import { Main } from "../../views/Main/Main"


export const yellowButton = (toggle) => {
    console.log(toggle);
    const button = toggle === 1 ? <div id="yellow" className="game-button yellow b-yellow" data-tile="yellow" onClick={Main.handleGameButton} /> :
    <div id="yellow" className="game-button yellow" data-tile="yellow" onClick={Main.handleGameButton} />
    console.log(button.props);
    return button;
}
import { Main } from "../../views/Main/Main"


export const yellowButton = () => {

    return (<div id="yellow" className="game-button yellow" data-tile="yellow" onClick={Main.handleGameButton} />)

}
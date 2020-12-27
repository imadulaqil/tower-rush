mainContainer.appendChild(stageRegister);
mainContainer.appendChild(stageLobby);
mainContainer.appendChild(stageGameplay);
mainContainer.appendChild(gameTitle);

changeStage(StageType.Intro);

G.exec(() => {
    let introDuration = 0;//userParams.isLoggedIn()? 700 : 1800;
    setTimeout(() => {
        if (userParams.isLoggedIn()) {
            if (sessionParams.sessionIdExists()) {
                changeStage(StageType.Gameplay);
            }
            else {
                changeStage(StageType.Lobby);
            }
        }
        else {
            changeStage(StageType.Register);
        }
    }, introDuration);
});
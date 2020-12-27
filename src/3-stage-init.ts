enum StageType {
    Intro = 'Intro',
    Register = 'Register',
    Lobby = 'Lobby',
    Gameplay = 'Gameplay'
};

let currentStage: StageType = StageType.Intro;

let stageRegister: HTMLDivElement,
    stageLobby: HTMLDivElement,
    stageGameplay: HTMLDivElement

const mainContainer: HTMLDivElement = G.q('#main-container');

const changeStage = (nextStage: StageType): void => {
    const endEventName = `${currentStage}End`;
    const startEventName = `${nextStage}Start`;
    const transitionEventName = `${currentStage}To${nextStage}`;
    G.trigger(G, endEventName, { nextStage });
    G.trigger(G, startEventName, { nextStage });
    G.trigger(G, transitionEventName, { nextStage });
    currentStage = nextStage;
};

const onStageEnd = (stage: StageType, callbackFn: Function): void => {
    G.on(G, `${stage}End`, callbackFn);
};

const onStageStart = (stage: StageType, callbackFn: Function): void => {
    G.on(G, `${stage}Start`, callbackFn);
};

const onStageTransition = (stageFrom: StageType, stageTo: StageType, callbackFn: Function): void => {
    G.on(G, `${stageFrom}To${stageTo}`, callbackFn);
};

const hideAllStage = (): void => {
    G.hide(stageRegister);
    G.hide(stageLobby);
    G.hide(stageGameplay);
};
let mySession: SessionType;

stageGameplay = G.exec(() => {

const gameCanvas: HTMLCanvasElement = G.c('canvas', {
    classes: ['game-canvas']
});

onStageStart(StageType.Gameplay, () => {
    const b = gameCanvas.getBoundingClientRect();
    gameCanvas.width = b.width;
    gameCanvas.height = b.height;
});

// LOGIC
G.on(G, 'userinitialized', () => {
    if (sessionParams.sessionIdExists()) {
        socket.once(`session_${sessionParams.sessionId}`, (session: SessionType) => {
            mySession = session;
        });
    }
});


return G.c('div', {
    children: [gameCanvas],
    classes: ['stage-container'],
    attributes: {
        id: 'stage-gameplay'
    }
});

});

onStageStart(StageType.Gameplay, () => {
    G.show(stageGameplay);
});
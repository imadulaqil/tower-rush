stageGameplay = G.exec(() => {


    return G.c('div', {
        classes: ['stage-container'],
        attributes: {
            id: 'stage-gameplay'
        }
    });
});

onStageStart(StageType.Gameplay, () => {
    G.show(stageGameplay);
});
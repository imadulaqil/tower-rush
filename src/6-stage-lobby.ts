stageLobby = G.exec(() => {

// Title
const title = G.c('h1', {
    innerHTML: 'Lobby'
});

return G.c('div', {
    children: [title],
    classes: ['stage-container'],
    attributes: {
        id: 'stage-lobby'
    }
});

});

onStageStart(StageType.Lobby, () => {
    G.show(stageLobby);
});
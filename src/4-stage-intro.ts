const gameTitle: HTMLImageElement = G.c('img', {
    attributes: {
        id: 'game-title',
        src: './assets/images/title.svg',
        alt: 'intro image..'
    }
});

onStageStart(StageType.Intro, () => {
    hideAllStage();
    G.show(gameTitle);
});

onStageEnd(StageType.Intro, () => {
    G.hide(gameTitle);
});
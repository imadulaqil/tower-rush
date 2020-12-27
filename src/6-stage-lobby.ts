stageLobby = G.exec(() => {

// Setup elements

const expStar: HTMLImageElement = G.c('img', {
    classes: ['exp-star'],
    attributes: {
        src: './assets/images/expstar.svg'
    }
});

const userLevel: HTMLSpanElement = G.c('span', {
    classes: ['user-level']
    // innerHTML: '' + G.getLevel(myUser.exp)
});

const userName: HTMLSpanElement = G.c('span', {
    classes: ['user-name']
    // innerHTML: userParams.userName
});

// group of exp star, user level and user name
const userInfo = G.c('div', {
    children: [expStar, userLevel, userName],
    classes: ['user-info']
});

const startButton: HTMLButtonElement = G.c('button', {
    classes: ['btn', 'btn-primary', 'start-button'],
    attributes: {
        disabled: true
    },
    innerHTML: 'START'
});

// Logic code
G.on(G, 'userinitialized', () => {
    userLevel.innerHTML = '' + G.getLevel(myUser.exp);
    userName.innerHTML = myUser.name;
    startButton.disabled = false;
    // Debug
    // G.onEach(myUser, (value, prop) => {
    //     userLevel.innerHTML += `${prop}: ${value}<br>`;
    // });
});

// Return value
return G.c('div', {
    children: [userInfo, startButton],
    classes: ['stage-container'],
    attributes: {
        id: 'stage-lobby'
    }
});

});

onStageStart(StageType.Lobby, () => {
    G.show(stageLobby);
});
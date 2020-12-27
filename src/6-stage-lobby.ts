stageLobby = G.exec(() => {

// Setup elements
// Title
const title = G.c('h1', {
    innerHTML: 'Lobby'
});

const userName: HTMLSpanElement = G.c('span', {
    // innerHTML: userParams.userName
});

const userLevel: HTMLSpanElement = G.c('span', {
    // innerHTML: '' + G.getLevel(myUser.exp)
});

const userInfo = G.c('div', {
    children: [userLevel, userName]
});

// Logic code
G.on(G, 'userinitialized', () => {
    // userName.innerHTML = myUser.name;
    // userLevel.innerHTML = '' + G.getLevel(myUser.exp);
    G.onEach(myUser, (value, prop) => {
        userLevel.innerHTML += `${prop}: ${value}<br>`;
    });
});

// Return value
return G.c('div', {
    children: [title, userInfo],
    classes: ['stage-container'],
    attributes: {
        id: 'stage-lobby'
    }
});

});

onStageStart(StageType.Lobby, () => {
    G.show(stageLobby);
});
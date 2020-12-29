const userParams = {
    userId: G.gp('userId', ''),
    userName: G.gp('userName', ''),
    userIdExists() {
        return this.userId !== '';
    },
    userNameExists() {
        return this.userName !== '';
    },
    isLoggedIn() {
        return this.userIdExists();
    }
};

const sessionParams = {
    sessionId: G.gp('sessionId', ''),
    sessionIdExists() {
        return this.sessionId !== '';
    }
};

let myUser: UserType;

if (userParams.isLoggedIn()) {
    socket.once('users', (users: { [id: string]: UserType }) => {
        // get my user in database
        const user = users[userParams.userId];
        // if exists, read its properties
        if (user !== undefined) {
            myUser = user;
            if (userParams.userNameExists()) {
                myUser.name = userParams.userName;
            }
            myUser.loginCount++;
        }
        // otherwise, create new
        else {
            myUser = {
                id: userParams.userId,
                name: userParams.userNameExists()? userParams.userName : G.rname(),
                exp: 0,
                joinedTime: G.t(),
                loginCount: 1
            };
        }
        socket.emit('setuser', myUser);

        G.trigger(G, 'userinitialized');

    });
}
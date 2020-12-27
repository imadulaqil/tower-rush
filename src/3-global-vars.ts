const userParams = {
    userId: G.gp('userId', ''),
    userIdExists() {
        return this.userId !== '';
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
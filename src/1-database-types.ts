type UserType = {
    id: string,
    name: string,
    exp: number,
    joinedTime: number,
    loginCount: number
};

type SessionType = {
    id: string,
    gameMode: string,
    startTime: number,
    endTime: number,
    users: { [id: string]: UserType }
};
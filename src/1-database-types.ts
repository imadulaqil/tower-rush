type UserType = {
    id: string,
    name: string,
    exp: number
};

type UserSession = {
    id: string,
    gameMode: string,
    startTime: number,
    endTime: number,
    users: { [id: string]: UserType }
};
let io: any;

const socket = io();

socket.once('connected', (data: any) => {
    console.log(data);
});
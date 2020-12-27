"use strict";
var io;
var socket = io();
socket.once('connected', function (data) {
    console.log(data);
});
"use strict";

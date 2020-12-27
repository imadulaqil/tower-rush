"use strict";
var io;
var socket = io();
socket.once('connected', function (data) {
    console.log(data);
});
"use strict";
"use strict";
/**
 * Collection of methods that are global througout all modules.
 * Includes: dom functions, events handler
 */
var G = {
    debugMode: 0,
    temp1: null,
    /**
     * Returns 1-11 length string for random ID
     * @param length
     */
    rid: function (length) {
        return Math.random().toString(36).substr(2, length);
    },
    /**
     * Generate random player name
     */
    rname: function () {
        return "player_" + this.t() + this.irange(1000, 10000);
    },
    /**
     * Converts exp value to level number
     */
    getLevel: function (exp) {
        return 1 + Math.ceil(exp / 1000);
    },
    events: {},
    /**
     * Add event listener
     * @param object
     * @param eventName
     * @param callbackFn
     */
    on: function (object, eventName, callbackFn) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            console.error("Property 'events' does not exists on given 'object'.");
        }
    },
    /**
     * Remove event listener
     * @param object
     * @param eventName
     * @param callbackFn
     */
    off: function (object, eventName, callbackFn) {
        if (object.events) {
            var callbacks = object.events[eventName];
            var newCallbacks = [];
            if (callbacks instanceof Array) {
                for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
                    var callback = callbacks_1[_i];
                    if (callback !== callbackFn) {
                        newCallbacks.push(callback);
                    }
                }
                object.events[eventName] = newCallbacks;
            }
            else {
                console.log("There are no callbacks on the events['eventName'] of 'object'.");
            }
        }
        else {
            console.error("Property 'events' does not exists on given 'object'.");
        }
    },
    /**
     * Trigger events
     * @param object
     * @param eventNames
     * @param events
     */
    trigger: function (object, eventNames, events) {
        if (object.events) {
            if (!(eventNames instanceof Array)) {
                eventNames = [eventNames];
            }
            for (var _i = 0, eventNames_1 = eventNames; _i < eventNames_1.length; _i++) {
                var eventName = eventNames_1[_i];
                var callbacks = object.events[eventName];
                if (callbacks instanceof Array) {
                    for (var _a = 0, callbacks_2 = callbacks; _a < callbacks_2.length; _a++) {
                        var callback = callbacks_2[_a];
                        callback.call(object, events || { name: eventName, source: object });
                    }
                }
            }
        }
    },
    /**
     * Shorthand for `document.querySelector`
     * @param selectors
     */
    q: function (selectors) {
        return document.querySelector(selectors);
    },
    /**
     * Shorthand for `document.querySelectorAll`
     * @param selectors
     */
    qa: function (selectors) {
        return document.querySelectorAll(selectors);
    },
    /**
     * Shorthand for `document.createElement` with options to add children, set custom classes and attributes.
     * @param tagName
     * @param options
     */
    c: function (tagName, options) {
        if (options === void 0) { options = {}; }
        var e = document.createElement(tagName);
        if (options.attributes) {
            for (var name_1 in options.attributes) {
                var value = options.attributes[name_1];
                if (e[name_1]) {
                    e[name_1] = value;
                }
                else {
                    e.setAttribute(name_1, value);
                }
            }
        }
        if (options.classes) {
            for (var _i = 0, _a = options.classes; _i < _a.length; _i++) {
                var className = _a[_i];
                e.classList.add(className);
            }
        }
        if (options.children) {
            for (var _b = 0, _c = options.children; _b < _c.length; _b++) {
                var child = _c[_b];
                e.appendChild(child);
            }
        }
        if (options.innerHTML) {
            e.innerHTML += options.innerHTML;
        }
        return e;
    },
    urlParams: new URLSearchParams(window.location.search),
    /**
     * Get a parameter with given name from our current url
     * @param name search parameter
     * @param defaultValue return value if not exists (null by default)
     */
    gp: function (name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var value = this.urlParams.get(name);
        if (value === null)
            return defaultValue;
        return value;
    },
    /**
     * Returns our current url without params so we can add optional params.
     * Usage example:
     *
     * `getUrl('userId=0', 'userName=john');`
     * @param params string in format: `'name=value'`
     */
    getUrl: function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return "" + window.location.href.split(/[?#]/)[0] + (arguments.length > 0 ? "?" + params.join('&') : '');
    },
    /**
     * Executes one or multiple functions given. Nice alternative to create bunch of IIFE (Immediately-invoked Function Expression)
     * Returns the return value of the last function
     * @param functions
     */
    exec: function () {
        var functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            functions[_i] = arguments[_i];
        }
        for (var i = 0; i < functions.length; i++) {
            if (i === functions.length - 1) {
                return functions[i]();
            }
            functions[i]();
        }
    },
    /**
     * Returns current time in milliseconds.
     */
    t: function () {
        return new Date().valueOf();
    },
    hide: function (e) {
        e.style.display = 'none';
    },
    show: function (e, displayValue) {
        if (displayValue === void 0) { displayValue = 'block'; }
        e.style.display = displayValue;
    },
    isHidden: function (e) {
        return e.style.display === 'none';
    },
    hasClass: function (e, className) {
        return e.classList.contains(className);
    },
    addClass: function (e, className) {
        if (!this.hasClass(e, className)) {
            e.classList.add(className);
        }
    },
    removeClass: function (e, className) {
        if (this.hasClass(e, className)) {
            e.classList.remove(className);
        }
    },
    toggleClass: function (e, className) {
        e.classList.toggle(className);
    },
    createNamedPicture: function (width, height, char, completeFn, options) {
        if (options === void 0) { options = {}; }
        var pixelRatio = 4;
        var canvas = this.c('canvas', {
            attributes: {
                width: width * pixelRatio,
                height: height * pixelRatio
            }
        });
        var ctx = canvas.getContext('2d');
        ctx.scale(pixelRatio, pixelRatio);
        ctx.font = (options.fontWeight || 'normal') + " " + (options.fontSize || 16) + "px " + (options.fontFamily ? options.fontFamily + ", " : '') + "sans-serif";
        ctx.fillStyle = options.color || 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        setTimeout(function () {
            ctx.fillText(char, width / 2, height / 2 + 1);
            completeFn(canvas);
        }, options.loadingFontDuration || 100);
    },
    /**
     * Randomly pop an element from given `array`
     * @param array
     */
    randpop: function (array) {
        return array.splice(Math.floor(Math.random() * array.length), 1)[0];
    },
    /**
     * Returns a random number between `min` and `max`
     * @param min
     * @param max
     */
    range: function (min, max) {
        if (max === void 0) { max = 0; }
        return min + Math.random() * (max - min);
    },
    /**
     * Returns a random integer between `min` and `max`
     * @param min
     * @param max
     */
    irange: function (min, max) {
        if (max === void 0) { max = 0; }
        return Math.floor(this.range(min, max));
    },
    copyToClipboard: function (text) {
        var t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        return text;
    },
    /**
     * Loop through all children of given `object`
     * @param object
     * @param callbackFn set return value to `-1` will break the loop
     */
    onEach: function (object, callbackFn) {
        for (var key in object) {
            var ret = callbackFn(object[key], key);
            if (ret === -1)
                break;
        }
    },
    /**
     * Returns object in array form
     * @param object
     */
    oa: function (object) {
        var result = [];
        this.onEach(object, function (child, key) {
            child['__oakey'] = key;
            result.push(child);
        });
        return result;
    }
};
"use strict";
var userParams = {
    userId: G.gp('userId', ''),
    userName: G.gp('userName', ''),
    userIdExists: function () {
        return this.userId !== '';
    },
    userNameExists: function () {
        return this.userName !== '';
    },
    isLoggedIn: function () {
        return this.userIdExists();
    }
};
var sessionParams = {
    sessionId: G.gp('sessionId', ''),
    sessionIdExists: function () {
        return this.sessionId !== '';
    }
};
var myUser;
if (userParams.isLoggedIn()) {
    socket.once('users', function (users) {
        // get my user in database
        var user = users[userParams.userId];
        // if exists, read its properties
        if (user) {
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
                name: userParams.userNameExists() ? userParams.userName : G.rname(),
                exp: 0,
                joinedTime: G.t(),
                loginCount: 1
            };
        }
        socket.emit('setuser', myUser);
        G.trigger(G, 'userinitialized');
    });
}
"use strict";
var StageType;
(function (StageType) {
    StageType["Intro"] = "Intro";
    StageType["Register"] = "Register";
    StageType["Lobby"] = "Lobby";
    StageType["Gameplay"] = "Gameplay";
})(StageType || (StageType = {}));
;
var currentStage = StageType.Intro;
var stageRegister, stageLobby, stageGameplay;
var mainContainer = G.q('#main-container');
var changeStage = function (nextStage) {
    var endEventName = currentStage + "End";
    var startEventName = nextStage + "Start";
    var transitionEventName = currentStage + "To" + nextStage;
    G.trigger(G, endEventName, { nextStage: nextStage });
    G.trigger(G, startEventName, { nextStage: nextStage });
    G.trigger(G, transitionEventName, { nextStage: nextStage });
    currentStage = nextStage;
};
var onStageEnd = function (stage, callbackFn) {
    G.on(G, stage + "End", callbackFn);
};
var onStageStart = function (stage, callbackFn) {
    G.on(G, stage + "Start", callbackFn);
};
var onStageTransition = function (stageFrom, stageTo, callbackFn) {
    G.on(G, stageFrom + "To" + stageTo, callbackFn);
};
var hideAllStage = function () {
    G.hide(stageRegister);
    G.hide(stageLobby);
    G.hide(stageGameplay);
};
"use strict";
var gameTitle = G.c('img', {
    attributes: {
        id: 'game-title',
        src: './assets/images/title.svg',
        alt: 'intro image..'
    }
});
onStageStart(StageType.Intro, function () {
    hideAllStage();
    G.show(gameTitle);
});
onStageEnd(StageType.Intro, function () {
    G.hide(gameTitle);
});
"use strict";
stageRegister = G.exec(function () {
    // Creating form
    var input = G.c('input', {
        attributes: {
            type: 'text',
            name: 'userId',
            id: 'userId',
            placeholder: 'abc123',
            autocomplete: 'off',
            spellcheck: 'false',
            required: ''
        }
    });
    var label = G.c('label', {
        attributes: {
            for: input.id
        },
        innerHTML: 'User ID:'
    });
    var formGroup = G.c('div', {
        children: [label, input],
        classes: ['form-group']
    });
    var send = G.c('button', {
        attributes: {
            type: 'submit'
        },
        innerHTML: 'Login'
    });
    var form = G.c('form', {
        children: [formGroup, send]
    });
    return G.c('div', {
        children: [form],
        classes: ['stage-container'],
        attributes: {
            id: 'stage-register'
        }
    });
});
onStageStart(StageType.Register, function () {
    G.show(stageRegister);
});
"use strict";
stageLobby = G.exec(function () {
    // Setup elements
    // Title
    var title = G.c('h1', {
        innerHTML: 'Lobby'
    });
    var userName = G.c('span', {
    // innerHTML: userParams.userName
    });
    var userLevel = G.c('span', {
    // innerHTML: '' + G.getLevel(myUser.exp)
    });
    var userInfo = G.c('div', {
        children: [userLevel, userName]
    });
    // Logic code
    G.on(G, 'userinitialized', function () {
        // userName.innerHTML = myUser.name;
        // userLevel.innerHTML = '' + G.getLevel(myUser.exp);
        G.onEach(myUser, function (value, prop) {
            userLevel.innerHTML += prop + ": " + value + "<br>";
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
onStageStart(StageType.Lobby, function () {
    G.show(stageLobby);
});
"use strict";
stageGameplay = G.exec(function () {
    return G.c('div', {
        classes: ['stage-container'],
        attributes: {
            id: 'stage-gameplay'
        }
    });
});
onStageStart(StageType.Gameplay, function () {
    G.show(stageGameplay);
});
"use strict";
mainContainer.appendChild(stageRegister);
mainContainer.appendChild(stageLobby);
mainContainer.appendChild(stageGameplay);
mainContainer.appendChild(gameTitle);
changeStage(StageType.Intro);
G.exec(function () {
    var introDuration = 0; //userParams.isLoggedIn()? 700 : 1800;
    setTimeout(function () {
        if (userParams.isLoggedIn()) {
            if (sessionParams.sessionIdExists()) {
                changeStage(StageType.Gameplay);
            }
            else {
                changeStage(StageType.Lobby);
            }
        }
        else {
            changeStage(StageType.Register);
        }
    }, introDuration);
});

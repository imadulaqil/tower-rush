/**
 * Collection of methods that are global througout all modules.
 * Includes: dom functions, events handler
 */
const G = {
    debugMode: 0,
    temp1: null as any, // assign this anything you want as global variable
    /**
     * Returns 1-11 length string for random ID
     * @param length 
     */
    rid(length: number): string {
        return Math.random().toString(36).substr(2, length);
    },
    /**
     * Generate random player name
     */
    rname(): string {
        return `player_${this.t()}${this.irange(1000, 10000)}`;
    },
    /**
     * Converts exp value to level number
     */
    getLevel(exp: number): number {
        return 1 + Math.ceil(exp / 1000);
    },
    events: {},
    /**
     * Add event listener
     * @param object 
     * @param eventName 
     * @param callbackFn 
     */
    on(object: { events: { [eventName: string]: Function[] } }, eventName: string, callbackFn: Function) {
        if (object.events) {
            object.events[eventName] = object.events[eventName] || [];
            object.events[eventName].push(callbackFn);
        }
        else {
            console.error(`Property 'events' does not exists on given 'object'.`);
        }
    },
    /**
     * Remove event listener
     * @param object 
     * @param eventName 
     * @param callbackFn 
     */
    off(object: { events: { [eventName: string]: Function[] } }, eventName: string, callbackFn: Function) {
        if (object.events) {
            const callbacks = object.events[eventName];
            const newCallbacks = [];
            if (callbacks instanceof Array) {
                for (const callback of callbacks) {
                    if (callback !== callbackFn) {
                        newCallbacks.push(callback);
                    }
                }
                object.events[eventName] = newCallbacks;
            }
            else {
                console.log(`There are no callbacks on the events['eventName'] of 'object'.`);
            }
        }
        else {
            console.error(`Property 'events' does not exists on given 'object'.`);
        }
    },
    /**
     * Trigger events
     * @param object 
     * @param eventNames 
     * @param events 
     */
    trigger(object: { events: { [eventName: string]: Function[] } }, eventNames: string | string[], events?: any) {
        if (object.events) {
            if (!(eventNames instanceof Array)) {
                eventNames = [eventNames];
            }
            for (const eventName of eventNames) {
                const callbacks = object.events[eventName];
                if (callbacks instanceof Array) {
                    for (const callback of callbacks) {
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
    q(selectors: string): any {
        return document.querySelector(selectors);
    },
    /**
     * Shorthand for `document.querySelectorAll`
     * @param selectors 
     */
    qa(selectors: string): any {
        return document.querySelectorAll(selectors);
    },
    /**
     * Shorthand for `document.createElement` with options to add children, set custom classes and attributes.
     * @param tagName 
     * @param options 
     */
    c(tagName: string, options: { children?: Node[], classes?: string[], attributes?: { [name: string]: any }, innerHTML?: string } = {}): any {
        const e = document.createElement(tagName) as any;
        if (options.attributes) {
            for (const name in options.attributes) {
                const value = options.attributes[name];
                if (e[name] !== undefined) {
                    e[name] = value;
                }
                else {
                    e.setAttribute(name, value);
                }
            }
        }
        if (options.classes) {
            for (const className of options.classes) {
                e.classList.add(className);
            }
        }
        if (options.children) {
            for (const child of options.children) {
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
    gp(name: string, defaultValue: any = null): any {
        const value = this.urlParams.get(name);
        if (value === null) return defaultValue;
        return value;
    },
    /**
     * Returns our current url without params so we can add optional params.
     * Usage example:
     * 
     * `getUrl('userId=0', 'userName=john');`
     * @param params string in format: `'name=value'`
     */
    getUrl(...params: string[]): string {
        return `${window.location.href.split(/[?#]/)[0]}${arguments.length > 0? `?${params.join('&')}` : ''}`;
    },
    goto(url: string): void {
        window.location.href = url;
    },
    /**
     * Executes one or multiple functions given. Nice alternative to create bunch of IIFE (Immediately-invoked Function Expression)
     * Returns the return value of the last function
     * @param functions
     */
    exec(...functions: Function[]): any {
        for (let i = 0; i < functions.length; i++) {
            if (i === functions.length - 1) {
                return functions[i]();
            }
            functions[i]();
        }
    },
    /**
     * Returns current time in milliseconds.
     */
    t(): number {
        return new Date().valueOf();
    },
    hide(e: HTMLElement): void {
        e.style.display = 'none';
    },
    show(e: HTMLElement, displayValue: string = 'block'): void {
        e.style.display = displayValue;
    },
    isHidden(e: HTMLElement): boolean {
        return e.style.display === 'none';
    },
    hasClass(e: HTMLElement, className: string): boolean {
        return e.classList.contains(className);
    },
    addClass(e: HTMLElement, className: string): void {
        if (!this.hasClass(e, className)) {
            e.classList.add(className);
        }
    },
    removeClass(e: HTMLElement, className: string): void {
        if (this.hasClass(e, className)) {
            e.classList.remove(className);
        }
    },
    toggleClass(e: HTMLElement, className: string): void {
        e.classList.toggle(className);
    },
    createNamedPicture(width: number, height: number, char: string, completeFn: (canvas: HTMLCanvasElement) => void, options: {
        color?: string,
        fontSize?: number,
        fontWeight?: string,
        fontFamily?: string,
        loadingFontDuration?: number
    } = {}): void {
        const pixelRatio = 4;
        const canvas: HTMLCanvasElement = this.c('canvas', {
            attributes: {
                width: width * pixelRatio,
                height: height * pixelRatio
            }
        });
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.scale(pixelRatio, pixelRatio);
        ctx.font = `${options.fontWeight || 'normal'} ${options.fontSize || 16}px ${options.fontFamily? `${options.fontFamily}, ` : ''}sans-serif`;
        ctx.fillStyle = options.color || 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        setTimeout(() => {
            ctx.fillText(char, width / 2, height / 2 + 1);
            completeFn(canvas);
        }, options.loadingFontDuration || 100);
    },
    /**
     * Randomly pop an element from given `array`
     * @param array 
     */
    randpop(array: any[]): any {
        return array.splice(Math.floor(Math.random() * array.length), 1)[0];
    },
    /**
     * Returns a random number between `min` and `max`
     * @param min 
     * @param max 
     */
    range(min: number, max: number = 0): number {
        return min + Math.random() * (max - min);
    },
    /**
     * Returns a random integer between `min` and `max`
     * @param min 
     * @param max 
     */
    irange(min: number, max: number = 0): number {
        return Math.floor(this.range(min, max));
    },
    copyToClipboard(text: string) {
        const t = document.createElement('textarea');
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
    onEach(object: { [key: string]: any }, callbackFn: (value: any, key: string) => any) {
        for (const key in object) {
            const ret = callbackFn(object[key], key);
            if (ret === -1) break;
        }
    },
    /**
     * Returns object in array form
     * @param object 
     */
    oa(object: { [key: string]: any }): any[] {
        const result: any[] = [];
        this.onEach(object, (child, key) => {
            child['__oakey'] = key;
            result.push(child);
        });
        return result;
    }
};
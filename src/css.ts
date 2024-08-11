/**
 * Tiny CSS subset parser
 */

import { StyleRule } from "./types";

enum State {
    Initial,
    Selector,
    PropertyList,
    Property,
    Value,
    PopState,
    SkipNext,
}

const transitions: Record<State, Record<string, State>> = {
    [State.Initial]: {
        '{': State.PropertyList,
        '.S': State.Selector,
    },
    [State.Selector]: {
        '{': State.PropertyList,
    },
    [State.PropertyList]: {
        '}': State.Initial,
        ';': State.PropertyList,
        '.S': State.Property,
    },
    [State.Property]: {
        ':': State.Value,
    },
    [State.Value]: {
        ';': State.PropertyList,
    },
    [State.PopState]: {},
    [State.SkipNext]: {},
};

const spaces = new Set([' ', '\t', '\n', '\r']);

export function parse(css: string, { debug = false } = {}): StyleRule[] {
    const output = [];
    const stack: State[] = [];
    let state = State.Initial;

    let start = 0;

    let selector = '';
    let rules: { [key: string]: string } = {};
    let property = '';
    let value = '';

    for (let i = 0; i < css.length; i++) {
        if (debug) {
            console.log(`i: ${i}, char: ${css[i]}, state: ${state}`);
        }
        const char = css[i];
        const transition: Record<string, State> | undefined = transitions[state];

        if (!transition) {
            continue;
        }
        let nextState: State | undefined = transition[char];
        if (nextState === undefined) {
            // Any non space character
            if (transition['.S'] && !spaces.has(char)) {
                nextState = transition['.S'];
            }
        }

        if (nextState === undefined || state === nextState) {
            continue;
        }

        switch (state) {
            case State.Selector:
                selector = css.slice(start, i - 1);
                break;
            case State.PropertyList:
                if (nextState === State.Initial) {
                    output.push({ selector, rules });
                    rules = {};
                    selector = '';
                }
                break;
            case State.Property:
                property = css.slice(start, i).trim();
                break;
            case State.Value:
                value = css.slice(start + 1, i).trim();
                rules[property] = value;
                break;
        }

        state = nextState;

        switch (state) {
            case State.PopState:
                state = stack.pop() ?? State.Initial;
                break;

            case State.SkipNext:
                i++;
                break;

            case State.Selector:
            case State.Property:
            case State.Value:
                start = i;
                break;

            default:
                break;
        }
    }

    return output;
}

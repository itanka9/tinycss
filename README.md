# TinyCSS - a toy-like css parser

This repo contains a module css.ts with simple FSM for parsing base CSS structure (selectors, properties). 

Usage: 

```ts
import { parse } from './src/css.ts'
import type { StyleRule } from './src/types.ts'

const debug = false

const css = `
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}
`;

const styleRules: StyleRule[] = parse(css, { debug });
```

Outputs: 

```json
[
    {
        "selector": "body",
        "rules": {
            "margin": "0",
            "display": "flex",
            "place-items": "center",
            "min-width": "320px",
            "min-height": "100vh"
        }
    },
    {
        "selector": "a",
        "rules": {
            "font-weight": "500",
            "color": "#646cff",
            "text-decoration": "inherit"
        }
    },
    {
        "selector": "a:hover",
        "rules": {
            "color": "#535bf2"
        }
    }
]
```

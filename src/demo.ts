import { parse } from "./css";

declare global {
    const hljs: any;
}

export function setupDemo(src: HTMLElement, dest: HTMLElement) {
    src.addEventListener('input', (ev) => {
        if (!ev.target || !(ev instanceof InputEvent)) {
            return;
        }
        dest.innerHTML = parseInput(src.innerText);

        hljs.highlightAll();
    });

    fetch('./sample.css')
        .then(r => r.text())
        .then(value => {
            src.innerText = value;            
            dest.innerHTML = parseInput(src.innerText);

            hljs.highlightAll();
        })

    function parseInput(input: string) {
        return '<code class="language-json">' + JSON.stringify(parse(input), null, 4) + '</code>'
    }
}
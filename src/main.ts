import { setupDemo } from './demo'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>TinyCSS - a toy-like css subset parser</h1>
    <div id="wrap">
      <div id="src" contenteditable="true">
      </div>
      <pre id="json"></pre>
    </div
  </div>
`

setupDemo(document.getElementById('src')!, document.getElementById('json')!);

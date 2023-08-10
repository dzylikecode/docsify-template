const menuTemplate = `
<button class="btn zoom-in">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-zoom-in"
    aria-hidden="true"
  >
    <path
      d="M3.75 7.5a.75.75 0 0 1 .75-.75h2.25V4.5a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5H8.25v2.25a.75.75 0 0 1-1.5 0V8.25H4.5a.75.75 0 0 1-.75-.75Z"
    ></path>
    <path
      d="M7.5 0a7.5 7.5 0 0 1 5.807 12.247l2.473 2.473a.749.749 0 1 1-1.06 1.06l-2.473-2.473A7.5 7.5 0 1 1 7.5 0Zm-6 7.5a6 6 0 1 0 12 0 6 6 0 0 0-12 0Z"
    ></path>
  </svg></button
><button class="btn zoom-out">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-zoom-out"
    aria-hidden="true"
  >
    <path d="M4.5 6.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5Z"></path>
    <path
      d="M0 7.5a7.5 7.5 0 1 1 13.307 4.747l2.473 2.473a.749.749 0 1 1-1.06 1.06l-2.473-2.473A7.5 7.5 0 0 1 0 7.5Zm7.5-6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
    ></path>
  </svg></button
><button class="btn reset">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-sync"
    aria-hidden="true"
  >
    <path
      d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"
    ></path>
  </svg></button
><button class="btn up">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-up"
    aria-hidden="true"
  >
    <path
      d="M3.22 10.53a.749.749 0 0 1 0-1.06l4.25-4.25a.749.749 0 0 1 1.06 0l4.25 4.25a.749.749 0 1 1-1.06 1.06L8 6.811 4.28 10.53a.749.749 0 0 1-1.06 0Z"
    ></path>
  </svg></button
><button class="btn down">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-down"
    aria-hidden="true"
  >
    <path
      d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
    ></path>
  </svg></button
><button class="btn left">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-left"
    aria-hidden="true"
  >
    <path
      d="M9.78 12.78a.75.75 0 0 1-1.06 0L4.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L6.06 8l3.72 3.72a.75.75 0 0 1 0 1.06Z"
    ></path>
  </svg></button
><button class="btn right">
  <svg
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    class="octicon octicon-chevron-right"
    aria-hidden="true"
  >
    <path
      d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"
    ></path>
  </svg>
</button>
`;

const step = 20;

export function Menu(panzoom) {
  const menu = document.createElement("div");
  menu.classList.add("mermaid-viewer-control-panel");
  menu.innerHTML = menuTemplate.trim();

  // https://timmywil.com/panzoom/demo/
  const zoomInBtn = menu.querySelector(".zoom-in");
  const zoomOutBtn = menu.querySelector(".zoom-out");
  const resetBtn = menu.querySelector(".reset");
  const upBtn = menu.querySelector(".up");
  const downBtn = menu.querySelector(".down");
  const leftBtn = menu.querySelector(".left");
  const rightBtn = menu.querySelector(".right");
  zoomInBtn.addEventListener("click", (event) => {
    panzoom.zoomIn();
  });
  zoomOutBtn.addEventListener("click", (event) => {
    panzoom.zoomOut();
  });
  resetBtn.addEventListener("click", (event) => {
    panzoom.reset();
  });
  upBtn.addEventListener("click", (event) => {
    const { x, y } = panzoom.getPan();
    panzoom.pan(x, y - step);
  });
  downBtn.addEventListener("click", (event) => {
    const { x, y } = panzoom.getPan();
    panzoom.pan(x, y + step);
  });
  leftBtn.addEventListener("click", (event) => {
    const { x, y } = panzoom.getPan();
    panzoom.pan(x - step, y);
  });
  rightBtn.addEventListener("click", (event) => {
    const { x, y } = panzoom.getPan();
    panzoom.pan(x + step, y);
  });
  return menu;
}

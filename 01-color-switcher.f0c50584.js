!function(){var t={btnStart:document.querySelector("button[data-start]"),btnStop:document.querySelector("button[data-stop]"),bodyEl:document.querySelector("body")},n=null;function e(){t.bodyEl.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.btnStop.disabled=!0,t.btnStart.addEventListener("click",(function(){t.btnStart.disabled=!0,t.btnStop.disabled=!1,n=setInterval(e,1e3)})),t.btnStop.addEventListener("click",(function(){clearInterval(n),t.btnStart.disabled=!1,t.btnStop.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.f0c50584.js.map
// src/lang.ts
function parseLang(langVal) {
  const lang = langVal || navigator.language || "";
  if (lang.includes("ru"))
    return "ru";
  if (lang.includes("es"))
    return "es";
  return "en";
}

// src/assets/style.css
var style_default = 'button,div,p,span{font-family:Open Sans,sans-serif;font-feature-settings:"tnum" on,"lnum" on;color:#29303e;font-size:16px;line-height:22px;letter-spacing:.02em;font-style:normal}.hide{display:none!important}.pay-button{width:280px;min-height:48px;background:#F3F3F3;box-shadow:0 3px 2px -2px #0003;border-radius:8px;border:none;transition:background-color .3s;font-weight:700;display:flex;justify-content:space-between;flex-wrap:wrap;align-items:center;padding:0 13px}.pay-button.dark{background-color:#29303e}.pay-button.dark>*{color:#fff}.pay-button.disabled:not(.dark)>span{color:#c2c2c2}.pay-button:not(.disabled){cursor:pointer}.pay-button:hover:not(.disabled):not(.dark){background:#e1e1e1}.pay-button:active:not(.disabled):not(.dark){background:#c7c7c7}.pay-button.dark:hover:not(.disabled){background-color:#353c4f}.pay-button.dark:active:not(.disabled){background-color:#50586e}.pay-button>*:first-child{display:flex;text-align:left}.pay-button>*:last-child{text-align:right}.pay-button>*:first-child,.pay-button>*:last-child{flex:2}.error{color:brown;padding:12px 0}\n';

// src/assets/icon.svg
var icon_default = '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">\r<path d="M21.2283 7.14415C21.2283 8.69651 19.9698 9.95495 18.4174 9.95495C16.8651 9.95495 15.6066 8.69651 15.6066 7.14415C15.6066 5.59178 16.8651 4.33334 18.4174 4.33334C19.9698 4.33334 21.2283 5.59178 21.2283 7.14415Z" fill="url(#paint0_linear_94_1386)"/>\r<path fill-rule="evenodd" clip-rule="evenodd" d="M4.76666 4.80185L10.9221 15.7228V21.6667H15.6068V15.1081C15.6068 14.7052 15.5028 14.3091 15.305 13.958L10.1442 4.80185H4.76666Z" fill="url(#paint1_linear_94_1386)"/>\r<defs>\r<linearGradient id="paint0_linear_94_1386" x1="15.6066" y1="4.33334" x2="21.2519" y2="9.87213" gradientUnits="userSpaceOnUse">\r<stop stop-color="#F0875C"/>\r<stop offset="1" stop-color="#EC5A69"/>\r</linearGradient>\r<linearGradient id="paint1_linear_94_1386" x1="4.76666" y1="4.80185" x2="20.0522" y2="14.4415" gradientUnits="userSpaceOnUse">\r<stop stop-color="#F0875C"/>\r<stop offset="1" stop-color="#EC5A69"/>\r</linearGradient>\r</defs>\r</svg>\r';

// src/util.ts
function makeElem(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function makeStyleElement(css) {
  const style = document.createElement("style");
  style.innerText = css;
  return style;
}
var openSansTag = '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">';
var openSansReady = false;
function initOpenSansFont() {
  if (openSansReady)
    return;
  try {
    document.head.appendChild(makeElem(openSansTag));
    openSansReady = true;
  } catch (e) {
    console.warn("cannot init font", e);
  }
}
function disableButton(button) {
  button.classList.add("disabled");
  button.setAttribute("disabled", "disabled");
}
function postForm(path, params, method = "post") {
  const form = document.createElement("form");
  form.method = method;
  form.action = path;
  form.target = "_blank";
  for (const key of Object.keys(params)) {
    const hiddenField = document.createElement("input");
    hiddenField.type = "hidden";
    hiddenField.name = key;
    hiddenField.value = params[key];
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
}

// src/index.ts
var SmartyPayButton = class {
  constructor(props) {
    this.inited = false;
    if (props.skipCustomFont) {
      this.init(props);
      return;
    }
    initOpenSansFont();
    try {
      document.fonts.ready.then(() => {
        this.init(props);
      });
    } catch (e) {
      console.warn("cannot get fonts ready status", e);
    } finally {
      setTimeout(() => {
        this.init(props);
      }, 800);
    }
  }
  init({
    target,
    lang: langVal,
    apiKey,
    token,
    amount,
    theme
  }) {
    if (this.inited)
      return;
    this.inited = true;
    if (!target) {
      console.warn("cannot find target to render SmartyPayButton");
      return;
    }
    const elem = document.getElementById(target);
    if (!elem) {
      console.warn("cannot find element to render SmartyPayButton:", target);
      return;
    }
    const lang = parseLang(langVal);
    const button = document.createElement("button");
    button.classList.add("pay-button");
    button.appendChild(makeElem(`<span>${icon_default}</span>`));
    button.appendChild(makeElem(`<span>${label(lang)} ${amount && token ? `${amount} ${tokenLabel(token)}` : ""}</span>`));
    button.appendChild(makeElem(`<span></span>`));
    if (theme === "dark") {
      button.classList.add("dark");
    }
    let errorElem;
    if (!apiKey) {
      errorElem = makeErrorParam("apiKey", lang);
    } else if (!token) {
      errorElem = makeErrorParam("token", lang);
    } else if (!amount) {
      errorElem = makeErrorParam("amount", lang);
    }

    console.log('!! elem.attachShadow', elem);

    const root = elem.attachShadow({ mode: "closed" });

    root.appendChild(makeStyleElement(style_default));
    root.appendChild(button);
    if (errorElem) {
      root.appendChild(errorElem);
      disableButton(button);
    } else {
      this.button = button;
      this.callProps = {
        apiKey,
        amount,
        token,
        lang
      };
      let actionId = 0;
      button.addEventListener("click", () => {
        actionId = Math.random();
        const curActionId = actionId;
        setTimeout(() => {
          if (curActionId === actionId) {
            this.click();
          }
        }, 600);
      });
    }
  }
  click() {
    if (!this.button || !this.callProps) {
      return;
    }
    const { apiKey, token, amount, lang } = this.callProps;
    postForm("https://api.smartypay.io/checkout", {
      "api-key": apiKey,
      token,
      amount,
      lang
    });
  }
};
function label(lang) {
  if (lang === "ru")
    return "\u041E\u043F\u043B\u0430\u0442\u0430";
  if (lang === "es")
    return "Pagar";
  return "Pay";
}
function makeErrorParam(key, lang) {
  return makeElem(`<div class="error">${errorParam(key, lang)}</div>`);
}
function errorParam(key, lang) {
  if (lang === "ru")
    return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 "${key}"`;
  if (lang === "es")
    return `Par\xE1metro no v\xE1lido "${key}"`;
  return `Invalid parameter "${key}"`;
}
function tokenLabel(token) {
  if (!token)
    return "";
  if (token.startsWith("bt") || token.startsWith("pm")) {
    return token.substring(2);
  }
  if (token.startsWith("b") || token.startsWith("p")) {
    return token.substring(1);
  }
  return token;
}
export {
  SmartyPayButton
};

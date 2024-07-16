// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"9Ffih":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "e1c2089dfb1914b6";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"cA5Io":[function(require,module,exports) {
// import readline from 'node:readline';
// import express from 'express';
// import fs from 'node:fs/promises';
// import { resolve, dirname } from 'node:path';
// import chokidar from 'chokidar';
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "server", ()=>server);
parcelHelpers.export(exports, "run", ()=>run);
const socket = globalThis?.io?.();
const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");
const resize = ()=>{
    canvas.width = Math.round(document.body.clientWidth - 1);
    canvas.height = Math.round(document.body.clientHeight - 1);
};
resize();
window.onresize = function() {
    resize();
    other();
};
const lineTooLong = 40;
const tap = (...a)=>{
    console.log(...a);
    return a.slice(-1)?.[0];
};
const numberType = (a)=>{
    return {
        type: "number",
        value: +a
    };
};
const comparableType = (a)=>{
    return {
        type: "comparable",
        value: a
    };
};
const boolType = (a)=>{
    return {
        type: "bool",
        value: !!(a || a === 0)
    };
};
const variableType = (a)=>{
    return {
        type: "variable",
        value: "" + a
    };
};
const textType = (a)=>{
    return {
        type: "text",
        value: "" + a?.replace(/\\'/g, "'")
    };
};
const listType = (a)=>{
    return {
        type: "list",
        value: a
    };
};
const dotListType = (a)=>{
    return {
        type: "list",
        value: a,
        dotList: true
    };
};
const mapType = (a)=>{
    return {
        type: "map",
        value: a
    };
};
const eventType = (a)=>{
    return {
        type: "map",
        value: a,
        event: true
    };
};
const parensType = (a)=>{
    return {
        type: "parens",
        value: a
    };
};
const dropType = (a)=>{
    return {
        type: "drop",
        value: a
    };
};
const addIndention = (a)=>{
    return a.join("\n").split("\n").map((x)=>"  " + x)?.join("\n");
};
const splitEveryTwo = (list)=>{
    const list2 = [];
    for(let i = 0; i < list.length - 1; i += 2)list2.push([
        list[i],
        list[i + 1]
    ]);
    return list2;
};
const jsBool = (a)=>{
    return a?.type && ("bool" !== a?.type || a?.value === true) && "error" !== a?.type && "variable" !== a?.type && ("map" !== a?.type || "$" !== Object.keys(a?.value)?.[0]?.[0]);
};
const makeList = (a)=>{
    return listType(a);
};
const makeMap = (a)=>{
    const m = {};
    for(let i = 0; i < a.length; i += 2)m[a[i]?.value] = a[i + 1];
    return mapType(m);
};
const combine = (a, ...b)=>parensType([
        "parens" === a?.type ? a?.value?.[0] : a,
        ...b,
        ..."parens" === a?.type ? a?.value?.slice?.(1) : []
    ]);
const last = (a)=>a?.[a?.length - 1];
const secondLast = (a)=>a?.[a?.length - 2];
const first = (a)=>a?.[0];
const lefts = (a)=>a?.slice(0, -1);
const rights = (a)=>a?.slice(1);
const changeLast = (a, b)=>{
    a[a?.length - 1] = {
        ...b,
        vars: {
            ...a[a?.length - 1]?.vars,
            ...b?.vars
        }
    };
};
const process = {
    argv: []
};
const cmdArgs = rights(rights(process.argv));
const initVars = {
    cmd_args: listType(cmdArgs.map(textType))
};
const subType = (a, bType)=>{
    const aType = a?.type;
    const number = "number" === bType && ("number" === aType || "text" === aType && !!+a?.value);
    const comparable = "comparable" === bType && [
        "comparable",
        "number"
    ].includes(aType);
    const bool = "bool" === bType && "bool" === aType;
    const text = "text" === bType && "text" === aType;
    const list = "list" === bType && [
        "text",
        "list"
    ].includes(aType);
    const map = "map" === bType && [
        "text",
        "list",
        "map"
    ].includes(aType);
    const universal = "universal" === bType && [
        "number",
        "comparable",
        "bool",
        "text",
        "list",
        "map",
        "variable",
        "parens"
    ].includes(aType);
    return number || comparable || bool || text || list || map || universal;
};
const isValid = (text)=>{
    const pairs = {
        "(": ")",
        "{": "}",
        "[": "]",
        "'": "'"
    };
    let stack = [];
    for (let t of text){
        if ([
            "{",
            "[",
            "("
        ].includes(t) || "'" === t && stack[stack.length - 1] !== "'") stack.push(t);
        else if ([
            "}",
            "]",
            ")",
            "'"
        ].includes(t)) {
            if (pairs[stack[stack.length - 1]] === t && stack.length) stack.pop();
            else return false;
        }
    }
    return !stack.length;
};
const core = {
    "+": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>{
            return numberType(a?.slice?.(1).reduce((a, b)=>+a + +(b?.value ?? 0), a?.[0]?.value));
        }
    },
    "-": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>{
            return numberType(a?.slice?.(1).reduce((a, b)=>+a - +(b?.value ?? 0), a?.[0]?.value));
        }
    },
    "*": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(1),
        fn: (a)=>numberType(a?.slice?.(1).reduce((a, b)=>+a * +(b?.value ?? 0), a?.[0]?.value))
    },
    "/": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(1),
        fn: (a)=>numberType(a?.slice?.(1).reduce((a, b)=>+a / (0 === +b?.value ? 1 : +b?.value), a?.[0]?.value))
    },
    max: {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>numberType(Math.max(...a.map((x)=>+x.value)))
    },
    min: {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>numberType(Math.min(...a.map((x)=>+x.value)))
    },
    "%": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>numberType(a?.slice?.(1).reduce((a, b)=>(a % b?.value + b?.value) % b?.value, a?.[0]?.value))
    },
    "^": {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>numberType(a?.slice?.(1).reduce((a, b)=>a ** b?.value, a?.[0]?.value))
    },
    size: {
        argTypes: [
            "text"
        ],
        identityType: textType(""),
        reverse: true,
        fn: ([a])=>{
            if ("mapType" === a?.type) return numberType(a?.value?.length);
            else return numberType(Object.values(a?.value)?.length);
        }
    },
    average: {
        argTypes: [
            "number"
        ],
        identityType: numberType(0),
        fn: (a)=>numberType(a?.slice?.(1).reduce((a, b)=>+a + +(b?.value ?? 0), a?.[0]?.value) / a?.length)
    },
    neg: {
        argTypes: [
            "number"
        ],
        identityType: numberType(0),
        fn: ([a])=>numberType(-a?.value)
    },
    round: {
        argTypes: [
            "number"
        ],
        identityType: numberType(0),
        fn: ([a, b])=>numberType(Math.round(a?.value / (b?.value ?? 1)) * (b?.value ?? 1))
    },
    ...Object.fromEntries([
        "floor",
        "ceil",
        "sqrt",
        "exp",
        "exmp1",
        "sign",
        "trunc",
        "ln10",
        "ln2",
        "log10e",
        "log2e",
        "sqrt1_2",
        "sqrt2",
        "acos",
        "acosh",
        "asin",
        "asinh",
        "atan",
        "atan2",
        "atanh",
        "cbrt",
        "clz32",
        "cos",
        "cosh",
        "hypot",
        "imul",
        "log",
        "log10",
        "log1p",
        "log2",
        "fround",
        "sin",
        "sinh",
        "tan",
        "tanh"
    ].map((x)=>[
            x,
            {
                argTypes: [
                    "number"
                ],
                identityType: numberType(1),
                fn: ([a])=>numberType(Math?.[x]?.(a?.value))
            }
        ])),
    "=": {
        argTypes: [
            "universal",
            "universal"
        ],
        identityType: numberType(1),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && format(f) === format(b), true))
    },
    "!=": {
        argTypes: [
            "universal",
            "universal"
        ],
        identityType: numberType(1),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && format(f) !== format(b), true))
    },
    "&": {
        argTypes: [
            "universal",
            "universal"
        ],
        identityType: numberType(1),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && jsBool(f) && jsBool(b), true))
    },
    "|": {
        argTypes: [
            "universal",
            "universal"
        ],
        identityType: numberType(1),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && jsBool(f) || jsBool(b), true))
    },
    "^^": {
        argTypes: [
            "bool",
            "bool"
        ],
        identityType: numberType(1),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && jsBool(f) && !jsBool(b) || !(a && jsBool(f)) && jsBool(b), true))
    },
    "!": {
        argTypes: [
            "universal"
        ],
        identityType: numberType(1),
        fn: ([a])=>boolType(!jsBool(a))
    },
    ">": {
        argTypes: [
            "comparable",
            "comparable"
        ],
        identityType: textType(""),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && f?.value > b?.value, true))
    },
    ">=": {
        argTypes: [
            "comparable",
            "comparable"
        ],
        identityType: numberType(""),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && f?.value >= b?.value, true))
    },
    "<": {
        argTypes: [
            "comparable",
            "comparable"
        ],
        identityType: numberType(""),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && f?.value < b?.value, true))
    },
    "<=": {
        argTypes: [
            "comparable",
            "comparable"
        ],
        identityType: numberType(""),
        fn: ([f, ...r])=>boolType(r.reduce((a, b)=>a && f?.value <= b?.value, true))
    },
    multiple: {
        argTypes: [
            "number",
            "number"
        ],
        identityType: numberType(0),
        fn: ([a, b])=>boolType(a?.value % b?.value === 0)
    },
    has: {
        argTypes: [
            "list",
            "parens"
        ],
        identityType: listType([]),
        fn: ([r, f], vars)=>{
            if ("parens" === f?.type) return boolType(r?.value?.reduce?.((a, b)=>a || run(parensType([
                    f,
                    b
                ]), vars), false));
            else return boolType(r?.value?.reduce?.((a, b)=>a || format(f) === format(b), false));
        }
    },
    is_type: {
        argTypes: [
            "text",
            "universal"
        ],
        fn: ([a, b])=>boolType(a?.type === b?.value)
    },
    no_size: {
        argTypes: [
            "universal"
        ],
        fn: ([a])=>{
            if ("text" === a?.type || "list" === a?.type) return boolType(a?.value?.length === 0);
            else if ("map" === a?.type) return boolType(Object.values(a?.value)?.length === 0);
        }
    },
    // Text
    regex_replace: {
        argTypes: [
            "text",
            "text",
            "text"
        ],
        fn: ([a, b, c])=>textType(a?.value?.replace(new RegExp(b?.value, "g"), c?.value))
    },
    regex_remove: {
        argTypes: [
            "text",
            "text"
        ],
        fn: ([a, b])=>textType(a?.value?.replace(new RegExp(b?.value, "g"), ""))
    },
    regex_has: {
        argTypes: [
            "text",
            "text"
        ],
        fn: ([a, b])=>boolType(a?.value?.match(new RegExp(b?.value, "g"))?.length > 0)
    },
    type: {
        argTypes: [
            "text"
        ],
        fn: ([a])=>textType(a?.type)
    },
    // to_text
    join: {
        argTypes: [
            "list",
            "text"
        ],
        fn: ([a, b])=>textType(a?.value?.map((x)=>format(x))?.join(b?.value))
    },
    upper: {
        argTypes: [
            "text"
        ],
        identityType: textType(""),
        fn: ([a])=>textType(a?.value.toUpperCase())
    },
    lower: {
        argTypes: [
            "text"
        ],
        fn: ([a])=>textType(a?.value.toLowerCase())
    },
    trim: {
        argTypes: [
            "text"
        ],
        fn: ([a])=>textType(a?.value.trim())
    },
    unit: {
        argTypes: [
            "text"
        ],
        fn: ([a])=>textType("" + (a?.unit ?? ""))
    },
    // List
    flat: {
        argTypes: [
            "text"
        ],
        fn: ([a, b])=>listType(a?.value?.flat(b?.value ?? 1))
    },
    range: {
        argTypes: [
            "number"
        ],
        identityType: numberType(""),
        reverse: true,
        fn: ([finish, start, increment])=>{
            const result = [];
            for(let i = start?.value || 1; i <= finish?.value; i += increment?.value || 1)result.push(numberType(i));
            return listType(result);
        }
    },
    repeat: {
        argTypes: [
            "universal",
            "number"
        ],
        fn: ([a, b])=>{
            if ("text" === a?.type) {
                let result = "";
                for(let i = 0; i < b?.value; i++)result += a?.value;
                return textType(result);
            } else if ("list" === a?.type) {
                let result = [];
                for(let i = 0; i < b?.value; i++)result = result.concat(a?.value);
                return listType(result);
            } else return a;
        }
    },
    split: {
        argTypes: [
            "text",
            "text"
        ],
        fn: ([a, b])=>listType(a?.value.split(b?.value)?.map((x)=>textType(x)))
    },
    split_every: {
        argTypes: [
            "list",
            "number"
        ],
        fn: ([a, b])=>{
            if ("text" === a?.type) {
                const result = [];
                let i = 0;
                while(i < a?.value.length)result.push(textType(a?.value.slice(i, i += b?.value)));
                return listType(result);
            } else if ("list" === a?.type) {
                const result = [];
                let i = 0;
                while(i < a?.value.length)result.push(listType(a?.value.slice(i, i += b?.value)));
                return listType(result);
            } else return a;
        }
    },
    splice: {
        argTypes: [
            "universal",
            "universal",
            "universal",
            "universal"
        ],
        fn: ([a, b, c, d])=>{
            if ("list" === a?.type) {
                const list2 = [
                    ...a?.value
                ];
                if (d) list2.splice(b?.value - 1, c?.value, d);
                else list2.splice(b?.value - 1, c?.value);
                return listType(list2);
            } else {
                const text2 = "variable" === a?.type ? [] : a?.value?.split("");
                if (d) text2.splice(b?.value - 1, c?.value, d?.value);
                else text2.splice(b?.value - 1, c?.value);
                return textType(text2.join(""));
            }
        }
    },
    // to_list
    keys: {
        argTypes: [
            "map"
        ],
        fn: ([a])=>listType(Object.keys(a?.value).map(textType))
    },
    values: {
        argTypes: [
            "map"
        ],
        fn: ([a], vars)=>listType(Object.values(a?.value))
    },
    regex_match: {
        argTypes: [
            "text",
            "text"
        ],
        fn: ([a, b])=>{
            return listType(a?.value?.match(new RegExp(b?.value, "g"))?.map((x)=>textType(x)) ?? []);
        }
    },
    // Map
    "++": {
        argTypes: [
            "universal",
            "universal"
        ],
        identityType: mapType({}),
        fn: (a, vars)=>{
            if ("text" === a?.[0]?.type) return textType(a?.map((x)=>format(compute(x, vars))).join(""));
            else if ("list" === a?.[0]?.type) return listType([].concat(...a?.map((x)=>{
                return "list" === x?.type ? x?.value : [
                    x
                ];
            })));
            else if ("map" === a?.[0]?.type) return mapType(Object.assign({}, ...a?.map((x)=>"variable" === x?.type ? {} : x?.value)));
        }
    },
    // reverse: {
    //
    //   fn: (a) => ,
    // },
    get: {
        argTypes: [
            "map",
            "list"
        ],
        identityType: listType(""),
        fn: ([r, path])=>{
            let result = r;
            for (let p of path?.value){
                if ("list" === result?.type) result = result?.value?.[p?.value - 1];
                else if ("map" === result?.type) result = result?.value?.[p?.value];
                else return variableType("empty");
            }
            return result ?? variableType("empty");
        }
    },
    dotget: {
        complete: true,
        argTypes: [
            "map",
            "list"
        ],
        identityType: listType(""),
        meta: true,
        fn: ([_result, _path], v)=>{
            let result = compute(_result, v);
            const path = compute(_path, v);
            let vars = {
                ...v
            };
            // if (result?.vars) {
            //   vars = { ...vars, ...result?.vars };
            // }
            for (let p of path?.value){
                if ("list" === result?.type) result = result?.value?.[p?.value - 1];
                else if ("map" === result?.type && result?.event) result = compute(parensType([
                    variableType("event"),
                    textType(p?.value),
                    result
                ]), vars);
                else if ("map" === result?.type) result = result?.value?.[p?.value];
                else return variableType("empty");
            // if (result?.vars) {
            //   vars = { ...vars, ...result?.vars };
            // }
            }
            return compute(result, vars) ?? variableType("empty");
        }
    },
    set: {
        argTypes: [
            "universal",
            "universal",
            "universal"
        ],
        identityType: listType(""),
        reverse: true,
        fn: ([c, b, a, x, d], vars)=>{
            return compute(parensType([
                variableType("set_out"),
                a,
                b,
                combine(c, parensType([
                    variableType("get"),
                    a,
                    b
                ]))
            ]), vars);
        }
    },
    set_out: {
        argTypes: [
            "universal",
            "universal",
            "universal"
        ],
        identityType: listType(""),
        fn: ([a, b, c])=>{
            const path = [
                textType("root"),
                ...b?.value
            ];
            const top = mapType({
                root: undefined
            });
            let scopeOld = mapType({
                root: a
            });
            let scopeNew = top;
            for(let i = 0; i < path.length; i++){
                const p = !!+path[i]?.value ? path[i]?.value - 1 : path[i]?.value;
                scopeOld = scopeOld?.value[p];
                if (i === path?.length - 1) {
                    const result = c;
                    scopeNew.value[p] = result;
                } else {
                    if ("list" === scopeOld?.type) scopeNew.value[p] = listType([
                        ...scopeOld?.value
                    ]);
                    else scopeNew.value[p] = mapType({
                        ...scopeOld?.value
                    });
                    scopeNew = scopeNew?.value[p];
                }
            }
            return top?.value?.root;
        }
    },
    remove: {
        fn: ([a])=>boolType(true)
    },
    each: {
        argTypes: [
            "map",
            "universal"
        ],
        identityType: mapType({}),
        fn: ([a, b], vars)=>{
            if ("list" === a.type) {
                const result = parensType([
                    variableType("[]"),
                    ...a?.value?.map((x)=>combine(b, x))
                ]);
                return compute(result, vars);
            } else if ("map" === a.type) return compute(parensType([
                variableType("{}"),
                ...Object.entries(a?.value).map(([k, x])=>{
                    return [
                        variableType(k),
                        combine(b, x)
                    ];
                }).flat()
            ]), vars);
        }
    },
    // ieach: {
    //
    //   fn: (a) => ,
    // },
    // kieach: {
    //
    //   fn: (a) => ,
    // },
    filter: {
        argTypes: [
            "map",
            "universal"
        ],
        fn: ([a, b], vars)=>{
            if ("list" === a.type) {
                const result = run(parensType([
                    variableType("[]"),
                    ...a?.value?.map((x)=>combine(b, x))
                ]), vars);
                // result.vars = vars;
                return run(parensType([
                    variableType("filter_out"),
                    a,
                    result
                ]), vars);
            } else a.type;
        }
    },
    filter_out: {
        fn: ([a, b])=>{
            if ("list" === a.type) return listType(a.value?.filter((x, i)=>b?.value?.[i]?.value));
        }
    },
    // - (ifilter map universal) map
    // - (kifilter map universal) map
    // - (sort map universal) map
    // - (isort map universal) map
    // - (kisort map universal) map
    // - (to_map list) map
    // - (append map universal) map
    // - (prepend map universal) map
    lefts: {
        argTypes: [
            "list"
        ],
        fn: ([a])=>{
            if ("list" === a?.type) return listType(a?.value.slice(0, -1));
            else if ("map" === a?.type) return mapType(Object.fromEntries(Object.entries(a?.value)?.slice?.(0, -1)));
        }
    },
    rights: {
        argTypes: [
            "list"
        ],
        fn: ([a])=>{
            if ("list" === a?.type) return listType(a?.value?.slice?.(1));
            else if ("map" === a?.type) return mapType(Object.fromEntries(Object.entries(a?.value)?.slice?.(1)));
        }
    },
    // - (group list) map
    // universal
    ":": {
        argTypes: [
            "universal"
        ],
        fn: ([a, ...b], vars)=>{
            let result = a;
            for(let i = 0; i < b?.length; i++)result = combine(b[i], result);
            return compute(result, vars);
        }
    },
    first: {
        argTypes: [
            "universal"
        ],
        fn: ([a])=>{
            if ("text" === a?.type) return textType(a?.value?.[0]);
            else if ("list" === a?.type) return a?.value?.[0];
            else if ("map" === a?.type) return Object.entries(a?.value)?.[0]?.[1];
        }
    },
    last: {
        argTypes: [
            "universal"
        ],
        fn: ([a])=>{
            if ("text" === a?.type) return textType(a?.value?.slice(-1)?.[0]);
            else if ("list" === a?.type) return a?.value?.slice(-1)?.[0];
            else if ("map" === a?.type) return Object.entries(a?.value)?.slice(-1)?.[0]?.[1];
        }
    },
    "??": {
        meta: true,
        complete: true,
        argTypes: [
            "universal"
        ],
        fn: ([a, b], vars)=>{
            const computedA = compute(a, vars);
            if (jsBool(computedA)) return computedA;
            else return compute(b, vars);
        }
    },
    "?": {
        meta: true,
        complete: true,
        argTypes: [
            "universal"
        ],
        fn: ([a, b, ...r], vars)=>{
            // let i = 0;
            // while (i < a.length + 10) {
            //   if (i >= a.length - 1) {
            //     return a[i];
            //   } else if (rawBool(a[i])) {
            //     return a[i + 1];
            //   }
            //   i += 2;
            // }
            if (!b) return compute(a, vars);
            else if (jsBool(compute(a, vars)) || !r.length) return compute(b, vars);
            else return compute(parensType([
                variableType("?"),
                ...r
            ]), vars);
        }
    },
    identity: {
        argTypes: [
            "universal"
        ],
        fn: ([a])=>a
    },
    reduce: {
        argTypes: [
            "list",
            "universal"
        ],
        fn: ([a, fn, init], vars)=>{
            let result = init ? run(combine(fn, init, a?.value?.[0]), vars) : run(a?.value?.[0], vars);
            for(let i = 1; i < a?.value?.length; i++)result = run(combine(fn, result, a?.value[i]), vars);
            return result;
        // const x = _a;
        // const a = x?.value;
        // const init = _init;
        // let result = init ? combine(fn, init, a?.[0]) : a?.[0];
        // for (let i = 1; i < a.length; i++) {
        //   result = combine(fn, result, a[i]);
        // }
        // return await run(vars, result);
        }
    },
    let: {
        meta: true,
        argTypes: [
            "universal"
        ],
        fn: (code, v)=>{
            const vars = {
                ...v
            };
            for(let n = 1; n < code?.length; n += 2)vars[code[n - 1]?.value] = code[n];
            return compute(last(code), vars);
        }
    },
    vars: {
        meta: true,
        argTypes: [
            "universal"
        ],
        fn: ([_vars, code], v)=>{
            const vars = compute(_vars, v);
            return compute(code, {
                ...vars?.value,
                ...v
            });
        }
    },
    make_module: {
        meta: true,
        argTypes: [
            "universal"
        ],
        fn: (code, v)=>{
            const vars = {
                ex: parensType([])
            };
            for(let n = 1; n < code?.length; n += 2){
                if ("ex" === code[n - 1]?.value) {
                    vars.ex = parensType([
                        variableType("[]"),
                        ...vars?.ex?.value?.slice(1) ?? [],
                        parensType([
                            variableType("{}"),
                            variableType("actual"),
                            code[n],
                            variableType("expect"),
                            code[n + 1],
                            variableType("passed"),
                            parensType([
                                variableType("="),
                                code[n],
                                code[n + 1]
                            ])
                        ])
                    ]);
                    n++;
                } else if ("variable" !== code[n - 1]?.type) n--;
                else vars[code[n - 1]?.value] = code[n];
            }
            vars.default = last(code);
            for(let k in vars)// const v = { ...vars };
            // delete v[k];
            // vars[k] = parensType([
            //   variableType('vars'),
            //   mapType(v),
            //   vars[k],
            // ]);
            vars[k].moduleVars = vars;
            return mapType(vars);
        }
    },
    module: {
        argTypes: [
            "universal"
        ],
        // meta: true,
        fn: ([a], v)=>{
            const m = modules[a?.value];
            return m;
        }
    },
    "#": {
        meta: true,
        argTypes: [],
        fn: (code, v)=>{
            const values = lefts(lefts(code));
            const variables = secondLast(code);
            if (values?.length >= variables?.value?.length) {
                const vars = {
                    ...v
                };
                for(let i = 0; i < values?.length; i++)vars[variables?.value[i]?.value] = compute(values[i], v);
                last(code).vars = vars;
                return compute(last(code), vars);
            } else return {
                ...parensType([
                    variableType("#"),
                    ...code
                ]),
                vars: v
            };
        }
    },
    "[]": {
        meta: true,
        argTypes: [],
        fn: (a, vars)=>{
            const result = [];
            for(let i = 0; i < a?.length; i++){
                const item = compute(a[i], vars);
                if ("drop" === item?.type) {
                    const item = compute(a[i]?.value, vars);
                    if ("list" === item?.type) result.push(...item?.value);
                    else result.push(item);
                } else result.push(item);
            }
            return listType(result);
        }
    },
    "{}": {
        meta: true,
        argTypes: [],
        fn: (a, vars)=>{
            let m = {};
            for(let i = 0; i < a.length; i += 2)if ("drop" === a[i]?.type) {
                const item = compute(a[i]?.value, vars);
                if ("map" === item?.type) m = {
                    ...m,
                    ...item?.value
                };
                else if ("variable" === a[i]?.value?.type) m[a[i]?.value?.value] = item;
                else m[a[i]?.value] = item;
                i--;
            } else m["parens" === a[i]?.type ? format(compute(a[i], vars)) : a[i]?.value] = compute(a[i + 1], vars);
            return mapType(m);
        }
    },
    event: {
        argTypes: [
            "universal",
            "universal"
        ],
        reverse: true,
        fn: ([user, event, ...args])=>{
            return mapType({
                ["$" + event?.value]: mapType({
                    args: listType(args.reverse()),
                    type: user?.value?.type,
                    auth: user?.value?.auth
                })
            });
        }
    },
    local_user: {
        argTypes: [
            "universal"
        ],
        reverse: true,
        fn: ([events, auth])=>{
            // users.value[auth?.value?.split?.(':')?.[0]] =
            //   permissions;
            return eventType({
                type: textType("local_user"),
                auth,
                events
            });
        }
    },
    client: {
        argTypes: [
            "universal"
        ],
        reverse: true,
        fn: ([events, auth])=>{
            // users.value[auth?.value?.split?.(':')?.[0]] =
            //   permissions;
            return eventType({
                type: textType("client"),
                auth,
                events
            });
        }
    },
    server: {
        argTypes: [
            "universal"
        ],
        reverse: true,
        fn: ([events, auth, url])=>{
            // users.value[auth?.value?.split?.(':')?.[0]] =
            //   permissions;
            return eventType({
                type: textType("server"),
                auth,
                events,
                url
            });
        }
    }
};
// const users = mapType({});
const format = (a, parent)=>{
    if ("number" === a?.type) return "" + a?.value; // + (a?.unit ? a?.unit : '');
    else if ("comparable" === a?.type) {
        if (Infinity === a?.value) return "infinity";
        else if (-Infinity === a?.value) return "-infinity";
    } else if ("bool" === a?.type) return "" + a?.value;
    else if ("text" === a?.type) {
        if (parent) return `'${a?.value}'`;
        else return a?.value;
    } else if ("variable" === a?.type) return a?.value;
    else if ("list" === a?.type) {
        if (a?.dotList) return `.${a?.value?.map((x)=>x.value)?.join(".")}`;
        else {
            const data = a?.value?.map((x)=>format(x, "list"));
            if (data?.join(" ").length > lineTooLong) // tap('too long');
            return `[\n${addIndention(data)}\n]`;
            else return `[ ${data?.join(" ")} ]`;
        }
    } else if ("map" === a?.type) {
        const data = Object.entries(a?.value)?.map(([k, v])=>`${k} ${format(v, "map")}`);
        if (data?.join(" ").length > lineTooLong) return `{\n${addIndention(data)}\n}`;
        else return `{ ${data?.join(" ")} }`;
    } else if ("parens" === a?.type) {
        if (a?.value?.[0]?.value === "file") return splitEveryTwo(a?.value?.slice(1).map((x)=>format(x, "parens"))).map((x)=>x.join(" ")).join("\n\n");
        else if (a?.value?.[0]?.value === "#") return `(# ${a?.value?.slice(1)?.map((x)=>format(x))?.join(" ")})`;
        else if (a?.value?.[0]?.value === "[]") return "%" + format(makeList(a?.value?.slice(1)));
        else if (a?.value?.[0]?.value === "{}") return "%" + format(makeMap(a?.value?.slice(1)));
        else if (a?.value?.[0]?.value === "dotget") return `${format(a?.value?.[1])}${format(a?.value?.[2])}`;
        else return `(${a?.value?.map((x)=>format(x, "parens"))?.join(" ")})`;
    } else if ("error" === a?.type) return `ERROR: ${a?.value}`;
    else if (undefined === a || isNaN(a)) return "empty";
};
const tokens = (code)=>{
    let tokens = [];
    let charGroup = "";
    const codeSplit = code.split("");
    for(let i = 0; i < codeSplit.length; i++){
        const char = codeSplit?.[i];
        if ("\\" === char && [
            "(",
            ")",
            "'",
            "\\"
        ].includes(codeSplit?.[i + 1])) {
            charGroup += codeSplit?.[i + 1];
            i++;
        } else if ([
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "\n",
            "'",
            " "
        ].includes(char)) {
            if (charGroup) {
                if ("@" === charGroup?.[0]) {
                    tokens.push("@");
                    if (charGroup.slice(1)) tokens.push(charGroup.slice(1));
                } else if ("_" === charGroup?.[0]) {
                    tokens.push("event");
                    if (charGroup.slice(1)) tokens.push(charGroup.slice(1));
                } else if ("..." === charGroup.slice(0, 3)) {
                    tokens.push("...");
                    if (charGroup.slice(3, Infinity)) tokens.push(charGroup.slice(3, Infinity));
                } else tokens.push(charGroup);
                charGroup = "";
            }
            if ([
                " ",
                "\n"
            ].includes(char)) tokens.push(char);
            else tokens.push({
                bracket: char
            });
        } else charGroup += char;
    }
    return tokens;
};
const nestTokens = (tokens)=>{
    let groups = [
        []
    ];
    let drop = 0;
    let dropLength = -1;
    for(let i = 0; i < tokens?.length; i++){
        const token = tokens[i];
        if (1 === drop && dropLength === groups?.length) drop++;
        else if (2 === drop && dropLength === groups?.length) {
            const pop = groups.pop();
            last(groups).push(pop);
            drop = 0;
            dropLength = -1;
        }
        if ("'" === token?.bracket && last(groups)?.[0] !== "'") groups.push([
            "'"
        ]);
        else if ("(" === token?.bracket) groups.push([]);
        else if ("[" === token?.bracket) groups.push([
            "[]"
        ]);
        else if ("{" === token?.bracket) groups.push([
            "{}"
        ]);
        else if ([
            "@",
            "..."
        ].includes(token)) {
            groups.push([
                "@"
            ]);
            dropLength = groups?.length;
            drop = 1;
        } else if ([
            ")",
            "}",
            "]",
            "'"
        ].includes(token?.bracket)) {
            const pop = groups.pop();
            last(groups).push(pop);
        } else if ([
            " ",
            "\n"
        ].includes(token)) {
            if (first(last(groups)) === "'") last(groups).push(token);
        } else last(groups).push(token);
    // console.log(groups);
    }
    return groups?.[0]?.[0];
};
const parseText = (nestedTokens)=>{
    let text = "";
    let group = [
        variableType("++")
    ];
    let concat = false;
    for (let pa of nestedTokens.slice(1))if (Array.isArray(pa)) {
        concat = true;
        group.push(textType(text));
        group.push(ast(pa));
        text = "";
    } else text += pa;
    group.push(textType(text));
    return concat ? parensType(group) : textType(text);
};
const ast = (nestedTokens)=>{
    if (Array.isArray(nestedTokens)) {
        if ("'" === nestedTokens?.[0]) return parseText(nestedTokens);
        else if ("@" === nestedTokens?.[0]) return dropType(ast(nestedTokens?.[1]));
        else if ("#" === nestedTokens?.[0]) {
            const middle = lefts(rights(nestedTokens)).map(ast);
            const hashIndex = middle.findIndex((x)=>"#" === x?.value);
            if (-1 === hashIndex) return parensType([
                variableType("#"),
                listType(middle),
                ast(last(nestedTokens))
            ]);
            else return parensType([
                variableType("#"),
                listType(middle.slice(0, hashIndex)),
                parensType([
                    variableType("let"),
                    ...middle.slice(hashIndex + 1, Infinity),
                    ast(last(nestedTokens))
                ])
            ]);
        } else return parensType(nestedTokens.map(ast));
    } else if ("true" === nestedTokens) return boolType(true);
    else if ("false" === nestedTokens) return boolType(false);
    else if ("infinity" === nestedTokens) return comparableType(Infinity);
    else if ("-infinity" === nestedTokens) return comparableType(-Infinity);
    else if ("tau" === nestedTokens) return numberType(Math.PI * 2);
    else if ("pi" === nestedTokens) return numberType(Math.PI);
    else if ("euler" === nestedTokens) return numberType(Math.E);
    else if ("_time" === nestedTokens) return mapType({
        _time: listType([])
    });
    else if ("..." === nestedTokens) return variableType("...");
    else if ((+nestedTokens.replace(/_/g, "") || 0 === +nestedTokens.replace(/_/g, "")) && "." !== nestedTokens?.[0]) return numberType(nestedTokens.replace(/_/g, ""));
    else if (/\./g.test(nestedTokens?.[0])) return dotListType(nestedTokens.split(".")?.slice(1)?.map(textType));
    else if (!/[0-9]/.test(nestedTokens?.[0]) && /\./g.test(nestedTokens)) {
        const x = nestedTokens.split(".");
        return parensType([
            variableType("dotget"),
            variableType(x?.[0]),
            dotListType(x?.slice(1)?.map(textType))
        ]);
    } else return variableType(nestedTokens);
};
const parse = (t)=>{
    return ast(nestTokens(tokens(t?.replace(/;.+\n/g, ""))));
};
const deref = (code, vars)=>{
    if ("variable" === code?.type && vars?.[code?.value]) {
        let v = vars?.[code?.value];
        while("variable" === v?.type && vars?.[v?.value])v = vars?.[v?.value];
        return v;
    } else return code;
};
const compute = (code, v)=>{
    const vars = code?.moduleVars ? code?.moduleVars : {
        ...v,
        ...code?.vars
    };
    if (code?.type === "parens") {
        const fn2 = deref(first(code?.value), vars);
        const fn = "parens" === fn2?.type && "dotget" === fn2?.value?.[0]?.value ? compute(fn2, vars) : fn2;
        if ("parens" === fn?.type) return compute(parensType([
            first(fn?.value),
            ...rights(code?.value),
            ...rights(fn?.value)
        ]), fn?.moduleVars ? fn?.moduleVars : {
            ...vars,
            ...fn?.vars
        });
        else if ("list" === fn?.type && fn?.dotList) {
            if (rights(code?.value)?.length >= 2) {
                const args = rights(code?.value)?.reverse();
                return compute(parensType([
                    variableType("set"),
                    args?.[1],
                    fn,
                    args?.[0]
                ]), vars);
            } else return code;
        } else if ("variable" === fn?.type && core?.[fn?.value]) {
            const c = core?.[fn?.value];
            const args = rights(code?.value).flatMap((arg)=>{
                if (c?.meta) return arg;
                else {
                    const a = compute(arg, vars);
                    if ("drop" === a?.type) {
                        const b = compute(a?.value, vars);
                        if ("list" === b?.type) return b?.value;
                        else return b;
                    } else return a;
                }
            });
            if (args?.length >= c.argTypes?.length) return c?.fn?.(c?.reverse ? args.reverse() : args, {
                ...vars
            });
            else return code;
        } else return fn;
    } else if ("variable" === code?.type && vars?.[code?.value]) return compute(deref(code, vars), vars);
    else return code;
};
globalThis.$ = mapType({});
// const folder = process.argv[2]
//   ? dirname(resolve(process.argv[2]))
//   : process.cwd();
const folder = "";
const isHttp = (a)=>"https://" === a?.slice(0, 8) || "http://" === a?.slice(0, 7);
const effects = {
    random: {
        fn: ([b, a], p, k, cb)=>{
            tap("bbb", b, a);
            const aa = jsBool(a?.value) ? a?.value : 1;
            p[k] = numberType(Math.floor(Math.random() * (b?.value - aa + 1) + aa));
            cb();
        }
    },
    time: {
        fn: ([], p, k, cb)=>{
            p[k] = textType(new Date().toISOString());
        }
    },
    timer: {
        fn: ([b, a], p, k, cb)=>{
            setTimeout(()=>{
                p[k] = boolType(true);
                cb();
                setState(parensType([
                    module?.value?.["$" + b?.value],
                    $
                ]));
            }, (a?.value ?? 1) * 1000);
        }
    },
    interval: {
        fn: ([b, a], p, k, cb)=>{
            setInterval(()=>{
                p[k] = boolType(true);
                cb();
                setState(parensType([
                    module?.value?.["$" + b?.value],
                    $
                ]));
            }, (a?.value ?? 1) * 1000);
        }
    },
    alert: {
        fn: ([a], p, k, cb)=>{
            p[k] = boolType(true);
            alert(a?.value);
            cb();
        }
    },
    identity: {
        fn: ([a], p, k, cb)=>{
            cb();
        }
    }
};
const localUser = ($key, key, args, parent, upKey)=>{
    if (module?.value?.[$key]) {
        parent[upKey] = boolType(true);
        other();
        setState(parensType([
            module?.value?.[$key],
            ...args,
            $
        ]));
    } else if (effects?.[key]) effects?.[key]?.fn(args, parent, upKey, ()=>{
        other();
    });
    else socket.emit(key, args, (a)=>{
        parent[upKey] = a;
        other();
    });
};
const runEvents = (input, parent, upKey)=>{
    if (input?.type === "list") for(let i = 0; i < input?.value.length; i++)runEvents(input?.value[i], input?.value, i);
    else if (input?.type === "map") {
        for(let $key in input?.value)if ("$" === $key?.[0] && input?.value[$key]?.value?.auth) {
            const auth = input.value[$key].value.auth;
            delete input.value[$key].value.auth;
            const key = $key.slice(1);
            const args = input?.value[$key]?.value?.args?.value?.reverse();
            if ("local_user" === input.value[$key]?.value?.type?.value) {
                tap("2");
                localUser($key, key, args, parent, upKey);
            } else if ("client" === input.value[$key]?.value?.type?.value) socket.emit("client", textType(key), args, auth, ()=>{});
            else if ("server" === input.value[$key]?.value?.type?.value) socket.emit("server", textType(key), args, auth, ()=>{});
        } else runEvents(input?.value[$key], input?.value, $key);
    }
};
const setState = (code, cb)=>{
    $ = compute(code);
    runEvents($, {}, "x");
    other();
};
let started = false;
globalThis.blocks = [];
const drawBlock = (block, _x, _y, _w, _h, parentOptions)=>{
    if ("list" === block?.type) {
        const has_options = "map" === block?.value?.[0]?.type;
        const options = has_options ? block?.value?.[0]?.value : {};
        const bv = has_options ? block?.value?.slice(1) : block?.value;
        const x = options?.x ? options?.x?.value : _x;
        const y = options?.y ? options?.y?.value : _y;
        const w = options?.w ? options?.w?.value : _w;
        const h = options?.h ? options?.h?.value : _h;
        const padding = options?.p?.value ?? 0;
        const paddingv = options?.pv?.value ?? padding;
        const paddingh = options?.ph?.value ?? padding;
        const gap = options?.gap?.value ?? 0;
        const type = options?.t?.value;
        const border = options?.b?.value;
        const click = options?.click;
        if (click) blocks.unshift({
            x,
            y,
            w,
            h,
            click
        });
        tap(block, x, y, w, h);
        if (border) {
            c.strokeStyle = "black";
            c.lineWidth = border;
            if (options?.r) {
                c.beginPath();
                c.roundRect(x, y, w, h, options?.r?.value);
                c.stroke();
            } else c.strokeRect(x, y, w, h);
        }
        if ("content" === type) {
            let sectionY = 0;
            for (let b of bv){
                sectionY += drawBlock(b, x + padding, y + sectionY + padding, w - padding * 2, h, options);
                tap(sectionY);
            }
            return h;
        } else if ("rows" === type) {
            const sectionH = (h - paddingv * 2 - gap * (bv?.length - 1)) / bv?.length;
            let sectionY = paddingv;
            for (let b of bv){
                drawBlock(b, x + paddingh, y + sectionY, w - paddingh * 2, sectionH, options);
                sectionY += sectionH + gap;
            }
            return h;
        } else {
            const sectionW = (w - paddingh * 2 - gap * (bv?.length - 1)) / bv?.length;
            let sectionX = paddingh;
            for (let b of bv){
                drawBlock(b, x + sectionX, y + paddingv, sectionW, h - paddingv * 2, options);
                sectionX += sectionW + gap;
            }
            return h;
        }
    } else {
        const s = parentOptions?.font_size ? parentOptions?.font_size?.value : 20;
        // window
        //     .getComputedStyle(document.body)
        //     .fontSize?.slice(0, -2);
        c.font = s + "px Arial";
        tap("w", _w, c.measureText(block?.value)?.width);
        tap(parentOptions);
        tap("kj", _w, _w / 2 - c.measureText(block?.value)?.width / 2 + _x, c.measureText(block?.value)?.width / 2, block?.value);
        const x = "center" === parentOptions?.hz?.value ? _w / 2 - c.measureText(block?.value)?.width / 2 + _x : "right" === parentOptions?.hz?.value ? _w + _x - c.measureText(block?.value)?.width : _x;
        const y = "center" === parentOptions?.vt?.value ? _h / 2 - s + _y : _y;
        c.fillText(block?.value, x, y + s - 5);
        return 24;
    }
};
const view = ()=>{
    c.clearRect(0, 0, canvas.width, canvas.height);
    const lastView = compute(parensType([
        module?.value?.$view,
        $
    ]));
    blocks = [];
    drawBlock(lastView, 0, 0, canvas.width, canvas.height);
};
const lastView = mapType({});
const other = ()=>{
    if ($?.value?.log) {
        console.log(format($?.value?.log));
        delete $?.value?.log;
    }
    if (module?.value?.$view) view();
    if (!started && module?.value?.$start && !stillMore($)) {
        started = true;
        setState(parensType([
            module?.value?.$start,
            $
        ]));
    }
};
const stillMore = (input)=>{
    if (input?.type === "list") {
        let n = 0;
        for(let i = 0; i < input?.value.length; i++)n += stillMore(input?.value[i]);
        return n;
    } else if (input?.type === "map") {
        let n = 0;
        for(let key in input?.value)if ("$" === key?.[0]) n++;
        else n += stillMore(input?.value[key]);
        return n;
    } else return 0;
};
let server = "";
const clients = [];
const servers = [];
const modules = {};
const run = async (text)=>{
    globalThis.mod = compute(parse(`(make_module ${text})`));
    // const ex = compute(module?.value?.ex, );
    // ex?.value.map((ex) => {
    //   if (!ex?.value?.passed?.value) {
    //     console.log(
    //       'ex',
    //       format(ex?.value?.actual),
    //       format(ex?.value?.expect)
    //     );
    //   }
    // });
    // {
    //   for (let k in module?.value) {
    //     const v = module?.value?.[k]?.value;
    //     const fn = v?.[0]?.value;
    //     if ('client' === fn) {
    //       const c = v?.slice(1).map((x) => compute(x));
    //       clients.push(
    //         mapType({
    //           auth: c?.[0],
    //           events: c?.[1],
    //         })
    //       );
    //     } else if ('server' === fn) {
    //       const s = v?.slice(1).map((x) => compute(x));
    //       servers.push(
    //         mapType({
    //           url: s?.[0],
    //           auth: s?.[1],
    //           events: s?.[2],
    //         })
    //       );
    //     } else if ('module' === fn) {
    //       await new Promise((res, rej) => {
    //         socket.emit('get', [v?.[1]], (text) => {
    //           const m = compute(
    //             parse(`(make_module ${text?.value})`)
    //           );
    //           modules[v?.[1]?.value] = m;
    //           res();
    //         });
    //       });
    //     }
    //   }
    //   socket.emit('clients_servers', { clients, servers });
    // }
    tap(format(compute(mod?.value?.default)));
// setState(mod?.value?.$ ?? $);
// socket?.on?.('event', ({ event, args }) => {
//   tap('what', event, args);
//   $.value.$$$ev = mapType({
//     ['$' + event?.value]: mapType({
//       args: listType(args),
//       auth: textType('what:1234'),
//       type: textType('local_user'),
//     }),
//   });
//   tap($);
//   setState($);
//   other();
// });
// if (module?.value?._server) {
//   const app = express();
//   app.get('/:input', async (req, res) => {
//     const go = () => {
//       $ = compute(
//         parensType([
//           module?.value?._server,
//           $,
//           // textType(req?.params?.input),
//           // textType(''),
//         ]),
//
//       );
//       runEvents2($, () => {
//         if ($?.value?.out) {
//           res.send(format($?.value?.out));
//           delete $?.value?.out;
//         } else {
//           go();
//         }
//       });
//     };
//     go();
//   });
//   server = app.listen(3005, () => {
//     // console.log(`Server started`);
//   });
// }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["9Ffih","cA5Io"], "cA5Io", "parcelRequire132e")

//# sourceMappingURL=core.js.map

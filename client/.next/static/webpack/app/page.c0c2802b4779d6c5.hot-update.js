"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/utils/constants.ts":
/*!********************************!*\
  !*** ./src/utils/constants.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ICONS: () => (/* binding */ ICONS),\n/* harmony export */   IMAGES: () => (/* binding */ IMAGES),\n/* harmony export */   PAGES: () => (/* binding */ PAGES),\n/* harmony export */   formFeedback: () => (/* binding */ formFeedback)\n/* harmony export */ });\nconst ICONS = {\n    users: \"/icons/users_icon.svg\",\n    upload: \"/icons/upload.svg\"\n};\nconst IMAGES = {\n    logo: \"/logo.png\",\n    profilePlaceholder: \"/profile_placeholder.png\",\n    companyLogo: \"/logo_sample.svg\"\n};\nconst PAGES = {\n    index: \"/\",\n    home: \"/home\",\n    auth: {\n        validateUser: \"/auth/validate-user\",\n        forgotPassword: \"/forgot-password\"\n    },\n    dashboard: {\n        index: \"/dashboard\"\n    }\n};\nconst formFeedback = {\n    required: \"This field is required\",\n    invalidEmail: \"Please enter a valid email\"\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9jb25zdGFudHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFPLE1BQU1BLFFBQVE7SUFDbkJDLE9BQU87SUFDUEMsUUFBUTtBQUNWLEVBQUU7QUFFSyxNQUFNQyxTQUFTO0lBQ3BCQyxNQUFNO0lBQ05DLG9CQUFvQjtJQUNwQkMsYUFBYTtBQUNmLEVBQUU7QUFFSyxNQUFNQyxRQUFRO0lBQ25CQyxPQUFPO0lBQ1BDLE1BQU07SUFDTkMsTUFBTTtRQUNKQyxjQUFjO1FBQ2RDLGdCQUFnQjtJQUNsQjtJQUNBQyxXQUFXO1FBQ1RMLE9BQU87SUFDVDtBQUNGLEVBQUU7QUFFSyxNQUFNTSxlQUFlO0lBQzFCQyxVQUFVO0lBQ1ZDLGNBQWM7QUFDaEIsRUFBRSIsInNvdXJjZXMiOlsiL1VzZXJzL21hYy9EZXNrdG9wL3dvcmtzcGFjZS9jb214L2NsaWVudC9zcmMvdXRpbHMvY29uc3RhbnRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBJQ09OUyA9IHtcbiAgdXNlcnM6IFwiL2ljb25zL3VzZXJzX2ljb24uc3ZnXCIsXG4gIHVwbG9hZDogXCIvaWNvbnMvdXBsb2FkLnN2Z1wiLFxufTtcblxuZXhwb3J0IGNvbnN0IElNQUdFUyA9IHtcbiAgbG9nbzogXCIvbG9nby5wbmdcIixcbiAgcHJvZmlsZVBsYWNlaG9sZGVyOiBcIi9wcm9maWxlX3BsYWNlaG9sZGVyLnBuZ1wiLFxuICBjb21wYW55TG9nbzogXCIvbG9nb19zYW1wbGUuc3ZnXCIsXG59O1xuXG5leHBvcnQgY29uc3QgUEFHRVMgPSB7XG4gIGluZGV4OiBcIi9cIixcbiAgaG9tZTogXCIvaG9tZVwiLFxuICBhdXRoOiB7XG4gICAgdmFsaWRhdGVVc2VyOiBcIi9hdXRoL3ZhbGlkYXRlLXVzZXJcIixcbiAgICBmb3Jnb3RQYXNzd29yZDogXCIvZm9yZ290LXBhc3N3b3JkXCIsXG4gIH0sXG4gIGRhc2hib2FyZDoge1xuICAgIGluZGV4OiBcIi9kYXNoYm9hcmRcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtRmVlZGJhY2sgPSB7XG4gIHJlcXVpcmVkOiBcIlRoaXMgZmllbGQgaXMgcmVxdWlyZWRcIixcbiAgaW52YWxpZEVtYWlsOiBcIlBsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsXCIsXG59O1xuIl0sIm5hbWVzIjpbIklDT05TIiwidXNlcnMiLCJ1cGxvYWQiLCJJTUFHRVMiLCJsb2dvIiwicHJvZmlsZVBsYWNlaG9sZGVyIiwiY29tcGFueUxvZ28iLCJQQUdFUyIsImluZGV4IiwiaG9tZSIsImF1dGgiLCJ2YWxpZGF0ZVVzZXIiLCJmb3Jnb3RQYXNzd29yZCIsImRhc2hib2FyZCIsImZvcm1GZWVkYmFjayIsInJlcXVpcmVkIiwiaW52YWxpZEVtYWlsIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/constants.ts\n"));

/***/ })

});
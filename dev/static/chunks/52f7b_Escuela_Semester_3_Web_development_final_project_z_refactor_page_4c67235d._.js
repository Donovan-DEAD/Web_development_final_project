(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/material/esm/Snackbar/Snackbar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/material/esm/Alert/Alert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/material/esm/IconButton/IconButton.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/icons-material/esm/Close.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/material/esm/Typography/Typography.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// Custom Alert component to match existing CSS classes if needed
const Alert = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].forwardRef(function Alert(props, ref) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "b67e943a8f1582515dd69d82d117793731c406b3abd7e624c491b2ad724c12bb") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b67e943a8f1582515dd69d82d117793731c406b3abd7e624c491b2ad724c12bb";
    }
    let t0;
    if ($[1] !== props || $[2] !== ref) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Alert$2f$Alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            elevation: 6,
            ref: ref,
            variant: "filled",
            ...props
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 29,
            columnNumber: 10
        }, this);
        $[1] = props;
        $[2] = ref;
        $[3] = t0;
    } else {
        t0 = $[3];
    }
    return t0;
});
_c = Alert;
const Toast = (t0)=>{
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "b67e943a8f1582515dd69d82d117793731c406b3abd7e624c491b2ad724c12bb") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b67e943a8f1582515dd69d82d117793731c406b3abd7e624c491b2ad724c12bb";
    }
    const { message, severity: t1, duration: t2 } = t0;
    const severity = t1 === undefined ? "error" : t1;
    const duration = t2 === undefined ? 5000 : t2;
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t3;
    let t4;
    if ($[1] !== message) {
        t3 = ()=>{
            if (message) {
                setOpen(true);
            }
        };
        t4 = [
            message
        ];
        $[1] = message;
        $[2] = t3;
        $[3] = t4;
    } else {
        t3 = $[2];
        t4 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = (event, reason)=>{
            if (reason === "clickaway") {
                return;
            }
            setOpen(false);
        };
        $[4] = t5;
    } else {
        t5 = $[4];
    }
    const handleClose = t5;
    if (!message) {
        return null;
    }
    let t6;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$IconButton$2f$IconButton$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            size: "small",
            "aria-label": "close",
            color: "inherit",
            onClick: handleClose,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Close$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fontSize: "small"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
                lineNumber: 89,
                columnNumber: 92
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[5] = t6;
    } else {
        t6 = $[5];
    }
    const action = t6;
    let t7;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = {
            vertical: "top",
            horizontal: "center"
        };
        $[6] = t7;
    } else {
        t7 = $[6];
    }
    let t8;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            width: "100%"
        };
        $[7] = t8;
    } else {
        t8 = $[7];
    }
    let t9;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        };
        $[8] = t9;
    } else {
        t9 = $[8];
    }
    let t10;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = {
            fontWeight: "bold"
        };
        $[9] = t10;
    } else {
        t10 = $[9];
    }
    const t11 = severity === "error" ? "Error" : "Message";
    let t12;
    if ($[10] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            sx: t9,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    variant: "body1",
                    sx: t10,
                    children: [
                        t11,
                        " "
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
                    lineNumber: 138,
                    columnNumber: 24
                }, ("TURBOPACK compile-time value", void 0)),
                action
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 138,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[10] = t11;
        $[11] = t12;
    } else {
        t12 = $[11];
    }
    let t13;
    if ($[12] !== message) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Typography$2f$Typography$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            variant: "body2",
            className: "toast-body",
            children: message
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 146,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[12] = message;
        $[13] = t13;
    } else {
        t13 = $[13];
    }
    let t14;
    if ($[14] !== severity || $[15] !== t12 || $[16] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Alert, {
            onClose: handleClose,
            severity: severity,
            sx: t8,
            className: "toast-header",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 154,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[14] = severity;
        $[15] = t12;
        $[16] = t13;
        $[17] = t14;
    } else {
        t14 = $[17];
    }
    let t15;
    if ($[18] !== duration || $[19] !== open || $[20] !== t14) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Snackbar$2f$Snackbar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            open: open,
            autoHideDuration: duration,
            onClose: handleClose,
            anchorOrigin: t7,
            children: t14
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0));
        $[18] = duration;
        $[19] = open;
        $[20] = t14;
        $[21] = t15;
    } else {
        t15 = $[21];
    }
    return t15;
};
_s(Toast, "e27cRtNMdAs0U0o1oHlS6A8OEBo=");
_c1 = Toast;
const __TURBOPACK__default__export__ = Toast;
var _c, _c1;
__turbopack_context__.k.register(_c, "Alert");
__turbopack_context__.k.register(_c1, "Toast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/IAToast.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/Toast.tsx [app-client] (ecmascript)"); // Assuming Toast.tsx is in the same directory
"use client";
;
;
;
const IAToast = (t0)=>{
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "1262e3274978ee1cbc5f3b50cc715450fd98f10496c8d4b43e9188a6ddf2dc1e") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1262e3274978ee1cbc5f3b50cc715450fd98f10496c8d4b43e9188a6ddf2dc1e";
    }
    const { message, severity: t1 } = t0;
    const severity = t1 === undefined ? "info" : t1;
    let t2;
    if ($[1] !== message || $[2] !== severity) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            message: message,
            severity: severity
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/IAToast.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, ("TURBOPACK compile-time value", void 0));
        $[1] = message;
        $[2] = severity;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
};
_c = IAToast;
const __TURBOPACK__default__export__ = IAToast;
var _c;
__turbopack_context__.k.register(_c, "IAToast");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/camera_icon.ab3a97b8.svg");}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg.mjs { IMAGE => \"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 800,
    height: 800,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/upload_icon.05ff0397.svg");}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg.mjs { IMAGE => \"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 800,
    height: 800,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/image_upload_already.a98166ab.svg");}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg.mjs { IMAGE => \"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 24,
    height: 24,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/bulb_icon.1cd9b154.svg");}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg.mjs { IMAGE => \"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 800,
    height: 800,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IaAssistanceWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$IAToast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/IAToast.tsx [app-client] (ecmascript)"); // Using the IAToast wrapper
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/image.js [app-client] (ecmascript)");
// Image imports
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg.mjs { IMAGE => "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/camera_icon.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg.mjs { IMAGE => "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/upload_icon.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg.mjs { IMAGE => "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/image_upload_already.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg.mjs { IMAGE => "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/public/images/bulb_icon.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function IaAssistanceWrapper() {
    _s();
    const [context, setContext] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [imageFile, setImageFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [toastMessage, setToastMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleFileChange = (event)=>{
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.size > 10 * 1024 * 1024) {
                // 10MB limit
                setToastMessage('La imagen excede el límite de 10MB.');
                setImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
                return;
            }
            setImageFile(file);
            setToastMessage(null);
        }
    };
    const handleSubmit = async (event_0)=>{
        event_0.preventDefault();
        setToastMessage(null); // Clear previous messages
        if (!context && !imageFile) {
            setToastMessage('Favor de proporcionar un contexto o una imagen.');
            return;
        }
        const formData = new FormData();
        if (context) {
            formData.append('context', context);
        }
        if (imageFile) {
            formData.append('image', imageFile);
        }
        try {
            const response = await fetch('/api/ai/consult', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('AI Consultation Response:', data);
            if (response.ok) {
                sessionStorage.setItem('iaResponseData', JSON.stringify(data));
                router.push('/ia-response');
            } else {
                setToastMessage(data.message || 'Hubo un error al procesar la solicitud.');
            }
        } catch (error) {
            console.error('Error submitting AI consultation:', error);
            setToastMessage('Error de red o del servidor. Por favor, inténtalo de nuevo.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            toastMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$IAToast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                message: toastMessage,
                severity: "error"
            }, void 0, false, {
                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                lineNumber: 67,
                columnNumber: 24
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "ai__assistance__main",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ai_assistance__header__container",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "ai_assistance__header__title",
                                children: "Asesoría IA Agrícola"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "ai_assistance__header__description",
                                children: "Sube una imagen de tu cultivo y obtén recomendaciones personalizadas"
                            }, void 0, false, {
                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "ai-form",
                        className: "ai__assistance__form__container",
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai__assistance__form__container__left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai__assistance__form__container__left__title",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$camera_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                alt: "Camera Icon",
                                                width: 30,
                                                height: 30
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 79,
                                                columnNumber: 15
                                            }, this),
                                            "Imagen del cultivo"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 78,
                                        columnNumber: 13
                                    }, this),
                                    !imageFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "upload-initial-state",
                                        className: "ai__assistance__form__container__left__container",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "ai__assistance__form__container__left__container__img",
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$upload_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                alt: "Upload Icon",
                                                width: 40,
                                                height: 40
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 84,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "ai__assistance__form__container__left__container__title",
                                                children: "Sube una imagen de tu cultivo"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 85,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ai__assistance__form__container__left__container__description",
                                                children: "PNG, JPG hasta 10MB"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "image-upload",
                                                className: "ai__assistance__form__container__left__container__button",
                                                children: "Seleccionar imagen"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "image-upload",
                                                type: "file",
                                                accept: "image/*",
                                                style: {
                                                    display: 'none'
                                                },
                                                name: "image",
                                                onChange: handleFileChange,
                                                ref: fileInputRef
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 94,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 83,
                                        columnNumber: 27
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "upload-finished-state",
                                        className: "ai__assistance__form__container__left__container",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "ai__assistance__form__container__left__container__img",
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$image_upload_already$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                alt: "Image Uploaded Icon",
                                                width: 40,
                                                height: 40
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 98,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                id: "file-name",
                                                className: "ai__assistance__form__container__left__container__title",
                                                children: imageFile.name
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "ai__assistance__form__container__left__container__description",
                                                children: "PNG, JPG hasta 10MB"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "image-upload",
                                                className: "ai__assistance__form__container__left__container__button",
                                                children: "Cambiar imagen"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 105,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "image-upload",
                                                type: "file",
                                                accept: "image/*",
                                                style: {
                                                    display: 'none'
                                                },
                                                name: "image",
                                                onChange: handleFileChange,
                                                ref: fileInputRef
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 108,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 97,
                                        columnNumber: 24
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ai__assistance__form__container__right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "ai__assistance__form__container__right__title",
                                        children: "Contexto de la situacion"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "context",
                                        className: "ai__assistance__form__container__right__input",
                                        rows: 4,
                                        cols: 50,
                                        name: "context",
                                        placeholder: "Describe la situacion de tu cultivo: síntomas observados, condiciones climaticas, tipo de suelo, tratamientos previos...",
                                        value: context,
                                        onChange: (e)=>setContext(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "ai__assistance__form__container__right__button",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "ai__assistance__form__container__right__button__img",
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$public$2f$images$2f$bulb_icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                alt: "Bulb Icon",
                                                width: 20,
                                                height: 20
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                                lineNumber: 118,
                                                columnNumber: 15
                                            }, this),
                                            "Obtener Asesoría"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/ia-assistance/IaAssistanceWrapper.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(IaAssistanceWrapper, "vKAc/i5ioK2UMmlitFf3nJRnShg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = IaAssistanceWrapper;
var _c;
__turbopack_context__.k.register(_c, "IaAssistanceWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=52f7b_Escuela_Semester_3_Web_development_final_project_z_refactor_page_4c67235d._.js.map
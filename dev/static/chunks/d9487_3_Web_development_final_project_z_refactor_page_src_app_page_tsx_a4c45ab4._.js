(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$ClientNavbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/components/ClientNavbar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function HomePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "fd8b6a29e4a388b86321192eccb85a3ed9e360fd8b642c8f8413eb8e75155fe3") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "fd8b6a29e4a388b86321192eccb85a3ed9e360fd8b642c8f8413eb8e75155fe3";
    }
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "HomePage[useEffect()]": ()=>{
                const fetchSession = {
                    "HomePage[useEffect() > fetchSession]": async ()=>{
                        const response = await fetch("/api/auth/session");
                        if (response.ok) {
                            const data = await response.json();
                            setUser(data.user);
                            setUsername(data.user?.name || null);
                        }
                    }
                }["HomePage[useEffect() > fetchSession]"];
                fetchSession();
            }
        })["HomePage[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] !== user || $[4] !== username) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$src$2f$components$2f$ClientNavbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            username: username,
            currentPage: "home",
            user: user
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[3] = user;
        $[4] = username;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "main",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: [
                        "Tu cultivo, ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "highlight",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                                    lineNumber: 55,
                                    columnNumber: 80
                                }, this),
                                "nuestra IA"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                            lineNumber: 55,
                            columnNumber: 52
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 55,
                    columnNumber: 36
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Transforma tu experiencia agrícola con análisis inteligente de cultivos, contenido especializado y una comunidad de agricultores innovadores."
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 55,
                    columnNumber: 108
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            children: "Prueba el Análisis IA"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 63,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Sube una foto y obtén un diagnóstico"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[7] = t4;
        $[8] = t5;
    } else {
        t4 = $[7];
        t5 = $[8];
    }
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "upload-area",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "📤 Arrastra tu imagen aquí ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                        lineNumber: 73,
                        columnNumber: 69
                    }, this),
                    " o haz clic para seleccionar archivo"
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                lineNumber: 73,
                columnNumber: 39
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "analysis-box",
            children: [
                t4,
                t5,
                t6,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/ia-assistance",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-primary",
                        children: "Comenzar Análisis"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                        lineNumber: 80,
                        columnNumber: 81
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 80,
                    columnNumber: 56
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            children: "Todo lo que necesitas en un solo lugar"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Herramientas gratuitas diseñadas para ayudar a agricultores de todos los niveles"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[11] = t8;
        $[12] = t9;
    } else {
        t8 = $[11];
        t9 = $[12];
    }
    let t10;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: "Análisis Visual"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 98,
                    columnNumber: 33
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Sube fotos de tus cultivos y recibe análisis detallados sobre salud, plagas y recomendaciones"
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 98,
                    columnNumber: 57
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 98,
            columnNumber: 11
        }, this);
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "style",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "features",
                children: [
                    t8,
                    t9,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "cards",
                        children: [
                            t10,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Blog Educativo"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 122
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Artículos actualizados sobre técnicas agrícolas, tendencias y mejores prácticas"
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 145
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                                lineNumber: 105,
                                columnNumber: 100
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                        lineNumber: 105,
                        columnNumber: 72
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                lineNumber: 105,
                columnNumber: 34
            }, this)
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 105,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    let t13;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            children: "Comienza a usar tu el asistente de IA hoy"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 113,
            columnNumber: 11
        }, this);
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "Completamente gratis. Sin registros complicados. Solo sube tu foto y explica tu situación."
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 114,
            columnNumber: 11
        }, this);
        $[15] = t12;
        $[16] = t13;
    } else {
        t12 = $[15];
        t13 = $[16];
    }
    let t14;
    let t15;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "cta",
            children: [
                t12,
                t13,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/ia-assistance",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "btn-primary",
                        children: "Comenzar Análisis"
                    }, void 0, false, {
                        fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                        lineNumber: 124,
                        columnNumber: 71
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
                    lineNumber: 124,
                    columnNumber: 46
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "style"
        }, void 0, false, {
            fileName: "[project]/OneDrive/Escritorio/Escuela/Semester_3/Web_development_final_project/z/refactor_page/src/app/page.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[17] = t14;
        $[18] = t15;
    } else {
        t14 = $[17];
        t15 = $[18];
    }
    let t16;
    if ($[19] !== t2) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Escritorio$2f$Escuela$2f$Semester_3$2f$Web_development_final_project$2f$z$2f$refactor_page$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t2,
                t3,
                t7,
                t11,
                t14,
                t15
            ]
        }, void 0, true);
        $[19] = t2;
        $[20] = t16;
    } else {
        t16 = $[20];
    }
    return t16;
}
_s(HomePage, "6siqzKs4tM27+ZF2U+OOpqa2Edo=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=d9487_3_Web_development_final_project_z_refactor_page_src_app_page_tsx_a4c45ab4._.js.map
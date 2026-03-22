module.exports = [
"[project]/hooks/use-mobile.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const MOBILE_BREAKPOINT = 992;
function useIsMobile() {
    const [isMobile, setIsMobile] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](undefined);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = ()=>{
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        mql.addEventListener('change', onChange);
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        return ()=>mql.removeEventListener('change', onChange);
    }, []);
    return !!isMobile;
}
}),
"[project]/hooks/use-scroll-position.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollPosition",
    ()=>useScrollPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
function useScrollPosition({ targetRef } = {}) {
    const [scrollPosition, setScrollPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // If the ref is not provided or its current value is null, fall back to document
        const target = targetRef?.current || document;
        const scrollable = target === document ? window : target;
        const updatePosition = ()=>{
            // Determine if we're scrolling the document or a specific element
            const scrollY = target === document ? window.scrollY : target.scrollTop;
            setScrollPosition(scrollY);
        };
        scrollable.addEventListener('scroll', updatePosition);
        // Set the initial position
        updatePosition();
        return ()=>{
            scrollable.removeEventListener('scroll', updatePosition);
        };
    }, [
        targetRef
    ]);
    return scrollPosition;
}
}),
"[project]/hooks/use-menu.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMenu",
    ()=>useMenu
]);
const useMenu = (pathname)=>{
    const isActive = (path)=>{
        if (path && path === '/') {
            return path === pathname;
        } else {
            return !!path && pathname.startsWith(path);
        }
    };
    const hasActiveChild = (children)=>{
        if (!children || !Array.isArray(children)) return false;
        return children.some((child)=>child.path && isActive(child.path) || child.children && hasActiveChild(child.children));
    };
    const isItemActive = (item)=>{
        return (item.path ? isActive(item.path) : false) || (item.children ? hasActiveChild(item.children) : false);
    };
    const getCurrentItem = (items)=>{
        for (const item of items){
            if (item.path && isActive(item.path)) {
                if (item.children && item.children.length > 0) {
                    const childMatch = getCurrentItem(item.children);
                    return childMatch || item;
                }
                return item;
            }
            if (item.children && item.children.length > 0) {
                const childMatch = getCurrentItem(item.children);
                if (childMatch) {
                    return childMatch;
                }
            }
        }
        return undefined;
    };
    const getBreadcrumb = (items)=>{
        const findBreadcrumb = (nodes, breadcrumb = [])=>{
            for (const item of nodes){
                const currentBreadcrumb = [
                    ...breadcrumb,
                    item
                ];
                // Check if this item is active
                if (item.path && isActive(item.path)) {
                    return currentBreadcrumb; // Return the breadcrumb up to this point
                }
                // If item has children, recurse and check them
                if (item.children && item.children.length > 0) {
                    const childBreadcrumb = findBreadcrumb(item.children, currentBreadcrumb);
                    if (childBreadcrumb.length > currentBreadcrumb.length) {
                        return childBreadcrumb; // Return the deeper breadcrumb if found
                    }
                }
            }
            return breadcrumb; // Return current breadcrumb if no match found
        };
        const breadcrumb = findBreadcrumb(items);
        return breadcrumb.length > 0 ? breadcrumb : [];
    };
    const getChildren = (items, level)=>{
        const hasActiveChildAtLevel = (items)=>{
            for (const item of items){
                if (item.path && (item.path === pathname || item.path !== '/' && item.path !== '' && pathname.startsWith(item.path)) || item.children && hasActiveChildAtLevel(item.children)) {
                    return true;
                }
            }
            return false;
        };
        const findChildren = (items, targetLevel, currentLevel = 0)=>{
            for (const item of items){
                if (item.children) {
                    if (targetLevel === currentLevel && hasActiveChildAtLevel(item.children)) {
                        return item.children;
                    }
                    const children = findChildren(item.children, targetLevel, currentLevel + 1);
                    if (children) {
                        return children;
                    }
                } else if (targetLevel === currentLevel && item.path && (item.path === pathname || item.path !== '/' && item.path !== '' && pathname.startsWith(item.path))) {
                    return items;
                }
            }
            return null;
        };
        return findChildren(items, level);
    };
    return {
        isActive,
        hasActiveChild,
        isItemActive,
        getCurrentItem,
        getBreadcrumb,
        getChildren
    };
};
}),
"[project]/config/general.config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generalSettings",
    ()=>generalSettings
]);
const generalSettings = {
    purchaseLink: 'https://1.envato.market/Vm7VRE',
    docsLink: '',
    licenseLink: '',
    devsLink: 'https://devs.keenthemes.com',
    faqLink: 'https://keenthemes.com/metronic',
    aboutLink: 'https://keenthemes.com/metronic'
};
;
}),
"[project]/config/menu.config.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MENU_HELP",
    ()=>MENU_HELP,
    "MENU_MEGA",
    ()=>MENU_MEGA,
    "MENU_MEGA_MOBILE",
    ()=>MENU_MEGA_MOBILE,
    "MENU_ROOT",
    ()=>MENU_ROOT,
    "MENU_SIDEBAR",
    ()=>MENU_SIDEBAR,
    "MENU_SIDEBAR_COMPACT",
    ()=>MENU_SIDEBAR_COMPACT,
    "MENU_SIDEBAR_CUSTOM",
    ()=>MENU_SIDEBAR_CUSTOM
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge.js [app-ssr] (ecmascript) <export default as Badge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bitcoin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bitcoin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bitcoin.js [app-ssr] (ecmascript) <export default as Bitcoin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bolt$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bolt.js [app-ssr] (ecmascript) <export default as Bolt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book.js [app-ssr] (ecmascript) <export default as Book>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-ssr] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check.js [app-ssr] (ecmascript) <export default as CalendarCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$captions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Captions$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/captions.js [app-ssr] (ecmascript) <export default as Captions>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-ssr] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$codepen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Codepen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/codepen.js [app-ssr] (ecmascript) <export default as Codepen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-ssr] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/euro.js [app-ssr] (ecmascript) <export default as Euro>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-question-mark.js [app-ssr] (ecmascript) <export default as FileQuestion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flag.js [app-ssr] (ecmascript) <export default as Flag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ghost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ghost$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ghost.js [app-ssr] (ecmascript) <export default as Ghost>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-ssr] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-ssr] (ecmascript) <export default as Grid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Kanban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/kanban.js [app-ssr] (ecmascript) <export default as Kanban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/panels-top-left.js [app-ssr] (ecmascript) <export default as Layout>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-ssr] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/life-buoy.js [app-ssr] (ecmascript) <export default as LifeBuoy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-ssr] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/network.js [app-ssr] (ecmascript) <export default as Network>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plug.js [app-ssr] (ecmascript) <export default as Plug>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scroll-text.js [app-ssr] (ecmascript) <export default as ScrollText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-ssr] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldUser$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-user.js [app-ssr] (ecmascript) <export default as ShieldUser>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$mouse$2d$pointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareMousePointer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-mouse-pointer.js [app-ssr] (ecmascript) <export default as SquareMousePointer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-ssr] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$theater$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Theater$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/theater.js [app-ssr] (ecmascript) <export default as Theater>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-ssr] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user.js [app-ssr] (ecmascript) <export default as UserCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
;
const MENU_SIDEBAR = [
    {
        title: 'Dashboards',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
        children: [
            {
                title: 'Light Sidebar',
                path: '/'
            },
            {
                title: 'Dark Sidebar',
                path: '/dark-sidebar'
            }
        ]
    },
    {
        heading: 'User'
    },
    {
        title: 'Public Profile',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"],
        children: [
            {
                title: 'Profiles',
                children: [
                    {
                        title: 'Default',
                        path: '/public-profile/profiles/default'
                    },
                    {
                        title: 'Creator',
                        path: '/public-profile/profiles/creator'
                    },
                    {
                        title: 'Company',
                        path: '/public-profile/profiles/company'
                    },
                    {
                        title: 'NFT',
                        path: '/public-profile/profiles/nft'
                    },
                    {
                        title: 'Blogger',
                        path: '/public-profile/profiles/blogger'
                    },
                    {
                        title: 'CRM',
                        path: '/public-profile/profiles/crm'
                    },
                    {
                        title: 'More',
                        collapse: true,
                        collapseTitle: 'Show less',
                        expandTitle: 'Show 4 more',
                        children: [
                            {
                                title: 'Gamer',
                                path: '/public-profile/profiles/gamer'
                            },
                            {
                                title: 'Feeds',
                                path: '/public-profile/profiles/feeds'
                            },
                            {
                                title: 'Plain',
                                path: '/public-profile/profiles/plain'
                            },
                            {
                                title: 'Modal',
                                path: '/public-profile/profiles/modal'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Projects',
                children: [
                    {
                        title: '3 Columns',
                        path: '/public-profile/projects/3-columns'
                    },
                    {
                        title: '2 Columns',
                        path: '/public-profile/projects/2-columns'
                    }
                ]
            },
            {
                title: 'Works',
                path: '/public-profile/works'
            },
            {
                title: 'Teams',
                path: '/public-profile/teams'
            },
            {
                title: 'Network',
                path: '/public-profile/network'
            },
            {
                title: 'Activity',
                path: '/public-profile/activity'
            },
            {
                title: 'More',
                collapse: true,
                collapseTitle: 'Show less',
                expandTitle: 'Show 3 more',
                children: [
                    {
                        title: 'Campaigns - Card',
                        path: '/public-profile/campaigns/card'
                    },
                    {
                        title: 'Campaigns - List',
                        path: '/public-profile/campaigns/list'
                    },
                    {
                        title: 'Empty',
                        path: '/public-profile/empty'
                    }
                ]
            }
        ]
    },
    {
        title: 'My Account',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        children: [
            {
                title: 'Account',
                children: [
                    {
                        title: 'Get Started',
                        path: '/account/home/get-started'
                    },
                    {
                        title: 'User Profile',
                        path: '/account/home/user-profile'
                    },
                    {
                        title: 'Company Profile',
                        path: '/account/home/company-profile'
                    },
                    {
                        title: 'Settings - With Sidebar',
                        path: '/account/home/settings-sidebar'
                    },
                    {
                        title: 'Settings - Enterprise',
                        path: '/account/home/settings-enterprise'
                    },
                    {
                        title: 'Settings - Plain',
                        path: '/account/home/settings-plain'
                    },
                    {
                        title: 'Settings - Modal',
                        path: '/account/home/settings-modal'
                    }
                ]
            },
            {
                title: 'Billing',
                children: [
                    {
                        title: 'Billing - Basic',
                        path: '/account/billing/basic'
                    },
                    {
                        title: 'Billing - Enterprise',
                        path: '/account/billing/enterprise'
                    },
                    {
                        title: 'Plans',
                        path: '/account/billing/plans'
                    },
                    {
                        title: 'Billing History',
                        path: '/account/billing/history'
                    }
                ]
            },
            {
                title: 'Security',
                children: [
                    {
                        title: 'Get Started',
                        path: '/account/security/get-started'
                    },
                    {
                        title: 'Security Overview',
                        path: '/account/security/overview'
                    },
                    {
                        title: 'Allowed IP Addresses',
                        path: '/account/security/allowed-ip-addresses'
                    },
                    {
                        title: 'Privacy Settings',
                        path: '/account/security/privacy-settings'
                    },
                    {
                        title: 'Device Management',
                        path: '/account/security/device-management'
                    },
                    {
                        title: 'Backup & Recovery',
                        path: '/account/security/backup-and-recovery'
                    },
                    {
                        title: 'Current Sessions',
                        path: '/account/security/current-sessions'
                    },
                    {
                        title: 'Security Log',
                        path: '/account/security/security-log'
                    }
                ]
            },
            {
                title: 'Members & Roles',
                children: [
                    {
                        title: 'Teams Starter',
                        path: '/account/members/team-starter'
                    },
                    {
                        title: 'Teams',
                        path: '/account/members/teams'
                    },
                    {
                        title: 'Team Info',
                        path: '/account/members/team-info'
                    },
                    {
                        title: 'Members Starter',
                        path: '/account/members/members-starter'
                    },
                    {
                        title: 'Team Members',
                        path: '/account/members/team-members'
                    },
                    {
                        title: 'Import Members',
                        path: '/account/members/import-members'
                    },
                    {
                        title: 'Roles',
                        path: '/account/members/roles'
                    },
                    {
                        title: 'Permissions - Toggler',
                        path: '/account/members/permissions-toggle'
                    },
                    {
                        title: 'Permissions - Check',
                        path: '/account/members/permissions-check'
                    }
                ]
            },
            {
                title: 'Integrations',
                path: '/account/integrations'
            },
            {
                title: 'Notifications',
                path: '/account/notifications'
            },
            {
                title: 'API Keys',
                path: '/account/api-keys'
            },
            {
                title: 'More',
                collapse: true,
                collapseTitle: 'Show less',
                expandTitle: 'Show 3 more',
                children: [
                    {
                        title: 'Appearance',
                        path: '/account/appearance'
                    },
                    {
                        title: 'Invite a Friend',
                        path: '/account/invite-a-friend'
                    },
                    {
                        title: 'Activity',
                        path: '/account/activity'
                    }
                ]
            }
        ]
    },
    {
        title: 'Network',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        children: [
            {
                title: 'Get Started',
                path: '/network/get-started'
            },
            {
                title: 'User Cards',
                children: [
                    {
                        title: 'Mini Cards',
                        path: '/network/user-cards/mini-cards'
                    },
                    {
                        title: 'Team Crew',
                        path: '/network/user-cards/team-crew'
                    },
                    {
                        title: 'Author',
                        path: '/network/user-cards/author'
                    },
                    {
                        title: 'NFT',
                        path: '/network/user-cards/nft'
                    },
                    {
                        title: 'Social',
                        path: '/network/user-cards/social'
                    }
                ]
            },
            {
                title: 'User Table',
                children: [
                    {
                        title: 'Team Crew',
                        path: '/network/user-table/team-crew'
                    },
                    {
                        title: 'App Roster',
                        path: '/network/user-table/app-roster'
                    },
                    {
                        title: 'Market Authors',
                        path: '/network/user-table/market-authors'
                    },
                    {
                        title: 'SaaS Users',
                        path: '/network/user-table/saas-users'
                    },
                    {
                        title: 'Store Clients',
                        path: '/network/user-table/store-clients'
                    },
                    {
                        title: 'Visitors',
                        path: '/network/user-table/visitors'
                    }
                ]
            },
            {
                title: 'Cooperations',
                path: '/network/cooperations',
                disabled: true
            },
            {
                title: 'Leads',
                path: '/network/leads',
                disabled: true
            },
            {
                title: 'Donators',
                path: '/network/donators',
                disabled: true
            }
        ]
    },
    {
        title: 'Authentication',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        children: [
            {
                title: 'Sign In',
                path: '/signin'
            },
            {
                title: 'Check Email',
                path: '/signup'
            },
            {
                title: 'Reset Password',
                path: '/reset-password'
            },
            {
                title: '2FA',
                path: '/2fa'
            },
            {
                title: 'Welcome Message',
                path: '/auth/welcome-message'
            },
            {
                title: 'Account Deactivated',
                path: '/auth/account-deactivated'
            },
            {
                title: 'Error 404',
                path: '/error/404'
            },
            {
                title: 'Error 500',
                path: '/error/500'
            }
        ]
    },
    {
        heading: 'Apps'
    },
    {
        title: 'User Management',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldUser$3e$__["ShieldUser"],
        children: [
            {
                title: 'Users',
                path: '/user-management/users'
            },
            {
                title: 'Roles',
                path: '/user-management/roles'
            },
            {
                title: 'Permissions',
                path: '/user-management/permissions'
            },
            {
                title: 'Account',
                path: '/user-management/account'
            },
            {
                title: 'Logs',
                path: '/user-management/logs'
            },
            {
                title: 'Settings',
                path: '/user-management/settings'
            }
        ]
    },
    {
        title: 'Store - Client',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        children: [
            {
                title: 'Home',
                path: '/store-client/home'
            },
            {
                title: 'Search Results - Grid',
                path: '/store-client/search-results-grid'
            },
            {
                title: 'Search Results - List',
                path: '/store-client/search-results-list'
            },
            {
                title: 'Product Details',
                path: '/store-client/product-details'
            },
            {
                title: 'Wishlist',
                path: '/store-client/wishlist'
            },
            {
                title: 'Checkout',
                children: [
                    {
                        title: 'Order Summary',
                        path: '/store-client/checkout/order-summary'
                    },
                    {
                        title: 'Shipping Info',
                        path: '/store-client/checkout/shipping-info'
                    },
                    {
                        title: 'Payment Method',
                        path: '/store-client/checkout/payment-method'
                    },
                    {
                        title: 'Order Placed',
                        path: '/store-client/checkout/order-placed'
                    }
                ]
            },
            {
                title: 'My Orders',
                path: '/store-client/my-orders'
            },
            {
                title: 'Order Receipt',
                path: '/store-client/order-receipt'
            }
        ]
    },
    {
        title: 'Store - Admin',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bolt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bolt$3e$__["Bolt"],
        disabled: true,
        children: [
            {
                title: 'Dashboard',
                path: '/store-admin/dashboard'
            },
            {
                title: 'Inventory',
                children: [
                    {
                        title: 'All Products',
                        path: '/store-admin/inventory/all-products'
                    },
                    {
                        title: 'Current Stock',
                        path: '/store-admin/inventory/current-stock'
                    },
                    {
                        title: 'Inbound Stock',
                        path: '/store-admin/inventory/inbound-stock'
                    },
                    {
                        title: 'Outbound Stock',
                        path: '/store-admin/inventory/outbound-stock'
                    },
                    {
                        title: 'Stock Planner',
                        path: '/store-admin/inventory/stock-planner'
                    },
                    {
                        title: 'Track Shipping',
                        path: '/'
                    },
                    {
                        title: 'Create Shipping Label',
                        path: '/'
                    }
                ]
            }
        ]
    },
    {
        title: 'Store - Services',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$codepen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Codepen$3e$__["Codepen"],
        disabled: true
    },
    {
        title: 'AI Promt',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$theater$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Theater$3e$__["Theater"],
        disabled: true
    },
    {
        title: 'Invoice Generator',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scroll$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ScrollText$3e$__["ScrollText"],
        disabled: true
    }
];
const MENU_SIDEBAR_CUSTOM = [
    {
        title: 'Store - Client',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        children: [
            {
                title: 'Home',
                path: '/store-client/home'
            },
            {
                title: 'Search Results',
                children: [
                    {
                        title: 'Search Results - Grid',
                        path: '/store-client/search-results-grid'
                    },
                    {
                        title: 'Search Results - List',
                        path: '/store-client/search-results-list'
                    }
                ]
            },
            {
                title: 'Overlays',
                children: [
                    {
                        title: 'Product Details',
                        path: '/store-client/product-details'
                    },
                    {
                        title: 'Wishlist',
                        path: '/store-client/wishlist'
                    }
                ]
            },
            {
                title: 'Checkout',
                children: [
                    {
                        title: 'Order Summary',
                        path: '/store-client/checkout/order-summary'
                    },
                    {
                        title: 'Shipping Info',
                        path: '/store-client/checkout/shipping-info'
                    },
                    {
                        title: 'Payment Method',
                        path: '/store-client/checkout/payment-method'
                    },
                    {
                        title: 'Order Placed',
                        path: '/store-client/checkout/order-placed'
                    }
                ]
            },
            {
                title: 'My Orders',
                path: '/store-client/my-orders'
            },
            {
                title: 'Order Receipt',
                path: '/store-client/order-receipt'
            }
        ]
    }
];
const MENU_SIDEBAR_COMPACT = [
    {
        title: 'Dashboards',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
        path: '/'
    },
    {
        title: 'Public Profile',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"],
        children: [
            {
                title: 'Profiles',
                children: [
                    {
                        title: 'Default',
                        path: '/public-profile/profiles/default'
                    },
                    {
                        title: 'Creator',
                        path: '/public-profile/profiles/creator'
                    },
                    {
                        title: 'Company',
                        path: '/public-profile/profiles/company'
                    },
                    {
                        title: 'NFT',
                        path: '/public-profile/profiles/nft'
                    },
                    {
                        title: 'Blogger',
                        path: '/public-profile/profiles/blogger'
                    },
                    {
                        title: 'CRM',
                        path: '/public-profile/profiles/crm'
                    },
                    {
                        title: 'More',
                        collapse: true,
                        collapseTitle: 'Show less',
                        expandTitle: 'Show 4 more',
                        children: [
                            {
                                title: 'Gamer',
                                path: '/public-profile/profiles/gamer'
                            },
                            {
                                title: 'Feeds',
                                path: '/public-profile/profiles/feeds'
                            },
                            {
                                title: 'Plain',
                                path: '/public-profile/profiles/plain'
                            },
                            {
                                title: 'Modal',
                                path: '/public-profile/profiles/modal'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Projects',
                children: [
                    {
                        title: '3 Columns',
                        path: '/public-profile/projects/3-columns'
                    },
                    {
                        title: '2 Columns',
                        path: '/public-profile/projects/2-columns'
                    }
                ]
            },
            {
                title: 'Works',
                path: '/public-profile/works'
            },
            {
                title: 'Teams',
                path: '/public-profile/teams'
            },
            {
                title: 'Network',
                path: '/public-profile/network'
            },
            {
                title: 'Activity',
                path: '/public-profile/activity'
            },
            {
                title: 'More',
                collapse: true,
                collapseTitle: 'Show less',
                expandTitle: 'Show 3 more',
                children: [
                    {
                        title: 'Campaigns - Card',
                        path: '/public-profile/campaigns/card'
                    },
                    {
                        title: 'Campaigns - List',
                        path: '/public-profile/campaigns/list'
                    },
                    {
                        title: 'Empty',
                        path: '/public-profile/empty'
                    }
                ]
            }
        ]
    },
    {
        title: 'My Account',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        children: [
            {
                title: 'Account',
                children: [
                    {
                        title: 'Get Started',
                        path: '/account/home/get-started'
                    },
                    {
                        title: 'User Profile',
                        path: '/account/home/user-profile'
                    },
                    {
                        title: 'Company Profile',
                        path: '/account/home/company-profile'
                    },
                    {
                        title: 'Settings - With Sidebar',
                        path: '/account/home/settings-sidebar'
                    },
                    {
                        title: 'Settings - Enterprise',
                        path: '/account/home/settings-enterprise'
                    },
                    {
                        title: 'Settings - Plain',
                        path: '/account/home/settings-plain'
                    },
                    {
                        title: 'Settings - Modal',
                        path: '/account/home/settings-modal'
                    }
                ]
            },
            {
                title: 'Billing',
                children: [
                    {
                        title: 'Billing - Basic',
                        path: '/account/billing/basic'
                    },
                    {
                        title: 'Billing - Enterprise',
                        path: '/account/billing/enterprise'
                    },
                    {
                        title: 'Plans',
                        path: '/account/billing/plans'
                    },
                    {
                        title: 'Billing History',
                        path: '/account/billing/history'
                    }
                ]
            },
            {
                title: 'Security',
                children: [
                    {
                        title: 'Get Started',
                        path: '/account/security/get-started'
                    },
                    {
                        title: 'Security Overview',
                        path: '/account/security/overview'
                    },
                    {
                        title: 'Allowed IP Addresses',
                        path: '/account/security/allowed-ip-addresses'
                    },
                    {
                        title: 'Privacy Settings',
                        path: '/account/security/privacy-settings'
                    },
                    {
                        title: 'Device Management',
                        path: '/account/security/device-management'
                    },
                    {
                        title: 'Backup & Recovery',
                        path: '/account/security/backup-and-recovery'
                    },
                    {
                        title: 'Current Sessions',
                        path: '/account/security/current-sessions'
                    },
                    {
                        title: 'Security Log',
                        path: '/account/security/security-log'
                    }
                ]
            },
            {
                title: 'Members & Roles',
                children: [
                    {
                        title: 'Teams Starter',
                        path: '/account/members/team-starter'
                    },
                    {
                        title: 'Teams',
                        path: '/account/members/teams'
                    },
                    {
                        title: 'Team Info',
                        path: '/account/members/team-info'
                    },
                    {
                        title: 'Members Starter',
                        path: '/account/members/members-starter'
                    },
                    {
                        title: 'Team Members',
                        path: '/account/members/team-members'
                    },
                    {
                        title: 'Import Members',
                        path: '/account/members/import-members'
                    },
                    {
                        title: 'Roles',
                        path: '/account/members/roles'
                    },
                    {
                        title: 'Permissions - Toggler',
                        path: '/account/members/permissions-toggle'
                    },
                    {
                        title: 'Permissions - Check',
                        path: '/account/members/permissions-check'
                    }
                ]
            },
            {
                title: 'Integrations',
                path: '/account/integrations'
            },
            {
                title: 'Notifications',
                path: '/account/notifications'
            },
            {
                title: 'API Keys',
                path: '/account/api-keys'
            },
            {
                title: 'More',
                collapse: true,
                collapseTitle: 'Show less',
                expandTitle: 'Show 3 more',
                children: [
                    {
                        title: 'Appearance',
                        path: '/account/appearance'
                    },
                    {
                        title: 'Invite a Friend',
                        path: '/account/invite-a-friend'
                    },
                    {
                        title: 'Activity',
                        path: '/account/activity'
                    }
                ]
            }
        ]
    },
    {
        title: 'Network',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        children: [
            {
                title: 'Get Started',
                path: '/network/get-started'
            },
            {
                title: 'User Cards',
                children: [
                    {
                        title: 'Mini Cards',
                        path: '/network/user-cards/mini-cards'
                    },
                    {
                        title: 'Team Crew',
                        path: '/network/user-cards/team-crew'
                    },
                    {
                        title: 'Author',
                        path: '/network/user-cards/author'
                    },
                    {
                        title: 'NFT',
                        path: '/network/user-cards/nft'
                    },
                    {
                        title: 'Social',
                        path: '/network/user-cards/social'
                    }
                ]
            },
            {
                title: 'User Table',
                children: [
                    {
                        title: 'Team Crew',
                        path: '/network/user-table/team-crew'
                    },
                    {
                        title: 'App Roster',
                        path: '/network/user-table/app-roster'
                    },
                    {
                        title: 'Market Authors',
                        path: '/network/user-table/market-authors'
                    },
                    {
                        title: 'SaaS Users',
                        path: '/network/user-table/saas-users'
                    },
                    {
                        title: 'Store Clients',
                        path: '/network/user-table/store-clients'
                    },
                    {
                        title: 'Visitors',
                        path: '/network/user-table/visitors'
                    }
                ]
            },
            {
                title: 'Cooperations',
                path: '/network/cooperations',
                disabled: true
            },
            {
                title: 'Leads',
                path: '/network/leads',
                disabled: true
            },
            {
                title: 'Donators',
                path: '/network/donators',
                disabled: true
            }
        ]
    },
    {
        title: 'Store - Client',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
        children: [
            {
                title: 'Home',
                path: '/store-client/home'
            },
            {
                title: 'Search Results - Grid',
                path: '/store-client/search-results-grid'
            },
            {
                title: 'Search Results - List',
                path: '/store-client/search-results-list'
            },
            {
                title: 'Product Details',
                path: '/store-client/product-details'
            },
            {
                title: 'Wishlist',
                path: '/store-client/wishlist'
            },
            {
                title: 'Checkout',
                children: [
                    {
                        title: 'Order Summary',
                        path: '/store-client/checkout/order-summary'
                    },
                    {
                        title: 'Shipping Info',
                        path: '/store-client/checkout/shipping-info'
                    },
                    {
                        title: 'Payment Method',
                        path: '/store-client/checkout/payment-method'
                    },
                    {
                        title: 'Order Placed',
                        path: '/store-client/checkout/order-placed'
                    }
                ]
            },
            {
                title: 'My Orders',
                path: '/store-client/my-orders'
            },
            {
                title: 'Order Receipt',
                path: '/store-client/order-receipt'
            }
        ]
    },
    {
        title: 'User Management',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldUser$3e$__["ShieldUser"],
        children: [
            {
                title: 'Users',
                path: '/user-management/users'
            },
            {
                title: 'Roles',
                path: '/user-management/roles'
            },
            {
                title: 'Permissions',
                path: '/user-management/permissions'
            },
            {
                title: 'Account',
                path: '/user-management/account'
            },
            {
                title: 'Logs',
                path: '/user-management/logs'
            },
            {
                title: 'Settings',
                path: '/user-management/settings'
            }
        ]
    },
    {
        title: 'Authentication',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        children: [
            {
                title: 'Sign In',
                path: '/signin'
            },
            {
                title: 'Check Email',
                path: '/signup'
            },
            {
                title: 'Reset Password',
                path: '/reset-password'
            },
            {
                title: '2FA',
                path: '/2fa'
            },
            {
                title: 'Welcome Message',
                path: '/auth/welcome-message'
            },
            {
                title: 'Account Deactivated',
                path: '/auth/account-deactivated'
            },
            {
                title: 'Error 404',
                path: '/error/404'
            },
            {
                title: 'Error 500',
                path: '/error/500'
            }
        ]
    }
];
const MENU_MEGA = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Profiles',
        children: [
            {
                title: 'Profiles',
                children: [
                    {
                        children: [
                            {
                                title: 'Default',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"],
                                path: '/public-profile/profiles/default'
                            },
                            {
                                title: 'Creator',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
                                path: '/public-profile/profiles/creator'
                            },
                            {
                                title: 'Company',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
                                path: '/public-profile/profiles/company'
                            },
                            {
                                title: 'NFT',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bitcoin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bitcoin$3e$__["Bitcoin"],
                                path: '/public-profile/profiles/nft'
                            },
                            {
                                title: 'Blogger',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
                                path: '/public-profile/profiles/blogger'
                            },
                            {
                                title: 'CRM',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
                                path: '/public-profile/profiles/crm'
                            },
                            {
                                title: 'Gamer',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ghost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ghost$3e$__["Ghost"],
                                path: '/public-profile/profiles/gamer'
                            }
                        ]
                    },
                    {
                        children: [
                            {
                                title: 'Feeds',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"],
                                path: '/public-profile/profiles/feeds'
                            },
                            {
                                title: 'Plain',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"],
                                path: '/public-profile/profiles/plain'
                            },
                            {
                                title: 'Modal',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$mouse$2d$pointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareMousePointer$3e$__["SquareMousePointer"],
                                path: '/public-profile/profiles/modal'
                            },
                            {
                                title: 'Freelancer',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                                path: '#',
                                disabled: true
                            },
                            {
                                title: 'Developer',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"],
                                path: '#',
                                disabled: true
                            },
                            {
                                title: 'Team',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                path: '#',
                                disabled: true
                            },
                            {
                                title: 'Events',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"],
                                path: '#',
                                disabled: true
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Other Pages',
                children: [
                    {
                        children: [
                            {
                                title: 'Projects - 3 Cols',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"],
                                path: '/public-profile/projects/3-columns'
                            },
                            {
                                title: 'Projects - 2 Cols',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"],
                                path: '/public-profile/projects/2-columns'
                            },
                            {
                                title: 'Works',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                                path: '/public-profile/works'
                            },
                            {
                                title: 'Teams',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                path: '/public-profile/teams'
                            },
                            {
                                title: 'Network',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"],
                                path: '/public-profile/network'
                            },
                            {
                                title: 'Activity',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                                path: '/public-profile/activity'
                            },
                            {
                                title: 'Campaigns - Card',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
                                path: '/public-profile/campaigns/card'
                            }
                        ]
                    },
                    {
                        children: [
                            {
                                title: 'Campaigns - List',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Kanban$3e$__["Kanban"],
                                path: '/public-profile/campaigns/list'
                            },
                            {
                                title: 'Empty',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                path: '/public-profile/empty'
                            },
                            {
                                title: 'Documents',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"],
                                path: '#',
                                disabled: true
                            },
                            {
                                title: 'Badges',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
                                path: '#',
                                disabled: true
                            },
                            {
                                title: 'Awards',
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
                                path: '#',
                                disabled: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'My Account',
        children: [
            {
                title: 'General Pages',
                children: [
                    {
                        title: 'Integrations',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"],
                        path: '/account/integrations'
                    },
                    {
                        title: 'Notifications',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
                        path: '/account/notifications'
                    },
                    {
                        title: 'API Keys',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"],
                        path: '/account/api-keys'
                    },
                    {
                        title: 'Appearance',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
                        path: '/account/appearance'
                    },
                    {
                        title: 'Invite a Friend',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"],
                        path: '/account/invite-a-friend'
                    },
                    {
                        title: 'Activity',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"],
                        path: '/account/activity'
                    },
                    {
                        title: 'Brand',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
                        disabled: true
                    },
                    {
                        title: 'Get Paid',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__["Euro"],
                        disabled: true
                    }
                ]
            },
            {
                title: 'Other pages',
                children: [
                    {
                        title: 'Account Home',
                        children: [
                            {
                                title: 'Get Started',
                                path: '/account/home/get-started'
                            },
                            {
                                title: 'User Profile',
                                path: '/account/home/user-profile'
                            },
                            {
                                title: 'Company Profile',
                                path: '/account/home/company-profile'
                            },
                            {
                                title: 'With Sidebar',
                                path: '/account/home/settings-sidebar'
                            },
                            {
                                title: 'Enterprise',
                                path: '/account/home/settings-enterprise'
                            },
                            {
                                title: 'Plain',
                                path: '/account/home/settings-plain'
                            },
                            {
                                title: 'Modal',
                                path: '/account/home/settings-modal'
                            }
                        ]
                    },
                    {
                        title: 'Billing',
                        children: [
                            {
                                title: 'Basic Billing',
                                path: '/account/billing/basic'
                            },
                            {
                                title: 'Enterprise',
                                path: '/account/billing/enterprise'
                            },
                            {
                                title: 'Plans',
                                path: '/account/billing/plans'
                            },
                            {
                                title: 'Billing History',
                                path: '/account/billing/history'
                            },
                            {
                                title: 'Tax Info',
                                disabled: true
                            },
                            {
                                title: 'Invoices',
                                disabled: true
                            },
                            {
                                title: 'Gateaways',
                                disabled: true
                            }
                        ]
                    },
                    {
                        title: 'Security',
                        children: [
                            {
                                title: 'Get Started',
                                path: '/account/security/get-started'
                            },
                            {
                                title: 'Security Overview',
                                path: '/account/security/overview'
                            },
                            {
                                title: 'IP Addresses',
                                path: '/account/security/allowed-ip-addresses'
                            },
                            {
                                title: 'Privacy Settings',
                                path: '/account/security/privacy-settings'
                            },
                            {
                                title: 'Device Management',
                                path: '/account/security/device-management'
                            },
                            {
                                title: 'Backup & Recovery',
                                path: '/account/security/backup-and-recovery'
                            },
                            {
                                title: 'Current Sessions',
                                path: '/account/security/current-sessions'
                            },
                            {
                                title: 'Security Log',
                                path: '/account/security/security-log'
                            }
                        ]
                    },
                    {
                        title: 'Members & Roles',
                        children: [
                            {
                                title: 'Teams Starter',
                                path: '/account/members/team-starter'
                            },
                            {
                                title: 'Teams',
                                path: '/account/members/teams'
                            },
                            {
                                title: 'Team Info',
                                path: '/account/members/team-info'
                            },
                            {
                                title: 'Members Starter',
                                path: '/account/members/members-starter'
                            },
                            {
                                title: 'Team Members',
                                path: '/account/members/team-members'
                            },
                            {
                                title: 'Import Members',
                                path: '/account/members/import-members'
                            },
                            {
                                title: 'Roles',
                                path: '/account/members/roles'
                            },
                            {
                                title: 'Permissions - Toggler',
                                path: '/account/members/permissions-toggle'
                            },
                            {
                                title: 'Permissions - Check',
                                path: '/account/members/permissions-check'
                            }
                        ]
                    },
                    {
                        title: 'Other Pages',
                        children: [
                            {
                                title: 'Integrations',
                                path: '/account/integrations'
                            },
                            {
                                title: 'Notifications',
                                path: '/account/notifications'
                            },
                            {
                                title: 'API Keys',
                                path: '/account/api-keys'
                            },
                            {
                                title: 'Appearance',
                                path: '/account/appearance'
                            },
                            {
                                title: 'Invite a Friend',
                                path: '/account/invite-a-friend'
                            },
                            {
                                title: 'Activity',
                                path: '/account/activity'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Network',
        children: [
            {
                title: 'General Pages',
                children: [
                    {
                        title: 'Get Started',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"],
                        path: '/network/get-started'
                    },
                    {
                        title: 'Colleagues',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Donators',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Leads',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                        path: '#',
                        disabled: true
                    }
                ]
            },
            {
                title: 'Other pages',
                children: [
                    {
                        title: 'User Cards',
                        children: [
                            {
                                title: 'Mini Cards',
                                path: '/network/user-cards/mini-cards'
                            },
                            {
                                title: 'Team Members',
                                path: '/network/user-cards/team-crew'
                            },
                            {
                                title: 'Authors',
                                path: '/network/user-cards/author'
                            },
                            {
                                title: 'NFT Users',
                                path: '/network/user-cards/nft'
                            },
                            {
                                title: 'Social Users',
                                path: '/network/user-cards/social'
                            },
                            {
                                title: 'Gamers',
                                path: '#',
                                disabled: true
                            }
                        ]
                    },
                    {
                        title: 'User Base',
                        badge: 'Datatables',
                        children: [
                            {
                                title: 'Team Crew',
                                path: '/network/user-table/team-crew'
                            },
                            {
                                title: 'App Roster',
                                path: '/network/user-table/app-roster'
                            },
                            {
                                title: 'Market Authors',
                                path: '/network/user-table/market-authors'
                            },
                            {
                                title: 'SaaS Users',
                                path: '/network/user-table/saas-users'
                            },
                            {
                                title: 'Store Clients',
                                path: '/network/user-table/store-clients'
                            },
                            {
                                title: 'Visitors',
                                path: '/network/user-table/visitors'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Apps',
        children: [
            {
                title: 'Store - Client',
                children: [
                    {
                        children: [
                            {
                                title: 'Home',
                                path: '/store-client/home'
                            },
                            {
                                title: 'Search Results - Grid',
                                path: '/store-client/search-results-grid'
                            },
                            {
                                title: 'Search Results - List',
                                path: '/store-client/search-results-list'
                            },
                            {
                                title: 'Product Details',
                                path: '/store-client/product-details'
                            },
                            {
                                title: 'Wishlist',
                                path: '/store-client/wishlist'
                            },
                            {
                                title: 'My Orders',
                                path: '/store-client/my-orders'
                            }
                        ]
                    },
                    {
                        children: [
                            {
                                title: 'Checkout - Order Summary',
                                path: '/store-client/checkout/order-summary'
                            },
                            {
                                title: 'Checkout - Shipping Info',
                                path: '/store-client/checkout/shipping-info'
                            },
                            {
                                title: 'Checkout - Payment Method',
                                path: '/store-client/checkout/payment-method'
                            },
                            {
                                title: 'Checkout - Order Placed',
                                path: '/store-client/checkout/order-placed'
                            },
                            {
                                title: 'Order Receipt',
                                path: '/store-client/order-receipt'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'User Management',
                children: [
                    {
                        children: [
                            {
                                title: 'Users',
                                path: '/user-management/users'
                            },
                            {
                                title: 'Roles',
                                path: '/user-management/roles'
                            },
                            {
                                title: 'Permissions',
                                path: '/user-management/permissions'
                            },
                            {
                                title: 'Account',
                                path: '/user-management/account'
                            },
                            {
                                title: 'Logs',
                                path: '/user-management/logs'
                            },
                            {
                                title: 'Settings',
                                path: '/user-management/settings'
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
const MENU_MEGA_MOBILE = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Profiles',
        children: [
            {
                title: 'Profiles',
                children: [
                    {
                        title: 'Default',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Badge$3e$__["Badge"],
                        path: '/public-profile/profiles/default'
                    },
                    {
                        title: 'Creator',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
                        path: '/public-profile/profiles/creator'
                    },
                    {
                        title: 'Company',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"],
                        path: '/public-profile/profiles/company'
                    },
                    {
                        title: 'NFT',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bitcoin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bitcoin$3e$__["Bitcoin"],
                        path: '/public-profile/profiles/nft'
                    },
                    {
                        title: 'Blogger',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
                        path: '/public-profile/profiles/blogger'
                    },
                    {
                        title: 'CRM',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
                        path: '/public-profile/profiles/crm'
                    },
                    {
                        title: 'Gamer',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ghost$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Ghost$3e$__["Ghost"],
                        path: '/public-profile/profiles/gamer'
                    },
                    {
                        title: 'Feeds',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Book$3e$__["Book"],
                        path: '/public-profile/profiles/feeds'
                    },
                    {
                        title: 'Plain',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"],
                        path: '/public-profile/profiles/plain'
                    },
                    {
                        title: 'Modal',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$mouse$2d$pointer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareMousePointer$3e$__["SquareMousePointer"],
                        path: '/public-profile/profiles/modal'
                    },
                    {
                        title: 'Freelancer',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Developer',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Team',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Events',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"],
                        path: '#',
                        disabled: true
                    }
                ]
            },
            {
                title: 'Other Pages',
                children: [
                    {
                        title: 'Projects - 3 Cols',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$panels$2d$top$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layout$3e$__["Layout"],
                        path: '/public-profile/projects/3-columns'
                    },
                    {
                        title: 'Projects - 2 Cols',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid$3e$__["Grid"],
                        path: '/public-profile/projects/2-columns'
                    },
                    {
                        title: 'Works',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                        path: '/public-profile/works'
                    },
                    {
                        title: 'Teams',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        path: '/public-profile/teams'
                    },
                    {
                        title: 'Network',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$network$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Network$3e$__["Network"],
                        path: '/public-profile/network'
                    },
                    {
                        title: 'Activity',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        path: '/public-profile/activity'
                    },
                    {
                        title: 'Campaigns - Card',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
                        path: '/public-profile/campaigns/card'
                    },
                    {
                        title: 'Campaigns - List',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$kanban$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Kanban$3e$__["Kanban"],
                        path: '/public-profile/campaigns/list'
                    },
                    {
                        title: 'Empty',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                        path: '/public-profile/empty'
                    },
                    {
                        title: 'Documents',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Badges',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Awards',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"],
                        path: '#',
                        disabled: true
                    }
                ]
            }
        ]
    },
    {
        title: 'My Account',
        children: [
            {
                title: 'General Pages',
                children: [
                    {
                        title: 'Integrations',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plug$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plug$3e$__["Plug"],
                        path: '/account/integrations'
                    },
                    {
                        title: 'Notifications',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"],
                        path: '/account/notifications'
                    },
                    {
                        title: 'API Keys',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"],
                        path: '/account/api-keys'
                    },
                    {
                        title: 'Appearance',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"],
                        path: '/account/appearance'
                    },
                    {
                        title: 'Invite a Friend',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"],
                        path: '/account/invite-a-friend'
                    },
                    {
                        title: 'Activity',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$life$2d$buoy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LifeBuoy$3e$__["LifeBuoy"],
                        path: '/account/activity'
                    },
                    {
                        title: 'Brand',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
                        disabled: true
                    },
                    {
                        title: 'Get Paid',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__["Euro"],
                        disabled: true
                    }
                ]
            },
            {
                title: 'Other pages',
                children: [
                    {
                        title: 'Account Home',
                        children: [
                            {
                                title: 'Get Started',
                                path: '/account/home/get-started'
                            },
                            {
                                title: 'User Profile',
                                path: '/account/home/user-profile'
                            },
                            {
                                title: 'Company Profile',
                                path: '/account/home/company-profile'
                            },
                            {
                                title: 'With Sidebar',
                                path: '/account/home/settings-sidebar'
                            },
                            {
                                title: 'Enterprise',
                                path: '/account/home/settings-enterprise'
                            },
                            {
                                title: 'Plain',
                                path: '/account/home/settings-plain'
                            },
                            {
                                title: 'Modal',
                                path: '/account/home/settings-modal'
                            }
                        ]
                    },
                    {
                        title: 'Billing',
                        children: [
                            {
                                title: 'Basic Billing',
                                path: '/account/billing/basic'
                            },
                            {
                                title: 'Enterprise',
                                path: '/account/billing/enterprise'
                            },
                            {
                                title: 'Plans',
                                path: '/account/billing/plans'
                            },
                            {
                                title: 'Billing History',
                                path: '/account/billing/history'
                            },
                            {
                                title: 'Tax Info',
                                disabled: true
                            },
                            {
                                title: 'Invoices',
                                disabled: true
                            },
                            {
                                title: 'Gateaways',
                                disabled: true
                            }
                        ]
                    },
                    {
                        title: 'Security',
                        children: [
                            {
                                title: 'Get Started',
                                path: '/account/security/get-started'
                            },
                            {
                                title: 'Security Overview',
                                path: '/account/security/overview'
                            },
                            {
                                title: 'IP Addresses',
                                path: '/account/security/allowed-ip-addresses'
                            },
                            {
                                title: 'Privacy Settings',
                                path: '/account/security/privacy-settings'
                            },
                            {
                                title: 'Device Management',
                                path: '/account/security/device-management'
                            },
                            {
                                title: 'Backup & Recovery',
                                path: '/account/security/backup-and-recovery'
                            },
                            {
                                title: 'Current Sessions',
                                path: '/account/security/current-sessions'
                            },
                            {
                                title: 'Security Log',
                                path: '/account/security/security-log'
                            }
                        ]
                    },
                    {
                        title: 'Members & Roles',
                        children: [
                            {
                                title: 'Teams Starter',
                                path: '/account/members/team-starter'
                            },
                            {
                                title: 'Teams',
                                path: '/account/members/teams'
                            },
                            {
                                title: 'Team Info',
                                path: '/account/members/team-info'
                            },
                            {
                                title: 'Members Starter',
                                path: '/account/members/members-starter'
                            },
                            {
                                title: 'Team Members',
                                path: '/account/members/team-members'
                            },
                            {
                                title: 'Import Members',
                                path: '/account/members/import-members'
                            },
                            {
                                title: 'Roles',
                                path: '/account/members/roles'
                            },
                            {
                                title: 'Permissions - Toggler',
                                path: '/account/members/permissions-toggle'
                            },
                            {
                                title: 'Permissions - Check',
                                path: '/account/members/permissions-check'
                            }
                        ]
                    },
                    {
                        title: 'Other Pages',
                        children: [
                            {
                                title: 'Integrations',
                                path: '/account/integrations'
                            },
                            {
                                title: 'Notifications',
                                path: '/account/notifications'
                            },
                            {
                                title: 'API Keys',
                                path: '/account/api-keys'
                            },
                            {
                                title: 'Appearance',
                                path: '/account/appearance'
                            },
                            {
                                title: 'Invite a Friend',
                                path: '/account/invite-a-friend'
                            },
                            {
                                title: 'Activity',
                                path: '/account/activity'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Network',
        children: [
            {
                title: 'General Pages',
                children: [
                    {
                        title: 'Get Started',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flag$3e$__["Flag"],
                        path: '/network/get-started'
                    },
                    {
                        title: 'Colleagues',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Donators',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
                        path: '#',
                        disabled: true
                    },
                    {
                        title: 'Leads',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                        path: '#',
                        disabled: true
                    }
                ]
            },
            {
                title: 'Other pages',
                children: [
                    {
                        title: 'User Cards',
                        children: [
                            {
                                title: 'Mini Cards',
                                path: '/network/user-cards/mini-cards'
                            },
                            {
                                title: 'Team Members',
                                path: '/network/user-cards/team-crew'
                            },
                            {
                                title: 'Authors',
                                path: '/network/user-cards/author'
                            },
                            {
                                title: 'NFT Users',
                                path: '/network/user-cards/nft'
                            },
                            {
                                title: 'Social Users',
                                path: '/network/user-cards/social'
                            },
                            {
                                title: 'Gamers',
                                path: '#',
                                disabled: true
                            }
                        ]
                    },
                    {
                        title: 'User Base',
                        badge: 'Datatables',
                        children: [
                            {
                                title: 'Team Crew',
                                path: '/network/user-table/team-crew'
                            },
                            {
                                title: 'App Roster',
                                path: '/network/user-table/app-roster'
                            },
                            {
                                title: 'Market Authors',
                                path: '/network/user-table/market-authors'
                            },
                            {
                                title: 'SaaS Users',
                                path: '/network/user-table/saas-users'
                            },
                            {
                                title: 'Store Clients',
                                path: '/network/user-table/store-clients'
                            },
                            {
                                title: 'Visitors',
                                path: '/network/user-table/visitors'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'User Management',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        children: [
            {
                title: 'Users',
                path: '/user-management/users'
            },
            {
                title: 'Roles',
                path: '/user-management/roles'
            },
            {
                title: 'Permissions',
                path: '/user-management/permissions'
            },
            {
                title: 'Account',
                path: '/user-management/account'
            },
            {
                title: 'Logs',
                path: '/user-management/logs'
            },
            {
                title: 'Settings',
                path: '/user-management/settings'
            }
        ]
    },
    {
        title: 'Store - Client',
        children: [
            {
                title: 'Home',
                path: '/store-client/home'
            },
            {
                title: 'Search Results - Grid',
                path: '/store-client/search-results-grid'
            },
            {
                title: 'Search Results - List',
                path: '/store-client/search-results-list'
            },
            {
                title: 'Product Details',
                path: '/store-client/product-details'
            },
            {
                title: 'Wishlist',
                path: '/store-client/wishlist'
            },
            {
                title: 'Checkout',
                children: [
                    {
                        title: 'Order Summary',
                        path: '/store-client/checkout/order-summary'
                    },
                    {
                        title: 'Shipping Info',
                        path: '/store-client/checkout/shipping-info'
                    },
                    {
                        title: 'Payment Method',
                        path: '/store-client/checkout/payment-method'
                    },
                    {
                        title: 'Order Placed',
                        path: '/store-client/checkout/order-placed'
                    }
                ]
            },
            {
                title: 'My Orders',
                path: '/store-client/my-orders'
            },
            {
                title: 'Order Receipt',
                path: '/store-client/order-receipt'
            }
        ]
    }
];
const MENU_HELP = [
    {
        title: 'Getting Started',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/installation'
    },
    {
        title: 'Support Forum',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
        children: [
            {
                title: 'All Questions',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"],
                path: 'https://devs.keenthemes.com'
            },
            {
                title: 'Popular Questions',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"],
                path: 'https://devs.keenthemes.com/popular'
            },
            {
                title: 'Ask Question',
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"],
                path: 'https://devs.keenthemes.com/question/create'
            }
        ]
    },
    {
        title: 'Licenses & FAQ',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$captions$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Captions$3e$__["Captions"],
        path: 'https://keenthemes.com/metronic/tailwind/docs/getting-started/license'
    },
    {
        title: 'Documentation',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileQuestion$3e$__["FileQuestion"],
        path: 'https://keenthemes.com/metronic/tailwind/docs'
    },
    {
        separator: true
    },
    {
        title: 'Contact Us',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"],
        path: 'https://keenthemes.com/contact'
    }
];
const MENU_ROOT = [
    {
        title: 'Public Profile',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle$3e$__["UserCircle"],
        rootPath: '/public-profile/',
        path: '/public-profile/profiles/default',
        childrenIndex: 2
    },
    {
        title: 'Account',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        rootPath: '/account/',
        path: '/',
        childrenIndex: 3
    },
    {
        title: 'Network',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        rootPath: '/network/',
        path: '/network/get-started',
        childrenIndex: 4
    },
    {
        title: 'Authentication',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"],
        rootPath: '/authentication/',
        path: '/authentication/get-started',
        childrenIndex: 5
    },
    {
        title: 'Store - Client',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"],
        rootPath: '/store-client/',
        path: '/store-client/home',
        childrenIndex: 6
    },
    {
        title: 'User Management',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldUser$3e$__["ShieldUser"],
        rootPath: '/user-management/',
        path: '/user-management/users',
        childrenIndex: 7
    }
];
}),
];

//# sourceMappingURL=_ea9f270a._.js.map
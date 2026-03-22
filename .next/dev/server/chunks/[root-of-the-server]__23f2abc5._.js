module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/config/roles.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Known permission strings from the Ordrat .NET backend.
 * Copied verbatim from the old repo's dataMap in AllRolles.tsx.
 * Only roles in this list are stored in the session; unknown roles are discarded.
 */ __turbopack_context__.s([
    "KNOWN_ROLES",
    ()=>KNOWN_ROLES,
    "ROUTE_ROLES",
    ()=>ROUTE_ROLES,
    "ROUTE_ROLES_INCLUDES",
    ()=>ROUTE_ROLES_INCLUDES,
    "filterKnownRoles",
    ()=>filterKnownRoles,
    "userHasRouteAccess",
    ()=>userHasRouteAccess
]);
const KNOWN_ROLES = [
    'sellerDashboard-branches',
    'CreateBranch',
    'DeleteBranch',
    'UpdateBranch',
    'GetBranchById',
    'GetBranchByShopId',
    'ActivateBranch',
    'DeActivateBranch',
    'sellerDashboard-delivery',
    'GetDeliverById',
    'sellerDashboard-delivery-create',
    'delivery-chat',
    'sellerDashboard-faq',
    'CreateFAQCategory',
    'UpdateFAQCategory',
    'DeleteFAQCategory',
    'sellerDashboard-groups-permissions',
    'GetAllEmployee',
    'GetAllShopGroups',
    'AddEmployee',
    'DeleteEmployee',
    'UpdateEmployee',
    'ViewRoles',
    'sellerDashboard-marketingtools-banner',
    'CreateBanner',
    'ViewBanner',
    'DeleteBanner',
    'UpdateBanner',
    'sellerDashboard-orders',
    'OrderDetails',
    'CancleOrder',
    'ChangeOrderStatus',
    'GetAllDelivery',
    'AssignOrderToDelivery',
    'PrintOrderInvoice',
    'sellerDashboard-storeProducts-categories',
    'CreateCategory',
    'UpdateCategory',
    'DeleteCategory',
    'ChangeCategoryActivationStatus',
    'sellerDashboard-storeProducts-products',
    'sellerDashboard-storeProducts-products-create',
    'sellerDashboard-storeProducts-products-update',
    'DeleteProducts',
    'ChangeProductsActivationStatus',
    'sellerDashboard-coupon',
    'CreateCoupon',
    'UpdateCoupon',
    'DeleteCoupon',
    'sellerDashboard-storeSetting-additional-settings',
    'GetFakeDataByShopId',
    'UpdateFakeData',
    'CreateFakeData',
    'ShopGetById',
    'UpdateShop',
    'sellerDashboard-storeSetting-basicData',
    'sellerDashboard-storeSetting-contact-info',
    'ShopContactInfoGetByShopId',
    'CreateShopContactInfo',
    'UpdateShopContactInfo',
    'sellerDashboard-storeSetting-platforms',
    'PixelGetAll',
    'GetPixelsByShopId',
    'PixelUpdate',
    'AssignPixelToShop',
    'DeassignPixelFromShop',
    'sellerDashboard-tables',
    'sellerDashboard-tables-create',
    'UpdateTable',
    'DeleteTable',
    'sellerDashboard-printer',
    'CreatePrinter',
    'UpdatePrinter',
    'DeletePrinter',
    'AssignCategoryPrinter',
    'DeleteCategoryPrinter',
    'sellerDashboard-storeSetting-seo',
    'sellerDashboard-payment-gateways',
    'sellerDashboard-marketingtools-whatsapp',
    'sellerDashboard-point-of-sale',
    'sellerDashboard-statistics',
    'sellerDashboard-affiliate',
    'sellerDashboard-storeSetting-qr-code',
    'sellerDashboard-term-privacy',
    'sellerDashboard-term-refund',
    'sellerDashboard-abandonedOrders',
    'sellerDashboard-plans-myPlan',
    'sellerDashboard-logs'
];
const ROUTE_ROLES = {
    '/affiliate': [
        'sellerDashboard-affiliate'
    ],
    '/storeSetting/payment-gateways': [
        'sellerDashboard-payment-gateways'
    ],
    '/printer': [
        'sellerDashboard-printer'
    ],
    '/storeSetting/branches': [
        'sellerDashboard-branches'
    ],
    '/marketingtools/coupon': [
        'sellerDashboard-coupon'
    ],
    '/delivery': [
        'sellerDashboard-delivery'
    ],
    '/delivery/create': [
        'sellerDashboard-delivery-create'
    ],
    '/delivery/chat': [
        'delivery-chat'
    ],
    '/term/faq': [
        'sellerDashboard-faq'
    ],
    '/groups-permissions': [
        'sellerDashboard-groups-permissions'
    ],
    '/marketingtools/banner': [
        'sellerDashboard-marketingtools-banner'
    ],
    '/marketingtools/whatsapp': [
        'sellerDashboard-marketingtools-whatsapp'
    ],
    '/orders': [
        'sellerDashboard-orders'
    ],
    '/plans/myPlan': [
        'sellerDashboard-plans-myPlan'
    ],
    '/point-of-sale': [
        'sellerDashboard-point-of-sale'
    ],
    '/storeSetting/tables': [
        'sellerDashboard-tables'
    ],
    '/statistics': [
        'sellerDashboard-statistics'
    ],
    '/storeProducts/categories': [
        'sellerDashboard-storeProducts-categories'
    ],
    '/storeProducts/products': [
        'sellerDashboard-storeProducts-products'
    ],
    '/storeProducts/products/create': [
        'sellerDashboard-storeProducts-products-create'
    ],
    '/storeSetting/basicData': [
        'sellerDashboard-storeSetting-basicData'
    ],
    '/storeSetting/contactInfo': [
        'sellerDashboard-storeSetting-contact-info'
    ],
    '/storeSetting/contact-info': [
        'sellerDashboard-storeSetting-contact-info'
    ],
    '/marketingtools/additional-settings': [
        'sellerDashboard-storeSetting-additional-settings'
    ],
    '/marketingtools/platforms': [
        'sellerDashboard-storeSetting-platforms'
    ],
    '/storeSetting/qr-code': [
        'sellerDashboard-storeSetting-qr-code'
    ],
    '/marketingtools/seo': [
        'sellerDashboard-storeSetting-seo'
    ],
    '/term/privacy': [
        'sellerDashboard-term-privacy'
    ],
    '/term/refund': [
        'sellerDashboard-term-refund'
    ],
    '/abandonedOrders': [
        'sellerDashboard-abandonedOrders'
    ],
    '/storeSetting/logs': [
        'sellerDashboard-logs'
    ]
};
const ROUTE_ROLES_INCLUDES = {
    '/delivery/details': [
        'GetDeliverById'
    ],
    '/orders/': [
        'OrderDetails'
    ],
    '/orders/branch/assignToDelivery/': [
        'AssignOrderToDelivery'
    ],
    '/orders/ordrat/assignToDelivery/': [
        'AssignOrderToDelivery'
    ],
    '/storeProducts/products/update': [
        'sellerDashboard-storeProducts-products-update'
    ]
};
function filterKnownRoles(roles) {
    const known = new Set(KNOWN_ROLES);
    return roles.filter((r)=>known.has(r));
}
function userHasRouteAccess(userRoles, pathname) {
    // Exact-prefix match
    for (const [prefix, required] of Object.entries(ROUTE_ROLES)){
        if (pathname === prefix || pathname.startsWith(prefix + '/')) {
            return required.some((r)=>userRoles.includes(r));
        }
    }
    // Substring match for dynamic routes
    for (const [fragment, required] of Object.entries(ROUTE_ROLES_INCLUDES)){
        if (pathname.includes(fragment)) {
            return required.some((r)=>userRoles.includes(r));
        }
    }
    // Route not in any restriction map → allow all authenticated users
    return true;
}
}),
"[project]/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/roles.ts [middleware] (ecmascript)");
;
;
;
const PUBLIC_PATHS = [
    '/signin',
    '/signup',
    '/reset-password',
    '/verify-otp',
    '/change-password',
    '/verify-email',
    '/auth'
];
function isPublicPath(pathname) {
    return PUBLIC_PATHS.some((p)=>pathname === p || pathname.startsWith(p + '/'));
}
async function proxy(req) {
    const { pathname } = req.nextUrl;
    const isPublic = isPublicPath(pathname);
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    const isAuthenticated = !!token && token.error !== 'RefreshAccessTokenError';
    // Authenticated user on a public route → redirect to dashboard home
    if (isPublic && isAuthenticated) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/', req.nextUrl));
    }
    // Unauthenticated user on a protected route → redirect to sign-in
    if (!isPublic && !isAuthenticated) {
        const signInUrl = new URL('/signin', req.nextUrl);
        signInUrl.searchParams.set('callbackUrl', pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(signInUrl);
    }
    // Authenticated user — check role-based access
    if (!isPublic && isAuthenticated && token) {
        const userRoles = Array.isArray(token.roles) ? token.roles : [];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["userHasRouteAccess"])(userRoles, pathname)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL('/unauthorized', req.nextUrl));
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        /*
     * Run on all paths except:
     * - /api/* (NextAuth and other API routes)
     * - /_next/static (static files)
     * - /_next/image (image optimisation)
     * - /favicon.ico, /sitemap.xml, /robots.txt, and common static extensions
     */ '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf|eot|css|js)$).*)'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__23f2abc5._.js.map
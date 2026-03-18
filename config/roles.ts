/**
 * Known permission strings from the Ordrat .NET backend.
 * Copied verbatim from the old repo's dataMap in AllRolles.tsx.
 * Only roles in this list are stored in the session; unknown roles are discarded.
 */
export const KNOWN_ROLES = [
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
  'sellerDashboard-logs',
] as const;

export type KnownRole = (typeof KNOWN_ROLES)[number];

/**
 * Maps route path prefixes to the set of accepted role strings.
 * A user gains access if their roles include ANY one of the listed strings.
 * Copied from routeRoles in the old repo's proxy.ts.
 */
export const ROUTE_ROLES: Record<string, string[]> = {
  '/affiliate': ['sellerDashboard-affiliate'],
  '/storeSetting/payment-gateways': ['sellerDashboard-payment-gateways'],
  '/printer': ['sellerDashboard-printer'],
  '/storeSetting/branches': ['sellerDashboard-branches'],
  '/marketingtools/coupon': ['sellerDashboard-coupon'],
  '/delivery': ['sellerDashboard-delivery'],
  '/delivery/create': ['sellerDashboard-delivery-create'],
  '/delivery/chat': ['delivery-chat'],
  '/term/faq': ['sellerDashboard-faq'],
  '/groups-permissions': ['sellerDashboard-groups-permissions'],
  '/marketingtools/banner': ['sellerDashboard-marketingtools-banner'],
  '/marketingtools/whatsapp': ['sellerDashboard-marketingtools-whatsapp'],
  '/orders': ['sellerDashboard-orders'],
  '/plans/myPlan': ['sellerDashboard-plans-myPlan'],
  '/point-of-sale': ['sellerDashboard-point-of-sale'],
  '/storeSetting/tables': ['sellerDashboard-tables'],
  '/statistics': ['sellerDashboard-statistics'],
  '/storeProducts/categories': ['sellerDashboard-storeProducts-categories'],
  '/storeProducts/products': ['sellerDashboard-storeProducts-products'],
  '/storeProducts/products/create': ['sellerDashboard-storeProducts-products-create'],
  '/storeSetting/basicData': ['sellerDashboard-storeSetting-basicData'],
  '/storeSetting/contactInfo': ['sellerDashboard-storeSetting-contact-info'],
  '/storeSetting/contact-info': ['sellerDashboard-storeSetting-contact-info'],
  '/marketingtools/additional-settings': ['sellerDashboard-storeSetting-additional-settings'],
  '/marketingtools/platforms': ['sellerDashboard-storeSetting-platforms'],
  '/storeSetting/qr-code': ['sellerDashboard-storeSetting-qr-code'],
  '/marketingtools/seo': ['sellerDashboard-storeSetting-seo'],
  '/term/privacy': ['sellerDashboard-term-privacy'],
  '/term/refund': ['sellerDashboard-term-refund'],
  '/abandonedOrders': ['sellerDashboard-abandonedOrders'],
  '/storeSetting/logs': ['sellerDashboard-logs'],
};

/**
 * Routes matched via pathname.includes() for dynamic/nested paths.
 * Copied from routeRolesInCludes in the old repo's proxy.ts.
 */
export const ROUTE_ROLES_INCLUDES: Record<string, string[]> = {
  '/delivery/details': ['GetDeliverById'],
  '/orders/': ['OrderDetails'],
  '/orders/branch/assignToDelivery/': ['AssignOrderToDelivery'],
  '/orders/ordrat/assignToDelivery/': ['AssignOrderToDelivery'],
  '/storeProducts/products/update': ['sellerDashboard-storeProducts-products-update'],
};

/** Returns only the roles the frontend recognises; unknown strings are discarded. */
export function filterKnownRoles(roles: string[]): string[] {
  const known = new Set<string>(KNOWN_ROLES);
  return roles.filter((r) => known.has(r));
}

/**
 * Returns true when the user holds at least one role that grants access to the
 * given pathname. Routes not listed in ROUTE_ROLES / ROUTE_ROLES_INCLUDES are
 * considered open to all authenticated users.
 */
export function userHasRouteAccess(userRoles: string[], pathname: string): boolean {
  // Exact-prefix match
  for (const [prefix, required] of Object.entries(ROUTE_ROLES)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return required.some((r) => userRoles.includes(r));
    }
  }

  // Substring match for dynamic routes
  for (const [fragment, required] of Object.entries(ROUTE_ROLES_INCLUDES)) {
    if (pathname.includes(fragment)) {
      return required.some((r) => userRoles.includes(r));
    }
  }

  // Route not in any restriction map → allow all authenticated users
  return true;
}

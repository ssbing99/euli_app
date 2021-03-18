/* App config for apis
 */
const ApiConstants = {
  BASE_URL: 'http://application.connaq.com/API_Connaq_Cloud_ETT/',
  LOGIN: '/api/LoginAuth',
  LOGIN_IDENTITY: '/api/CompanySetup/getLoginIdentity',
  CUSTOMER: '/api/Customers',
  CUSTOMER_BY_ID: '/api/Customers/',
  CUSTOMER_BY_KEYWORD: '/api/Customers/getCustByKeyword/',
  INVENTORY: '/api/InventoryItems',
  INVENTORY_BY_ID: '/api/InventoryItems/',
  INVENTORY_BY_KEYWORD: '/api/InventoryItems/getItemsByKeyword/',
  INVENTORY_BY_COLOR: '/api/InventoryItems/getItemsByColor/',
  INVENTORY_BY_RGB: '/api/InventoryItems/getItemsByRGB/:Rcode/:Gcode/:Bcode',
  PURCHASE_HISTORY: '/api/PurchaseHistory',
  INVOICE: '/api/Invoice',
  INVOICE_BY_ID: '/api/Invoice/',
  INVOICE_LIST_BY_ID: '/api/Invoice/getInvoiceCus/',
  STATEMENT_BY_DATE: '/api/GetURL_12MonthStatement/'
};

export default ApiConstants;

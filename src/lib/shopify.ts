import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = '1prwxp-fi.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '394f4c030b48aa5c0aa64e3817c8fd38';

export interface ShopifyMetafield {
  key: string;
  value: string | null;
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          sku?: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
          image?: {
            url: string;
            altText: string | null;
          };
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    metafields?: Array<ShopifyMetafield | null>;
  };
}

export interface CartItem {
  lineId: string | null;
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Zahlung erforderlich", {
      description: "Die Shopify API benötigt einen aktiven Billing-Plan. Bitte besuche https://admin.shopify.com um deinen Store zu upgraden.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

export const METAFIELD_IDENTIFIERS = `
  metafields(identifiers: [
    {namespace: "custom", key: "gtin"},
    {namespace: "custom", key: "dimensions"},
    {namespace: "custom", key: "material"},
    {namespace: "custom", key: "color"},
    {namespace: "custom", key: "industries"},
    {namespace: "custom", key: "unit_content"},
    {namespace: "custom", key: "units_per_pallet"},
    {namespace: "custom", key: "system_group"},
    {namespace: "custom", key: "suitable_for"},
    {namespace: "custom", key: "capacity"},
    {namespace: "custom", key: "lockable"},
    {namespace: "custom", key: "view_window"},
    {namespace: "custom", key: "related_products"}
  ]) {
    key
    value
  }
`;

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
              }
            }
          }
          options {
            name
            values
          }
          ${METAFIELD_IDENTIFIERS}
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            sku
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
      options {
        name
        values
      }
      ${METAFIELD_IDENTIFIERS}
    }
  }
`;

export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ field: string[] | null; message: string }>): boolean {
  return userErrors.some(e => e.message.toLowerCase().includes('cart not found') || e.message.toLowerCase().includes('does not exist'));
}

export async function createShopifyCart(item: CartItem): Promise<{ cartId: string; checkoutUrl: string; lineId: string } | null> {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity: item.quantity, merchandiseId: item.variantId }] },
  });

  if (data?.data?.cartCreate?.userErrors?.length > 0) {
    console.error('Cart creation failed:', data.data.cartCreate.userErrors);
    return null;
  }

  const cart = data?.data?.cartCreate?.cart;
  if (!cart?.checkoutUrl) return null;

  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;

  return { cartId: cart.id, checkoutUrl: formatCheckoutUrl(cart.checkoutUrl), lineId };
}

export async function addLineToShopifyCart(cartId: string, item: CartItem): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity: item.quantity, merchandiseId: item.variantId }],
  });

  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Add line failed:', userErrors);
    return { success: false };
  }

  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: { node: { id: string; merchandise: { id: string } } }) => l.node.merchandise.id === item.variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(cartId: string, lineId: string, quantity: number): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Update line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

export async function removeLineFromShopifyCart(cartId: string, lineId: string): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });

  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) {
    console.error('Remove line failed:', userErrors);
    return { success: false };
  }
  return { success: true };
}

// ========== CUSTOMER API ==========

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  processedAt: string;
  totalPrice: { amount: string; currencyCode: string };
  fulfillmentStatus: string | null;
  statusUrl: string | null;
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
      };
    }>;
  };
}

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { code message field }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { code message field }
    }
  }
`;

const CUSTOMER_ORDERS_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            totalPrice { amount currencyCode }
            fulfillmentStatus
            statusUrl
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function createShopifyCustomer(
  email: string,
  password: string
): Promise<{ customerId: string | null; error: string | null }> {
  try {
    const data = await storefrontApiRequest(CUSTOMER_CREATE_MUTATION, {
      input: { email, password },
    });

    const errors = data?.data?.customerCreate?.customerUserErrors || [];
    if (errors.length > 0) {
      // CUSTOMER_DISABLED or TAKEN means customer already exists, which is fine
      if (errors.some((e: { code: string }) => e.code === "TAKEN" || e.code === "CUSTOMER_DISABLED")) {
        return { customerId: null, error: null };
      }
      return { customerId: null, error: errors[0].message };
    }

    const customerId = data?.data?.customerCreate?.customer?.id || null;
    return { customerId, error: null };
  } catch (err) {
    console.error("Error creating Shopify customer:", err);
    return { customerId: null, error: (err as Error).message };
  }
}

export async function getShopifyCustomerAccessToken(
  email: string,
  password: string
): Promise<{ accessToken: string | null; expiresAt: string | null; error: string | null }> {
  try {
    const data = await storefrontApiRequest(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
      input: { email, password },
    });

    const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors || [];
    if (errors.length > 0) {
      return { accessToken: null, expiresAt: null, error: errors[0].message };
    }

    const token = data?.data?.customerAccessTokenCreate?.customerAccessToken;
    return {
      accessToken: token?.accessToken || null,
      expiresAt: token?.expiresAt || null,
      error: null,
    };
  } catch (err) {
    console.error("Error getting Shopify customer access token:", err);
    return { accessToken: null, expiresAt: null, error: (err as Error).message };
  }
}

export async function getShopifyCustomerOrders(
  customerAccessToken: string
): Promise<ShopifyOrder[]> {
  try {
    const data = await storefrontApiRequest(CUSTOMER_ORDERS_QUERY, {
      customerAccessToken,
    });

    const orders = data?.data?.customer?.orders?.edges || [];
    return orders.map((edge: { node: ShopifyOrder }) => edge.node);
  } catch (err) {
    console.error("Error fetching Shopify customer orders:", err);
    return [];
  }
}

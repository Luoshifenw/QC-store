// Shopify Storefront API Client
const STORE_DOMAIN = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'dhppw0-di.myshopify.com';
const STOREFRONT_API_TOKEN = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN || '717843dbb34476fe0d3370e1b532ef88';
const API_VERSION = '2024-01';

async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  
  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  return json.data;
}

// Queries
const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage { url altText }
          variants(first: 1) {
            edges {
              node {
                id
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query Collection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage { url altText }
            variants(first: 1) {
              edges {
                node {
                  id
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id title handle description descriptionHtml
      featuredImage { url altText }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 10) {
        edges {
          node {
            id title availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
      options { id name values }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CreateCart { cartCreate { cart { id checkoutUrl } } }
`;

const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { id checkoutUrl }
    }
  }
`;

// Export functions
export async function getProducts(first: number = 8) {
  const data = await shopifyFetch<any>(PRODUCTS_QUERY, { first });
  return data?.products?.edges?.map((e: any) => e.node) || [];
}

export async function getCollection(handle: string, first: number = 50) {
  const data = await shopifyFetch<any>(COLLECTION_QUERY, { handle, first });
  const collection = data?.collection;
  if (!collection) return null;
  return {
    ...collection,
    products: collection?.products?.edges?.map((e: any) => e.node) || [],
  };
}

export async function getProduct(handle: string) {
  const data = await shopifyFetch<any>(PRODUCT_QUERY, { handle });
  return data?.product;
}

export async function createCart() {
  const data = await shopifyFetch<any>(CREATE_CART_MUTATION);
  return data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<any>(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data?.cartLinesAdd?.cart;
}

export function formatPrice(amount: number, currencyCode: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

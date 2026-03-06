// Shopify Storefront API Client
const API_VERSION = '2024-01';

type ShopifyVariables = Record<string, unknown>;
type ShopifyEdge<T> = { node: T };
type ShopifyConnection<T> = { edges: ShopifyEdge<T>[] };

type ShopifyGraphQLResponse<TData> = {
  data?: TData;
  errors?: { message: string }[];
};

type MoneyRaw = { amount: string; currencyCode: string };
type ImageRaw = { url: string; altText?: string | null };
type SelectedOption = { name: string; value: string };

type VariantRaw = {
  id: string;
  title?: string | null;
  availableForSale?: boolean | null;
  price: MoneyRaw;
  selectedOptions?: SelectedOption[] | null;
};

type ProductOption = { id: string; name: string; values: string[] };

type ProductRaw = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  descriptionHtml?: string | null;
  featuredImage?: ImageRaw | null;
  images?: ShopifyConnection<ImageRaw> | null;
  variants?: ShopifyConnection<VariantRaw> | null;
  options?: ProductOption[] | null;
};

type CollectionRaw = {
  id: string;
  title: string;
  description?: string | null;
  products?: ShopifyConnection<ProductRaw> | null;
};

type ProductsQueryData = {
  products?: ShopifyConnection<ProductRaw> | null;
};

type CollectionQueryData = {
  collection?: CollectionRaw | null;
};

type ProductQueryData = {
  product?: ProductRaw | null;
};

type CreateCartMutationData = {
  cartCreate?: { cart?: { id: string; checkoutUrl: string } | null } | null;
};

type AddToCartMutationData = {
  cartLinesAdd?: { cart?: { id: string; checkoutUrl: string } | null } | null;
};

export type ShopifyMoney = { amount: number; currencyCode: string };

export type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  selectedOptions: SelectedOption[];
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  descriptionHtml?: string;
  featuredImage?: { url: string; altText?: string };
  images?: { edges: { node: { url: string; altText?: string } }[] };
  variants?: { edges: { node: ShopifyVariant }[] };
  options?: ProductOption[];
};

export type ShopifyCollection = {
  id: string;
  title: string;
  description?: string;
  products: ShopifyProduct[];
};

function getStoreConfig() {
  const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN;
  const storefrontApiToken = process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN;

  if (!storeDomain || !storefrontApiToken) {
    throw new Error('Missing Shopify Storefront config. Please set NEXT_PUBLIC_STORE_DOMAIN and NEXT_PUBLIC_STOREFRONT_API_TOKEN.');
  }

  return { storeDomain, storefrontApiToken };
}

function mapMoney(raw: MoneyRaw): ShopifyMoney {
  return {
    amount: Number(raw.amount),
    currencyCode: raw.currencyCode,
  };
}

function mapVariant(raw: VariantRaw): ShopifyVariant {
  return {
    id: raw.id,
    title: raw.title ?? 'Default',
    availableForSale: raw.availableForSale ?? true,
    price: mapMoney(raw.price),
    selectedOptions: raw.selectedOptions ?? [],
  };
}

function mapProduct(raw: ProductRaw): ShopifyProduct {
  return {
    id: raw.id,
    title: raw.title,
    handle: raw.handle,
    description: raw.description ?? undefined,
    descriptionHtml: raw.descriptionHtml ?? undefined,
    featuredImage: raw.featuredImage
      ? {
          url: raw.featuredImage.url,
          altText: raw.featuredImage.altText ?? undefined,
        }
      : undefined,
    images: raw.images
      ? {
          edges: raw.images.edges.map(({ node }) => ({
            node: {
              url: node.url,
              altText: node.altText ?? undefined,
            },
          })),
        }
      : undefined,
    variants: raw.variants
      ? {
          edges: raw.variants.edges.map(({ node }) => ({
            node: mapVariant(node),
          })),
        }
      : undefined,
    options: raw.options ?? undefined,
  };
}

async function shopifyFetch<TData>(query: string, variables: ShopifyVariables = {}): Promise<TData> {
  const { storeDomain, storefrontApiToken } = getStoreConfig();
  const response = await fetch(`https://${storeDomain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontApiToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = (await response.json()) as ShopifyGraphQLResponse<TData>;
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || `Shopify request failed: ${response.status}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  if (!json.data) {
    throw new Error('Shopify returned empty data.');
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

const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($first: Int!, $query: String!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
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
export async function getProducts(first: number = 8): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsQueryData>(PRODUCTS_QUERY, { first });
  return data.products?.edges?.map(({ node }) => mapProduct(node)) ?? [];
}

export async function getCollection(handle: string, first: number = 50): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<CollectionQueryData>(COLLECTION_QUERY, { handle, first });
  const collection = data.collection;
  if (!collection) return null;

  return {
    id: collection.id,
    title: collection.title,
    description: collection.description ?? undefined,
    products: collection.products?.edges?.map(({ node }) => mapProduct(node)) ?? [],
  };
}

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductQueryData>(PRODUCT_QUERY, { handle });
  return data.product ? mapProduct(data.product) : null;
}

export async function searchProducts(query: string, first: number = 8): Promise<ShopifyProduct[]> {
  const keyword = query.trim();
  if (!keyword) return [];

  const data = await shopifyFetch<ProductsQueryData>(SEARCH_PRODUCTS_QUERY, { first, query: keyword });
  return data.products?.edges?.map(({ node }) => mapProduct(node)) ?? [];
}

export async function createCart() {
  const data = await shopifyFetch<CreateCartMutationData>(CREATE_CART_MUTATION);
  return data.cartCreate?.cart;
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const data = await shopifyFetch<AddToCartMutationData>(ADD_TO_CART_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });
  return data.cartLinesAdd?.cart;
}

export function formatPrice(amount: number, currencyCode: string = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}

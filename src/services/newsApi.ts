import apiClient from "./api";
import { API_ENDPOINTS } from "../utils/config";

export interface NewsQueryParams {
  searchText?: string;
  pageIndex?: number;
  pageSize?: number;
}

export interface NewsLink {
  name: string;
  href: string;
}

export interface NewsItem {
  id: string;
  url: string;
  title: string;
  date?: string;
  headImage?: string;
  heroImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  paragraphs: string[];
  links: NewsLink[];
  raw: Record<string, unknown>;
}

export interface NewsPagination {
  pageIndex: number;
  pageSize: number;
  total: number;
  count: number;
}

export interface NewsListResponse {
  items: NewsItem[];
  pagination: NewsPagination;
  raw: unknown;
}

export const DEFAULT_NEWS_QUERY_PARAMS: Required<NewsQueryParams> = {
  searchText: "",
  pageIndex: 1,
  pageSize: 100,
};

const asObject = (value: unknown): Record<string, unknown> | null => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
};

const getString = (obj: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return undefined;
};

const getStringArray = (obj: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (Array.isArray(value)) {
      const stringValues = value.filter(
        (item): item is string => typeof item === "string",
      );
      if (stringValues.length > 0) {
        return stringValues;
      }
    }
  }
  return [];
};

const getLinks = (obj: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const value = obj[key];
    if (Array.isArray(value)) {
      const links = value
        .map((item) => {
          const linkObject = asObject(item);
          if (!linkObject) return null;

          const name = getString(linkObject, ["name", "title", "label"]);
          const href = getString(linkObject, ["href", "url", "link"]);

          if (!name || !href) return null;
          return { name, href };
        })
        .filter((item): item is NewsLink => !!item);

      if (links.length > 0) {
        return links;
      }
    }
  }
  return [];
};

const getNumber = (obj: Record<string, unknown>, keys: string[], fallback = 0) => {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }
  return fallback;
};

const findItemsArray = (payload: unknown): Record<string, unknown>[] => {
  const queue: unknown[] = [payload];

  while (queue.length > 0) {
    const current = queue.shift();
    const currentObj = asObject(current);
    if (!currentObj) continue;

    for (const value of Object.values(currentObj)) {
      if (Array.isArray(value)) {
        const objectArray = value
          .map((item) => asObject(item))
          .filter((item): item is Record<string, unknown> => !!item);

        if (objectArray.length > 0) {
          const first = objectArray[0];
          if (
            "title" in first ||
            "url" in first ||
            "id" in first ||
            "meta_title" in first
          ) {
            return objectArray;
          }
        }
      }

      if (value && typeof value === "object") {
        queue.push(value);
      }
    }
  }

  return [];
};

const normalizeNewsItem = (
  item: Record<string, unknown>,
  index: number,
): NewsItem => {
  const url = getString(item, ["url", "slug", "id"]) || `news-${index}`;
  const id = getString(item, ["id", "_id", "news_id", "url", "slug"]) || url;

  return {
    id,
    url,
    title: getString(item, ["title", "heading", "name"]) || "Untitled News",
    date: getString(item, ["date", "publishedAt", "createdAt"]),
    headImage: getString(item, ["head_image", "headImage", "image", "thumbnail"]),
    heroImage: getString(item, ["hero_image", "heroImage", "banner", "coverImage"]),
    metaTitle: getString(item, ["meta_title", "metaTitle", "seoTitle"]),
    metaDescription: getString(item, [
      "meta_description",
      "metaDescription",
      "description",
      "summary",
    ]),
    paragraphs: getStringArray(item, ["paragraph", "paragraphs", "content"]),
    links: getLinks(item, ["urls", "links", "references"]),
    raw: item,
  };
};

const normalizePagination = (
  payload: unknown,
  params: Required<NewsQueryParams>,
  itemCount: number,
): NewsPagination => {
  const payloadObj = asObject(payload);
  const paginationObj = asObject(payloadObj?.pagination);
  const dataObj = asObject(payloadObj?.data);

  const pageSize =
    getNumber(paginationObj || {}, ["pageSize"], params.pageSize) ||
    params.pageSize;
  const pageIndex =
    getNumber(paginationObj || {}, ["pageIndex"], params.pageIndex) ||
    params.pageIndex;
  const total =
    getNumber(paginationObj || {}, ["total"], 0) ||
    getNumber(dataObj || {}, ["total", "count"], itemCount) ||
    itemCount;
  const count =
    getNumber(dataObj || {}, ["count"], itemCount) ||
    itemCount;

  return {
    pageIndex,
    pageSize,
    total,
    count,
  };
};

const normalizeParams = (
  params?: NewsQueryParams,
): Required<NewsQueryParams> => ({
  searchText: params?.searchText?.trim() || DEFAULT_NEWS_QUERY_PARAMS.searchText,
  pageIndex: params?.pageIndex ?? DEFAULT_NEWS_QUERY_PARAMS.pageIndex,
  pageSize: params?.pageSize ?? DEFAULT_NEWS_QUERY_PARAMS.pageSize,
});

export const createNewsQueryKey = (params?: NewsQueryParams) => {
  const normalized = normalizeParams(params);
  return [
    "news",
    normalized.searchText,
    normalized.pageIndex,
    normalized.pageSize,
  ] as const;
};

export const fetchNews = async (params?: NewsQueryParams): Promise<NewsListResponse> => {
  const normalized = normalizeParams(params);

  try {
    console.log("Api endpoints:", apiClient.defaults.baseURL, API_ENDPOINTS.news);
    const response = await apiClient.post(
      API_ENDPOINTS.news,
      {
        filters: {
          searchText: normalized.searchText,
        },
      },
      {
        params: {
          pageIndex: normalized.pageIndex,
          pageSize: normalized.pageSize,
        },
      },
    );
    console.log("Raw news API response:", response.data);

    const rawPayload = response.data;
    const itemsArray = findItemsArray(rawPayload);
    const items = itemsArray.map(normalizeNewsItem);

    return {
      items,
      pagination: normalizePagination(rawPayload, normalized, items.length),
      raw: rawPayload,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error while fetching news";
    throw new Error(`Failed to fetch news: ${message}`);
  }
};

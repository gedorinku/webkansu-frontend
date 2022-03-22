import { getAuthHeaders } from ".";
import { CreateBookmarkRequestBody, CreateNovelRequestBody, SignInRequestBody } from "../api";

export const signIn = async (params: SignInRequestBody) =>
  await fetch('http://localhost:3000/api/auth/sign_in', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })

export type FindNovelBySlugParams = {
  slug: string;
}
export const findNovelBySlug = async (params: FindNovelBySlugParams): Promise<Response> => {
  const query = new URLSearchParams({
    provider: 'narou',
    slug: params.slug
  });
  const authHeaders = await getAuthHeaders();
  return fetch(`http://localhost:3000/api/user/novels/find?${query}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders
    }
  });
}

export type CreateNovelParams = {
  novelTitle: string;
  novelWriterName: string;
  novelSlug: string
}
export const createNovel = async (params: CreateNovelParams): Promise<Response> => {
  const createNovelRequestBody: CreateNovelRequestBody = {
    title: params.novelTitle,
    author_name: params.novelWriterName,
    provider: 'narou',
    slug: params.novelSlug,
  };
  const authHeaders = await getAuthHeaders();
  return fetch('http://localhost:3000/api/user/novels', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(createNovelRequestBody),
  });
}

export type CreateBookmarkParams = {
  id: string;
  novelSubtitle: string;
  latestPosition: string;
  chapterSlug: string
}
export const createBookmark = async (params: CreateBookmarkParams): Promise<Response> => {
  const createBookmarkRequestBody: CreateBookmarkRequestBody = {
    title: params.novelSubtitle,
    position: params.latestPosition,
    slug: params.chapterSlug,
  };
  const authHeaders = await getAuthHeaders();
  return fetch(`http://localhost:3000/api/user/novels/${params.id}/bookmark`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(createBookmarkRequestBody),
  });
}

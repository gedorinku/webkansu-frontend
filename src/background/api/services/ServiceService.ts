/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookmark } from '../models/Bookmark';
import type { CreateBookmarkRequestBody } from '../models/CreateBookmarkRequestBody';
import type { CreateNovelRequestBody } from '../models/CreateNovelRequestBody';
import type { GetCurrentUserResponseBody } from '../models/GetCurrentUserResponseBody';
import type { Novel } from '../models/Novel';
import type { NovelProvider } from '../models/NovelProvider';
import type { RegisterUserRequestBody } from '../models/RegisterUserRequestBody';
import type { RegisterUserResponseBody } from '../models/RegisterUserResponseBody';
import type { SignInRequestBody } from '../models/SignInRequestBody';
import type { SignInResponseBody } from '../models/SignInResponseBody';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * ユーザー登録をする。
     * @param requestBody
     * @returns RegisterUserResponseBody この時のレスポンスヘッダーをリクエストヘッダーに含めると、認証が必要なリクエストができる。
     * @throws ApiError
     */
    public static registerUser(
        requestBody: RegisterUserRequestBody,
    ): CancelablePromise<RegisterUserResponseBody> {
        return __request({
            method: 'POST',
            path: `/api/auth`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * ログインする。
     * @param requestBody
     * @returns SignInResponseBody この時のレスポンスヘッダーをリクエストヘッダーに含めると、認証が必要なリクエストができる。
     * @throws ApiError
     */
    public static signIn(
        requestBody: SignInRequestBody,
    ): CancelablePromise<SignInResponseBody> {
        return __request({
            method: 'POST',
            path: `/api/auth/sign_in`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * ログインしているユーザーの情報を返す。
     * @returns GetCurrentUserResponseBody
     * @throws ApiError
     */
    public static getCurrentUser(): CancelablePromise<GetCurrentUserResponseBody> {
        return __request({
            method: 'GET',
            path: `/api/user`,
        });
    }

    /**
     * 読んだ小説の一覧を返す。
     * @returns Novel
     * @throws ApiError
     */
    public static listNovels(): CancelablePromise<Array<Novel>> {
        return __request({
            method: 'GET',
            path: `/api/user/novels`,
        });
    }

    /**
     * 小説を追加する。
     * @param requestBody
     * @returns Novel
     * @throws ApiError
     */
    public static createNovel(
        requestBody: CreateNovelRequestBody,
    ): CancelablePromise<Novel> {
        return __request({
            method: 'POST',
            path: `/api/user/novels`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * slug から読んだことのある小説と最後に読んだ位置を返す。
     * @param provider
     * @param slug `n0123ab` などのprovider のサービス内で、小説の URL を組み立てるための文字列。
     * @returns Novel
     * @throws ApiError
     */
    public static getNovelBySlug(
        provider: NovelProvider,
        slug: string,
    ): CancelablePromise<Novel> {
        return __request({
            method: 'GET',
            path: `/api/user/novels/find`,
            query: {
                'provider': provider,
                'slug': slug,
            },
        });
    }

    /**
     * しおりを作成する。
     * @param id 小説のid。
     * @param requestBody
     * @returns Bookmark
     * @throws ApiError
     */
    public static createBookmark(
        id: number,
        requestBody: CreateBookmarkRequestBody,
    ): CancelablePromise<Bookmark> {
        return __request({
            method: 'POST',
            path: `/api/user/novels/${id}/bookmark`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
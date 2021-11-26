/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NovelProvider } from './NovelProvider';

export type CreateNovelRequestBody = {
    /**
     * 小説のタイトル。
     */
    title: string;
    /**
     * 小説の著者名。
     */
    author_name: string;
    provider: NovelProvider;
    /**
     * `n0123ab` などのprovider のサービス内で、小説の URL を組み立てるための文字列。
     */
    slug: string;
}

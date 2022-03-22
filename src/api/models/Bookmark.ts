/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Bookmark = {
    /**
     * チャプターの URL を組み立てるための文字列。`/n0123ab/1/`の `1` にあたる。
     */
    slug: string;
    /**
     * スクロール位置を表す文字列。HTML の id 属性の値などが入る。
     */
    position: string;
    /**
     * チャプターのタイトル。
     */
    title: string;
    /**
     * しおりの更新日時。
     */
    updated_at: string;
};

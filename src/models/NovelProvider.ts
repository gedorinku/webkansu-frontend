/* tslint:disable */
/* eslint-disable */
/**
 * webkansu-backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * 小説が掲載されているサービスを表す。
 * @export
 * @enum {string}
 */
export enum NovelProvider {
    Narou = 'narou'
}

export function NovelProviderFromJSON(json: any): NovelProvider {
    return NovelProviderFromJSONTyped(json, false);
}

export function NovelProviderFromJSONTyped(json: any, ignoreDiscriminator: boolean): NovelProvider {
    return json as NovelProvider;
}

export function NovelProviderToJSON(value?: NovelProvider | null): any {
    return value as any;
}


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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GetCurrentUserResponseBody
 */
export interface GetCurrentUserResponseBody {
    /**
     * 
     * @type {number}
     * @memberof GetCurrentUserResponseBody
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof GetCurrentUserResponseBody
     */
    uid: string;
}

export function GetCurrentUserResponseBodyFromJSON(json: any): GetCurrentUserResponseBody {
    return GetCurrentUserResponseBodyFromJSONTyped(json, false);
}

export function GetCurrentUserResponseBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetCurrentUserResponseBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'uid': json['uid'],
    };
}

export function GetCurrentUserResponseBodyToJSON(value?: GetCurrentUserResponseBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'uid': value.uid,
    };
}


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
 * @interface SignInRequestBody
 */
export interface SignInRequestBody {
    /**
     * 
     * @type {string}
     * @memberof SignInRequestBody
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof SignInRequestBody
     */
    password: string;
}

export function SignInRequestBodyFromJSON(json: any): SignInRequestBody {
    return SignInRequestBodyFromJSONTyped(json, false);
}

export function SignInRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): SignInRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function SignInRequestBodyToJSON(value?: SignInRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
    };
}


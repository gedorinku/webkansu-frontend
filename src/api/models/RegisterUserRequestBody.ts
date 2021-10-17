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
 * @interface RegisterUserRequestBody
 */
export interface RegisterUserRequestBody {
    /**
     * 
     * @type {string}
     * @memberof RegisterUserRequestBody
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserRequestBody
     */
    password: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserRequestBody
     */
    passwordConfirmation: string;
}

export function RegisterUserRequestBodyFromJSON(json: any): RegisterUserRequestBody {
    return RegisterUserRequestBodyFromJSONTyped(json, false);
}

export function RegisterUserRequestBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): RegisterUserRequestBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
        'passwordConfirmation': json['password_confirmation'],
    };
}

export function RegisterUserRequestBodyToJSON(value?: RegisterUserRequestBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'password_confirmation': value.passwordConfirmation,
    };
}


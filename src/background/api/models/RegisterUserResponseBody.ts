/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RegisterUserResponseBody = {
    status: string;
    data: {
        id: number;
        provider: string;
        uid: string;
        email: string;
        created_at: string;
        updated_at: string;
    };
}

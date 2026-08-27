/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfUserResponseDto } from '../models/ApiResponseOfIEnumerableOfUserResponseDto';
import type { ApiResponseOfUserResponseDto } from '../models/ApiResponseOfUserResponseDto';
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * @returns ApiResponseOfIEnumerableOfUserResponseDto OK
     * @throws ApiError
     */
    public static getApiUsers(): CancelablePromise<ApiResponseOfIEnumerableOfUserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfUserResponseDto OK
     * @throws ApiError
     */
    public static postApiUsers(
        requestBody: CreateUserDto,
    ): CancelablePromise<ApiResponseOfUserResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfUserResponseDto OK
     * @throws ApiError
     */
    public static getApiUsers1(
        id: string,
    ): CancelablePromise<ApiResponseOfUserResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfUserResponseDto OK
     * @throws ApiError
     */
    public static putApiUsers(
        id: string,
        requestBody: UpdateUserDto,
    ): CancelablePromise<ApiResponseOfUserResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static deleteApiUsers(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Users/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static putApiUsersRole(
        id: string,
        requestBody: number | string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Users/{id}/role',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static putApiUsersActivate(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Users/{id}/activate',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static putApiUsersDeactivate(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Users/{id}/deactivate',
            path: {
                'id': id,
            },
        });
    }
}

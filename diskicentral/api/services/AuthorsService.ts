/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfAuthorResponseDto } from '../models/ApiResponseOfAuthorResponseDto';
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfAuthorResponseDto } from '../models/ApiResponseOfIEnumerableOfAuthorResponseDto';
import type { CreateAuthorDto } from '../models/CreateAuthorDto';
import type { UpdateAuthorDto } from '../models/UpdateAuthorDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthorsService {
    /**
     * @returns ApiResponseOfIEnumerableOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static getApiAuthors(): CancelablePromise<ApiResponseOfIEnumerableOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Authors',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static postApiAuthors(
        requestBody: CreateAuthorDto,
    ): CancelablePromise<ApiResponseOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Authors',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static getApiAuthors1(
        id: string,
    ): CancelablePromise<ApiResponseOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Authors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static putApiAuthors(
        id: string,
        requestBody: UpdateAuthorDto,
    ): CancelablePromise<ApiResponseOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Authors/{id}',
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
    public static deleteApiAuthors(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Authors/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static getApiAuthorsSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Authors/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @param userId
     * @returns ApiResponseOfAuthorResponseDto OK
     * @throws ApiError
     */
    public static getApiAuthorsUser(
        userId: string,
    ): CancelablePromise<ApiResponseOfAuthorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Authors/user/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfTagResponseDto } from '../models/ApiResponseOfIEnumerableOfTagResponseDto';
import type { ApiResponseOfTagResponseDto } from '../models/ApiResponseOfTagResponseDto';
import type { CreateTagDto } from '../models/CreateTagDto';
import type { UpdateTagDto } from '../models/UpdateTagDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TagsService {
    /**
     * @returns ApiResponseOfIEnumerableOfTagResponseDto OK
     * @throws ApiError
     */
    public static getApiTags(): CancelablePromise<ApiResponseOfIEnumerableOfTagResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Tags',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfTagResponseDto OK
     * @throws ApiError
     */
    public static postApiTags(
        requestBody: CreateTagDto,
    ): CancelablePromise<ApiResponseOfTagResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Tags',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfTagResponseDto OK
     * @throws ApiError
     */
    public static getApiTags1(
        id: string,
    ): CancelablePromise<ApiResponseOfTagResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Tags/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfTagResponseDto OK
     * @throws ApiError
     */
    public static putApiTags(
        id: string,
        requestBody: UpdateTagDto,
    ): CancelablePromise<ApiResponseOfTagResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Tags/{id}',
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
    public static deleteApiTags(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Tags/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfTagResponseDto OK
     * @throws ApiError
     */
    public static getApiTagsSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfTagResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Tags/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
}

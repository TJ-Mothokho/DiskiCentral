/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfCategoryResponseDto } from '../models/ApiResponseOfCategoryResponseDto';
import type { ApiResponseOfIEnumerableOfCategoryResponseDto } from '../models/ApiResponseOfIEnumerableOfCategoryResponseDto';
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { UpdateCategoryDto } from '../models/UpdateCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * @returns ApiResponseOfIEnumerableOfCategoryResponseDto OK
     * @throws ApiError
     */
    public static getApiCategories(): CancelablePromise<ApiResponseOfIEnumerableOfCategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Categories',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfCategoryResponseDto OK
     * @throws ApiError
     */
    public static postApiCategories(
        requestBody: CreateCategoryDto,
    ): CancelablePromise<ApiResponseOfCategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfCategoryResponseDto OK
     * @throws ApiError
     */
    public static getApiCategories1(
        id: string,
    ): CancelablePromise<ApiResponseOfCategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfCategoryResponseDto OK
     * @throws ApiError
     */
    public static putApiCategories(
        id: string,
        requestBody: UpdateCategoryDto,
    ): CancelablePromise<ApiResponseOfCategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Categories/{id}',
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
    public static deleteApiCategories(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfCategoryResponseDto OK
     * @throws ApiError
     */
    public static getApiCategoriesSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfCategoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Categories/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfVideoResponseDto } from '../models/ApiResponseOfIEnumerableOfVideoResponseDto';
import type { ApiResponseOfVideoResponseDto } from '../models/ApiResponseOfVideoResponseDto';
import type { CreateVideoDto } from '../models/CreateVideoDto';
import type { UpdateVideoDto } from '../models/UpdateVideoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VideosService {
    /**
     * @returns ApiResponseOfIEnumerableOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideos(): CancelablePromise<ApiResponseOfIEnumerableOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfVideoResponseDto OK
     * @throws ApiError
     */
    public static postApiVideos(
        requestBody: CreateVideoDto,
    ): CancelablePromise<ApiResponseOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Videos',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideos1(
        id: string,
    ): CancelablePromise<ApiResponseOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfVideoResponseDto OK
     * @throws ApiError
     */
    public static putApiVideos(
        id: string,
        requestBody: UpdateVideoDto,
    ): CancelablePromise<ApiResponseOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Videos/{id}',
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
    public static deleteApiVideos(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Videos/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideosSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @returns ApiResponseOfIEnumerableOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideosFeatured(): CancelablePromise<ApiResponseOfIEnumerableOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos/featured',
        });
    }
    /**
     * @param authorId
     * @returns ApiResponseOfIEnumerableOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideosAuthor(
        authorId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos/author/{authorId}',
            path: {
                'authorId': authorId,
            },
        });
    }
    /**
     * @param categoryId
     * @returns ApiResponseOfIEnumerableOfVideoResponseDto OK
     * @throws ApiError
     */
    public static getApiVideosCategory(
        categoryId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfVideoResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Videos/category/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }
}

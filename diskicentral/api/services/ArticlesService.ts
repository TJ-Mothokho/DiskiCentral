/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfArticleResponseDto } from '../models/ApiResponseOfArticleResponseDto';
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfArticleResponseDto } from '../models/ApiResponseOfIEnumerableOfArticleResponseDto';
import type { CreateArticleDto } from '../models/CreateArticleDto';
import type { UpdateArticleDto } from '../models/UpdateArticleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ArticlesService {
    /**
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticles(): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfArticleResponseDto OK
     * @throws ApiError
     */
    public static postApiArticles(
        requestBody: CreateArticleDto,
    ): CancelablePromise<ApiResponseOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Articles',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticles1(
        id: string,
    ): CancelablePromise<ApiResponseOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfArticleResponseDto OK
     * @throws ApiError
     */
    public static putApiArticles(
        id: string,
        requestBody: UpdateArticleDto,
    ): CancelablePromise<ApiResponseOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Articles/{id}',
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
    public static deleteApiArticles(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Articles/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesFeatured(): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/featured',
        });
    }
    /**
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesTrending(): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/trending',
        });
    }
    /**
     * @param authorId
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesAuthor(
        authorId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/author/{authorId}',
            path: {
                'authorId': authorId,
            },
        });
    }
    /**
     * @param categoryId
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesCategory(
        categoryId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/category/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }
    /**
     * @param q
     * @returns ApiResponseOfIEnumerableOfArticleResponseDto OK
     * @throws ApiError
     */
    public static getApiArticlesSearch(
        q?: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfArticleResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Articles/search',
            query: {
                'q': q,
            },
        });
    }
    /**
     * @param id
     * @param relatedId
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static postApiArticlesRelated(
        id: string,
        relatedId: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Articles/{id}/related/{relatedId}',
            path: {
                'id': id,
                'relatedId': relatedId,
            },
        });
    }
    /**
     * @param id
     * @param relatedId
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static deleteApiArticlesRelated(
        id: string,
        relatedId: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Articles/{id}/related/{relatedId}',
            path: {
                'id': id,
                'relatedId': relatedId,
            },
        });
    }
}

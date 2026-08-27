/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfPlayerResponseDto } from '../models/ApiResponseOfIEnumerableOfPlayerResponseDto';
import type { ApiResponseOfPlayerResponseDto } from '../models/ApiResponseOfPlayerResponseDto';
import type { CreatePlayerDto } from '../models/CreatePlayerDto';
import type { UpdatePlayerDto } from '../models/UpdatePlayerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayersService {
    /**
     * @returns ApiResponseOfIEnumerableOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayers(): CancelablePromise<ApiResponseOfIEnumerableOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static postApiPlayers(
        requestBody: CreatePlayerDto,
    ): CancelablePromise<ApiResponseOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Players',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayers1(
        id: string,
    ): CancelablePromise<ApiResponseOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static putApiPlayers(
        id: string,
        requestBody: UpdatePlayerDto,
    ): CancelablePromise<ApiResponseOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Players/{id}',
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
    public static deleteApiPlayers(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Players/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayersSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @param teamId
     * @returns ApiResponseOfIEnumerableOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayersTeam(
        teamId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players/team/{teamId}',
            path: {
                'teamId': teamId,
            },
        });
    }
    /**
     * @param query
     * @returns ApiResponseOfIEnumerableOfPlayerResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayersSearch(
        query?: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfPlayerResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Players/search',
            query: {
                'query': query,
            },
        });
    }
}

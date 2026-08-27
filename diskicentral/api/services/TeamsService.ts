/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfTeamResponseDto } from '../models/ApiResponseOfIEnumerableOfTeamResponseDto';
import type { ApiResponseOfTeamResponseDto } from '../models/ApiResponseOfTeamResponseDto';
import type { CreateTeamDto } from '../models/CreateTeamDto';
import type { UpdateTeamDto } from '../models/UpdateTeamDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamsService {
    /**
     * @returns ApiResponseOfIEnumerableOfTeamResponseDto OK
     * @throws ApiError
     */
    public static getApiTeams(): CancelablePromise<ApiResponseOfIEnumerableOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Teams',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfTeamResponseDto OK
     * @throws ApiError
     */
    public static postApiTeams(
        requestBody: CreateTeamDto,
    ): CancelablePromise<ApiResponseOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Teams',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfTeamResponseDto OK
     * @throws ApiError
     */
    public static getApiTeams1(
        id: string,
    ): CancelablePromise<ApiResponseOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Teams/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfTeamResponseDto OK
     * @throws ApiError
     */
    public static putApiTeams(
        id: string,
        requestBody: UpdateTeamDto,
    ): CancelablePromise<ApiResponseOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Teams/{id}',
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
    public static deleteApiTeams(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Teams/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfTeamResponseDto OK
     * @throws ApiError
     */
    public static getApiTeamsSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Teams/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @param competitionId
     * @returns ApiResponseOfIEnumerableOfTeamResponseDto OK
     * @throws ApiError
     */
    public static getApiTeamsCompetition(
        competitionId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfTeamResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Teams/competition/{competitionId}',
            path: {
                'competitionId': competitionId,
            },
        });
    }
}

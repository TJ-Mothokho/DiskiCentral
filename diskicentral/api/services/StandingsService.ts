/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfStandingResponseDto } from '../models/ApiResponseOfIEnumerableOfStandingResponseDto';
import type { ApiResponseOfStandingResponseDto } from '../models/ApiResponseOfStandingResponseDto';
import type { CreateStandingDto } from '../models/CreateStandingDto';
import type { UpdateStandingDto } from '../models/UpdateStandingDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StandingsService {
    /**
     * @returns ApiResponseOfIEnumerableOfStandingResponseDto OK
     * @throws ApiError
     */
    public static getApiStandings(): CancelablePromise<ApiResponseOfIEnumerableOfStandingResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Standings',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfStandingResponseDto OK
     * @throws ApiError
     */
    public static postApiStandings(
        requestBody: CreateStandingDto,
    ): CancelablePromise<ApiResponseOfStandingResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Standings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfStandingResponseDto OK
     * @throws ApiError
     */
    public static getApiStandings1(
        id: string,
    ): CancelablePromise<ApiResponseOfStandingResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Standings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfStandingResponseDto OK
     * @throws ApiError
     */
    public static putApiStandings(
        id: string,
        requestBody: UpdateStandingDto,
    ): CancelablePromise<ApiResponseOfStandingResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Standings/{id}',
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
    public static deleteApiStandings(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Standings/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param competitionId
     * @returns ApiResponseOfIEnumerableOfStandingResponseDto OK
     * @throws ApiError
     */
    public static getApiStandingsCompetition(
        competitionId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfStandingResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Standings/competition/{competitionId}',
            path: {
                'competitionId': competitionId,
            },
        });
    }
}

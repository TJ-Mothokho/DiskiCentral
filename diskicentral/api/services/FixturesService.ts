/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfFixtureResponseDto } from '../models/ApiResponseOfFixtureResponseDto';
import type { ApiResponseOfIEnumerableOfFixtureResponseDto } from '../models/ApiResponseOfIEnumerableOfFixtureResponseDto';
import type { CreateFixtureDto } from '../models/CreateFixtureDto';
import type { UpdateFixtureDto } from '../models/UpdateFixtureDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FixturesService {
    /**
     * @returns ApiResponseOfIEnumerableOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixtures(): CancelablePromise<ApiResponseOfIEnumerableOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static postApiFixtures(
        requestBody: CreateFixtureDto,
    ): CancelablePromise<ApiResponseOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Fixtures',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixtures1(
        id: string,
    ): CancelablePromise<ApiResponseOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static putApiFixtures(
        id: string,
        requestBody: UpdateFixtureDto,
    ): CancelablePromise<ApiResponseOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Fixtures/{id}',
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
    public static deleteApiFixtures(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Fixtures/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns ApiResponseOfIEnumerableOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixturesUpcoming(): CancelablePromise<ApiResponseOfIEnumerableOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures/upcoming',
        });
    }
    /**
     * @returns ApiResponseOfIEnumerableOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixturesFinished(): CancelablePromise<ApiResponseOfIEnumerableOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures/finished',
        });
    }
    /**
     * @param competitionId
     * @returns ApiResponseOfIEnumerableOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixturesCompetition(
        competitionId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures/competition/{competitionId}',
            path: {
                'competitionId': competitionId,
            },
        });
    }
    /**
     * @param teamId
     * @returns ApiResponseOfIEnumerableOfFixtureResponseDto OK
     * @throws ApiError
     */
    public static getApiFixturesTeam(
        teamId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfFixtureResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Fixtures/team/{teamId}',
            path: {
                'teamId': teamId,
            },
        });
    }
}

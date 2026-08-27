/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfResultResponseDto } from '../models/ApiResponseOfIEnumerableOfResultResponseDto';
import type { ApiResponseOfResultResponseDto } from '../models/ApiResponseOfResultResponseDto';
import type { CreateResultDto } from '../models/CreateResultDto';
import type { UpdateResultDto } from '../models/UpdateResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ResultsService {
    /**
     * @returns ApiResponseOfIEnumerableOfResultResponseDto OK
     * @throws ApiError
     */
    public static getApiResults(): CancelablePromise<ApiResponseOfIEnumerableOfResultResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Results',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfResultResponseDto OK
     * @throws ApiError
     */
    public static postApiResults(
        requestBody: CreateResultDto,
    ): CancelablePromise<ApiResponseOfResultResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Results',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfResultResponseDto OK
     * @throws ApiError
     */
    public static getApiResults1(
        id: string,
    ): CancelablePromise<ApiResponseOfResultResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Results/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfResultResponseDto OK
     * @throws ApiError
     */
    public static putApiResults(
        id: string,
        requestBody: UpdateResultDto,
    ): CancelablePromise<ApiResponseOfResultResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Results/{id}',
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
    public static deleteApiResults(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Results/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param fixtureId
     * @returns ApiResponseOfResultResponseDto OK
     * @throws ApiError
     */
    public static getApiResultsFixture(
        fixtureId: string,
    ): CancelablePromise<ApiResponseOfResultResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Results/fixture/{fixtureId}',
            path: {
                'fixtureId': fixtureId,
            },
        });
    }
}

/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfCompetitionResponseDto } from '../models/ApiResponseOfCompetitionResponseDto';
import type { ApiResponseOfIEnumerableOfCompetitionResponseDto } from '../models/ApiResponseOfIEnumerableOfCompetitionResponseDto';
import type { CreateCompetitionDto } from '../models/CreateCompetitionDto';
import type { UpdateCompetitionDto } from '../models/UpdateCompetitionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CompetitionsService {
    /**
     * @returns ApiResponseOfIEnumerableOfCompetitionResponseDto OK
     * @throws ApiError
     */
    public static getApiCompetitions(): CancelablePromise<ApiResponseOfIEnumerableOfCompetitionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Competitions',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfCompetitionResponseDto OK
     * @throws ApiError
     */
    public static postApiCompetitions(
        requestBody: CreateCompetitionDto,
    ): CancelablePromise<ApiResponseOfCompetitionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Competitions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfCompetitionResponseDto OK
     * @throws ApiError
     */
    public static getApiCompetitions1(
        id: string,
    ): CancelablePromise<ApiResponseOfCompetitionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Competitions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfCompetitionResponseDto OK
     * @throws ApiError
     */
    public static putApiCompetitions(
        id: string,
        requestBody: UpdateCompetitionDto,
    ): CancelablePromise<ApiResponseOfCompetitionResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Competitions/{id}',
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
    public static deleteApiCompetitions(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Competitions/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param slug
     * @returns ApiResponseOfCompetitionResponseDto OK
     * @throws ApiError
     */
    public static getApiCompetitionsSlug(
        slug: string,
    ): CancelablePromise<ApiResponseOfCompetitionResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Competitions/slug/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
}

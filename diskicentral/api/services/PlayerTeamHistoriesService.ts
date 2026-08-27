/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto } from '../models/ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto';
import type { ApiResponseOfPlayerTeamHistoryResponseDto } from '../models/ApiResponseOfPlayerTeamHistoryResponseDto';
import type { CreatePlayerTeamHistoryDto } from '../models/CreatePlayerTeamHistoryDto';
import type { UpdatePlayerTeamHistoryDto } from '../models/UpdatePlayerTeamHistoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PlayerTeamHistoriesService {
    /**
     * @returns ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayerTeamHistories(): CancelablePromise<ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PlayerTeamHistories',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static postApiPlayerTeamHistories(
        requestBody: CreatePlayerTeamHistoryDto,
    ): CancelablePromise<ApiResponseOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/PlayerTeamHistories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayerTeamHistories1(
        id: string,
    ): CancelablePromise<ApiResponseOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PlayerTeamHistories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static putApiPlayerTeamHistories(
        id: string,
        requestBody: UpdatePlayerTeamHistoryDto,
    ): CancelablePromise<ApiResponseOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/PlayerTeamHistories/{id}',
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
    public static deleteApiPlayerTeamHistories(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/PlayerTeamHistories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param playerId
     * @returns ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayerTeamHistoriesPlayer(
        playerId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PlayerTeamHistories/player/{playerId}',
            path: {
                'playerId': playerId,
            },
        });
    }
    /**
     * @param teamId
     * @returns ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto OK
     * @throws ApiError
     */
    public static getApiPlayerTeamHistoriesTeam(
        teamId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfPlayerTeamHistoryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PlayerTeamHistories/team/{teamId}',
            path: {
                'teamId': teamId,
            },
        });
    }
}

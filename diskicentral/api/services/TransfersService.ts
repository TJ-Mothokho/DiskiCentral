/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ApiResponseOfIEnumerableOfTransferResponseDto } from '../models/ApiResponseOfIEnumerableOfTransferResponseDto';
import type { ApiResponseOfTransferResponseDto } from '../models/ApiResponseOfTransferResponseDto';
import type { CreateTransferDto } from '../models/CreateTransferDto';
import type { UpdateTransferDto } from '../models/UpdateTransferDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransfersService {
    /**
     * @returns ApiResponseOfIEnumerableOfTransferResponseDto OK
     * @throws ApiError
     */
    public static getApiTransfers(): CancelablePromise<ApiResponseOfIEnumerableOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Transfers',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfTransferResponseDto OK
     * @throws ApiError
     */
    public static postApiTransfers(
        requestBody: CreateTransferDto,
    ): CancelablePromise<ApiResponseOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Transfers',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns ApiResponseOfTransferResponseDto OK
     * @throws ApiError
     */
    public static getApiTransfers1(
        id: string,
    ): CancelablePromise<ApiResponseOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Transfers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns ApiResponseOfTransferResponseDto OK
     * @throws ApiError
     */
    public static putApiTransfers(
        id: string,
        requestBody: UpdateTransferDto,
    ): CancelablePromise<ApiResponseOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Transfers/{id}',
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
    public static deleteApiTransfers(
        id: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Transfers/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param playerId
     * @returns ApiResponseOfIEnumerableOfTransferResponseDto OK
     * @throws ApiError
     */
    public static getApiTransfersPlayer(
        playerId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Transfers/player/{playerId}',
            path: {
                'playerId': playerId,
            },
        });
    }
    /**
     * @param teamId
     * @returns ApiResponseOfIEnumerableOfTransferResponseDto OK
     * @throws ApiError
     */
    public static getApiTransfersTeam(
        teamId: string,
    ): CancelablePromise<ApiResponseOfIEnumerableOfTransferResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Transfers/team/{teamId}',
            path: {
                'teamId': teamId,
            },
        });
    }
}

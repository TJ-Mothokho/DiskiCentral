/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponseOfAuthResponseDto } from '../models/ApiResponseOfAuthResponseDto';
import type { ApiResponseOfboolean } from '../models/ApiResponseOfboolean';
import type { ExternalAuthDto } from '../models/ExternalAuthDto';
import type { LoginDto } from '../models/LoginDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * @param requestBody
     * @returns ApiResponseOfAuthResponseDto OK
     * @throws ApiError
     */
    public static postApiAuthRegister(
        requestBody: RegisterDto,
    ): CancelablePromise<ApiResponseOfAuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfAuthResponseDto OK
     * @throws ApiError
     */
    public static postApiAuthLogin(
        requestBody: LoginDto,
    ): CancelablePromise<ApiResponseOfAuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfAuthResponseDto OK
     * @throws ApiError
     */
    public static postApiAuthRefresh(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<ApiResponseOfAuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns ApiResponseOfAuthResponseDto OK
     * @throws ApiError
     */
    public static postApiAuthExternal(
        requestBody: ExternalAuthDto,
    ): CancelablePromise<ApiResponseOfAuthResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/external',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns ApiResponseOfboolean OK
     * @throws ApiError
     */
    public static postApiAuthLogout(
        userId: string,
    ): CancelablePromise<ApiResponseOfboolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Auth/logout/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}

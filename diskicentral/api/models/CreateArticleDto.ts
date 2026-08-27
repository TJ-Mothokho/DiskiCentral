/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentStatus } from './ContentStatus';
export type CreateArticleDto = {
    title?: string;
    slug?: string;
    subtitle?: string | null;
    excerpt?: string | null;
    body?: string;
    categoryId?: string;
    authorId?: string;
    teamId?: string | null;
    tagIds?: any[] | null;
    heroImage?: string | null;
    thumbnail?: string | null;
    featured?: boolean;
    trending?: boolean;
    status?: ContentStatus;
    publishedAt?: string | null;
};


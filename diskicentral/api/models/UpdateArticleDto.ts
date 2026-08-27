/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentStatus } from './ContentStatus';
export type UpdateArticleDto = {
    title?: string | null;
    slug?: string | null;
    subtitle?: string | null;
    excerpt?: string | null;
    body?: string | null;
    categoryId?: string | null;
    authorId?: string | null;
    teamId?: string | null;
    tagIds?: any[] | null;
    heroImage?: string | null;
    thumbnail?: string | null;
    featured?: boolean | null;
    trending?: boolean | null;
    status?: (null | ContentStatus);
    publishedAt?: string | null;
};


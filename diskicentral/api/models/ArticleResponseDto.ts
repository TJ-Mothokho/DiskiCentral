/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentStatus } from './ContentStatus';
export type ArticleResponseDto = {
    id?: string;
    title?: string;
    slug?: string;
    subtitle?: string | null;
    excerpt?: string | null;
    body?: string;
    heroImage?: string | null;
    thumbnail?: string | null;
    readingTime?: number | string;
    featured?: boolean;
    trending?: boolean;
    status?: ContentStatus;
    views?: number | string;
    publishedAt?: string | null;
    createdAt?: string;
    updatedAt?: string;
    authorId?: string;
    categoryId?: string;
    teamId?: string | null;
    authorName?: string | null;
    categoryName?: string | null;
    teamName?: string | null;
    tagIds?: Array<string>;
    relatedArticleIds?: Array<string>;
};


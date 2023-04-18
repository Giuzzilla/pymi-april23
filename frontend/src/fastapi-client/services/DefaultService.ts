/* istanbul ignore file */
/* eslint-disable */
import type { CreateTodoSchema } from '../models/CreateTodoSchema';
import type { EditTodoSchema } from '../models/EditTodoSchema';
import type { TodoSchema } from '../models/TodoSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get Todos
     * @returns TodoSchema Successful Response
     * @throws ApiError
     */
    public static getTodos(): CancelablePromise<Array<TodoSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/todos/',
        });
    }

    /**
     * Create Todo
     * @param requestBody
     * @returns TodoSchema Successful Response
     * @throws ApiError
     */
    public static createTodo(
        requestBody: CreateTodoSchema,
    ): CancelablePromise<TodoSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/todos/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Edit Todo
     * @param itemId
     * @param requestBody
     * @returns TodoSchema Successful Response
     * @throws ApiError
     */
    public static editTodo(
        itemId: number,
        requestBody: EditTodoSchema,
    ): CancelablePromise<TodoSchema> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/todos/{item_id}/',
            path: {
                'item_id': itemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}

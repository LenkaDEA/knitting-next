// Перечисление методов HTTP-запроса
export const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
} as const;

export type HTTPMethodType = (typeof HTTPMethod)[keyof typeof HTTPMethod];

// Параметры запроса
export type RequestParams<ReqT> = {
  method: HTTPMethodType; // Метод запроса, GET или POST
  endpoint: string; // API-endpoint, на который делается запрос
  headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками
  /**
   * Объект с данными запроса.
   * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
   * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
   */
  data: ReqT;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

// Перечисление статусов ответа
export const StatusHTTP = {
  status200: 200,
  status201: 201,
  status300: 300,
  status304: 304,
  status400: 400,
  status401: 401,
  status403: 403,
  status404: 404,
  status422: 422,
  UNEXPECTED_ERROR: 'UNEXPECTED ERROR',
} as const;

export type StatusHTTPType = (typeof StatusHTTP)[keyof typeof StatusHTTP];

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
  | {
      success: true;
      data: SuccessT;
      status: StatusHTTPType;
    }
  | {
      success: false;
      data: ErrorT;
      status: StatusHTTPType;
    }
  | {
      success: false;
      data: null;
      status: StatusHTTPType;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export type IApiStore = {
  // базовый url для выполнения запросов. TODO: указать url GitHub API в классе ApiStore
  readonly baseUrl: string;

  // Метод, с помощью которого делается запрос. TODO: реализовать в классе ApiStore
  request<SuccessT, ErrorT = unknown, ReqT = Record<string, unknown>>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>>;
};

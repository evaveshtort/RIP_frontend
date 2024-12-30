/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 200
   */
  password: string;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
}

export interface Calculation {
  /** Calc id */
  calc_id?: number;
  /**
   * Creation date
   * @format date-time
   */
  creation_date: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * End date
   * @format date-time
   */
  end_date?: string | null;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /** Data for calc */
  data_for_calc?: string | null;
}

export interface Metric {
  /** Metric id */
  metric_id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 50
   */
  title: string;
  /**
   * Description
   * @minLength 1
   */
  description?: string | null;
  /**
   * Picture url
   * @maxLength 100
   */
  picture_url?: string | null;
}

export interface CalculationDetail {
  calc: Calculation;
  /**
   * Amount of data
   * @min -2147483648
   * @max 2147483647
   */
  amount_of_data?: number;
  /** Result */
  result?: number | null;
  /** Calc metric id */
  calc_metric_id?: number;
  metric: Metric;
}

export interface CalculationUpdate {
  /** Data for calc */
  data_for_calc?: string | null;
}

export interface CalcMetricUpdate {
  /**
   * Amount of data
   * @min -2147483648
   * @max 2147483647
   */
  amount_of_data?: number;
}

export interface CalcMetric {
  /**
   * Amount of data
   * @min -2147483648
   * @max 2147483647
   */
  amount_of_data?: number;
  /** Result */
  result?: number | null;
  /** Calc metric id */
  calc_metric_id?: number;
  metric: Metric;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterList
     * @request GET:/api/users/register/
     * @secure
     */
    apiUsersRegisterList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/users/register/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterCreate
     * @request POST:/api/users/register/
     * @secure
     */
    apiUsersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterRead
     * @request GET:/api/users/register/{id}/
     * @secure
     */
    apiUsersRegisterRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/register/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterUpdate
     * @request PUT:/api/users/register/{id}/
     * @secure
     */
    apiUsersRegisterUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/register/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterPartialUpdate
     * @request PATCH:/api/users/register/{id}/
     * @secure
     */
    apiUsersRegisterPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/users/register/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUsersRegisterDelete
     * @request DELETE:/api/users/register/{id}/
     * @secure
     */
    apiUsersRegisterDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/users/register/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  calculations = {
    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsList
     * @request GET:/calculations/
     * @secure
     */
    calculationsList: (
      query?: {
        status?: string;
        /** @format date */
        dateStart?: string;
        /** @format date */
        dateEnd?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Calculation, void>({
        path: `/calculations/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsRead
     * @request GET:/calculations/{calculation_id}/
     * @secure
     */
    calculationsRead: (calculationId: string, params: RequestParams = {}) =>
      this.request<CalculationDetail, void>({
        path: `/calculations/${calculationId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsDeleteDelete
     * @request DELETE:/calculations/{calculation_id}/delete/
     * @secure
     */
    calculationsDeleteDelete: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsDeleteMetricDelete
     * @request DELETE:/calculations/{calculation_id}/delete_metric/{metric_id}/
     * @secure
     */
    calculationsDeleteMetricDelete: (calculationId: string, metricId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/delete_metric/${metricId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateUpdate
     * @request PUT:/calculations/{calculation_id}/update/
     * @secure
     */
    calculationsUpdateUpdate: (calculationId: string, data: CalculationUpdate, params: RequestParams = {}) =>
      this.request<CalculationUpdate, any>({
        path: `/calculations/${calculationId}/update/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateMetricUpdate
     * @request PUT:/calculations/{calculation_id}/update_metric/{metric_id}/
     * @secure
     */
    calculationsUpdateMetricUpdate: (
      calculationId: string,
      metricId: string,
      data: CalcMetricUpdate,
      params: RequestParams = {},
    ) =>
      this.request<CalcMetricUpdate, any>({
        path: `/calculations/${calculationId}/update_metric/${metricId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateStatusAdminUpdate
     * @request PUT:/calculations/{calculation_id}/update_status_admin/
     * @secure
     */
    calculationsUpdateStatusAdminUpdate: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/update_status_admin/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags calculations
     * @name CalculationsUpdateStatusUserUpdate
     * @request PUT:/calculations/{calculation_id}/update_status_user/
     * @secure
     */
    calculationsUpdateStatusUserUpdate: (calculationId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/calculations/${calculationId}/update_status_user/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  metrics = {
    /**
     * No description
     *
     * @tags metrics
     * @name MetricsList
     * @request GET:/metrics/
     * @secure
     */
    metricsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/metrics/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags metrics
     * @name MetricsCreateCreate
     * @request POST:/metrics/create/
     * @secure
     */
    metricsCreateCreate: (data: Metric, params: RequestParams = {}) =>
      this.request<Metric, any>({
        path: `/metrics/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags metrics
     * @name MetricsRead
     * @request GET:/metrics/{metric_id}/
     * @secure
     */
    metricsRead: (metricId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/metrics/${metricId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags metrics
     * @name MetricsAddPictureCreate
     * @request POST:/metrics/{metric_id}/add_picture/
     * @secure
     */
    metricsAddPictureCreate: (metricId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/metrics/${metricId}/add_picture/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавляет метрику к черновику расчета. Если черновика нет, создает новый.
     *
     * @tags metrics
     * @name MetricsAddToCalculationCreate
     * @request POST:/metrics/{metric_id}/add_to_calculation/
     * @secure
     */
    metricsAddToCalculationCreate: (metricId: string, params: RequestParams = {}) =>
      this.request<CalcMetric[], void>({
        path: `/metrics/${metricId}/add_to_calculation/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags metrics
     * @name MetricsDeleteDelete
     * @request DELETE:/metrics/{metric_id}/delete/
     * @secure
     */
    metricsDeleteDelete: (metricId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/metrics/${metricId}/delete/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags metrics
     * @name MetricsUpdateUpdate
     * @request PUT:/metrics/{metric_id}/update/
     * @secure
     */
    metricsUpdateUpdate: (metricId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/metrics/${metricId}/update/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersLoginCreate
     * @request POST:/users/login/
     * @secure
     */
    usersLoginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersLogoutCreate
     * @request POST:/users/logout/
     * @secure
     */
    usersLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterList
     * @request GET:/users/register/
     * @secure
     */
    usersRegisterList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users/register/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterCreate
     * @request POST:/users/register/
     * @secure
     */
    usersRegisterCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterRead
     * @request GET:/users/register/{id}/
     * @secure
     */
    usersRegisterRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterUpdate
     * @request PUT:/users/register/{id}/
     * @secure
     */
    usersRegisterUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterPartialUpdate
     * @request PATCH:/users/register/{id}/
     * @secure
     */
    usersRegisterPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/register/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersRegisterDelete
     * @request DELETE:/users/register/{id}/
     * @secure
     */
    usersRegisterDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/register/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdateUpdate
     * @request PUT:/users/update/
     * @secure
     */
    usersUpdateUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users/update/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}

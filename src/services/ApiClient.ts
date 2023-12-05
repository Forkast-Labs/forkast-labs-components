/*
 * Copyright (c) 2023 CryptoSlam, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { WEB_API_URL, API_KEY } from "../constants/variables";

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

type SupportedContentTypes = "application/json" | "text/csv";

export class ApiClient {
  static async get<T = any>(
    path: string,
    contentType: SupportedContentTypes = "application/json"
  ): Promise<HttpResponse<T>> {
    return await this.request<T>("GET", path, contentType);
  }

  private static async request<T>(
    method: string,
    path: string,
    contentType: SupportedContentTypes
  ): Promise<HttpResponse<T>> {
    const headers = new Headers();

    headers.set("Content-Type", contentType);

    headers.set("X-FKL-API-KEY", API_KEY);

    const response: HttpResponse<T> = await fetch(`${WEB_API_URL}${path}`, {
      method: method,
      headers,
    });

    if (response.status === 200 && contentType === "application/json") {
      response.parsedBody = await response.json();
    }

    return response;
  }
}

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

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

export class HttpClient {
  static async get<T = any>(url: string): Promise<HttpResponse<T>> {
    return await this.request<T>('GET', url);
  }

  private static async request<T>(
    method: string,
    url: string
  ): Promise<HttpResponse<T>> {
    const headers = new Headers();

    headers.set('Content-Type', 'application/json');

    const response: HttpResponse<T> = await fetch(url, {
      headers: headers,
      method: method,
    });

    if (response.status === 200) {
      response.parsedBody = await response.json();
    }

    return response;
  }
}

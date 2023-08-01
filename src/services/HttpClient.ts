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
import { BLOBR_KEY } from "../constants/variables";

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

type SupportedContentTypes = "application/json" | "text/csv";

export class HttpClient {
  static async get<T = any>(
    url: string,
    contentType: SupportedContentTypes = "application/json",
    skipBlobr: boolean = false
  ): Promise<HttpResponse<T>> {
    return await this.request<T>("GET", url, contentType, skipBlobr);
  }

  private static async request<T>(
    method: string,
    url: string,
    contentType: SupportedContentTypes,
    skipBlobr = false
  ): Promise<HttpResponse<T>> {
    const headers = new Headers();

    headers.set("Content-Type", contentType);

    if (!skipBlobr) {
      headers.set("X-BLOBR-KEY", BLOBR_KEY);
    }

    const response: HttpResponse<T> = await fetch(url, {
      method: method,
      headers,
    });

    if (response.status === 200 && contentType === "application/json") {
      response.parsedBody = await response.json();
    }

    return response;
  }
}

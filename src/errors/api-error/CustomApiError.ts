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

export interface CustomApiError {
  statusCode: number;
  message: string;
  details: string;
  code: string;
}

export class CustomApiError extends Error implements CustomApiError {
  constructor(
    statusCode: number,
    message: string,
    details = '',
    // https://nodejs.org/docs/latest-v15.x/api/errors.html#nodejs-error-codes
    code = ''
  ) {
    super();

    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
    this.name = 'Custom API error';
    this.code = code;
  }
}

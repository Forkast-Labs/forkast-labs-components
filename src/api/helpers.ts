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

import {
  CustomApiError,
  NOT_FOUND,
  DATA_MISSED_CODE,
} from '../errors/api-error';
import { HttpResponse } from '../services/ApiClient';

export const processResponse = <T, R>(
  response: HttpResponse<T>,
  formatter: (data: T | null) => R
) => {
  const { parsedBody, status } = response;

  if (status === 204) {
    return formatter(null);
  }

  if (!parsedBody) {
    throw new CustomApiError(NOT_FOUND, 'Missed data.', '', DATA_MISSED_CODE);
  }

  return formatter(parsedBody);
};

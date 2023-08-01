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

import { INDEX_DAY_ONLY_FORMAT } from "../../constants/date";
import dayjs from "../../utils/dayjs";

/**
 * 	We need to convert incoming point to UTC time and return correct key. To do this we need to remove user's offset from time
 * @param point unix time is user time zone.
 */
export const getPointKey = (point: string) => {
  if (point) {
    const utcDate = dayjs.utc(point);

    const key = utcDate.format(INDEX_DAY_ONLY_FORMAT);

    return key;
  }

  return "";
};

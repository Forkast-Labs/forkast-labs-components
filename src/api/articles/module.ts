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

import { WP_API_URL } from "../../constants/variables";
import { INDEX_DATE_TIME_FORMAT } from "../../constants/date";
import { TimeState } from "../../types/ui";
import { processResponse } from "../../api/helpers";
import { HttpClient } from "../../services/HttpClient";
import { getApiTime } from "../../helpers/ui";
import { Article } from "./types";
import { TAGS_MAP } from "./config";

export const fetchArticles = async (symbol: string, timeState: TimeState) => {
  const { startTime, endTime } = getApiTime(timeState);
  const startTimeString = startTime.format(INDEX_DATE_TIME_FORMAT);
  const endTimeString = endTime.format(INDEX_DATE_TIME_FORMAT);

  const tagsQuery = TAGS_MAP[symbol]?.length
    ? TAGS_MAP[symbol].reduce((result, tag) => `${result}&tags=${tag}`, "")
    : "";

  const url = `${WP_API_URL}/wp-json/wp/v2/posts?after=${startTimeString}&before=${endTimeString}${tagsQuery}&per_page=100&offset=0&_embed=wp:featuredmedia&_fields=_links.wp:featuredmedia,_embedded,id,date,excerpt,link,title`;

  const response = await HttpClient.get<Article[]>(
    url,
    "application/json",
    true
  );

  return processResponse(response, (data) => data ?? []);
};

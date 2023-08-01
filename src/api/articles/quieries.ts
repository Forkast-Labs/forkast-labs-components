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

import { useQuery } from "react-query";
import { TimeState } from "../../types/ui";
import { fetchArticles } from "./module";

export enum QueryKeys {
  ARTICLES = "articles",
}

export const useArticles = ({
  timeState,
  symbol,
  isEnabled = true,
}: {
  timeState: TimeState;
  symbol: string;
  isEnabled?: boolean;
}) =>
  useQuery(
    [QueryKeys.ARTICLES, symbol, timeState],
    () => fetchArticles(symbol, timeState),
    {
      staleTime: Infinity,
      enabled: isEnabled,
    }
  );

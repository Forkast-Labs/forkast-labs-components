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

import { useMemo } from "react";
import { useArticles } from "../../api/articles/quieries";
import { TimeState } from "../../types/ui";
import { Article } from "../../api/articles/types";
import { SeriesMarker, Time } from "lightweight-charts";
import { getDateTimeUTCTimestamp } from "../../helpers/lightweight-chart";
import { getPointKey } from "./helpers";

export const useArticlesWithMarkers = ({
  symbol,
  timeState,
  isNewsEnabled,
  hoveredDatePoint,
}: {
  symbol: string;
  timeState: TimeState;
  isNewsEnabled: boolean;
  hoveredDatePoint?: string;
}) => {
  const { data: articles, isLoading } = useArticles({
    symbol,
    timeState,
    isEnabled: isNewsEnabled,
  });

  const articlesByDay = useMemo(
    () =>
      (articles ?? []).reduce((result: Record<string, Article[]>, article) => {
        const key = getPointKey(article.date);

        if (!key) {
          return result;
        }

        if (result[key]) {
          return {
            ...result,
            [key]: [...result[key], article],
          };
        }

        return {
          ...result,
          [key]: [article],
        };
      }, {}),
    [articles]
  );

  const markers: SeriesMarker<Time>[] = useMemo(
    () =>
      Object.keys(articlesByDay).map((datepoint) => ({
        time: getDateTimeUTCTimestamp(datepoint),
        position: "aboveBar",
        color: hoveredDatePoint === datepoint ? "#24F1BB" : "#FFFFFF",
        shape: hoveredDatePoint === datepoint ? "arrowDown" : "circle",
        id: datepoint,
      })),
    [articlesByDay, hoveredDatePoint]
  );

  return { articlesByDay, markers: isNewsEnabled ? markers : [], isLoading };
};

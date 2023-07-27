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

import React, { useEffect, useRef } from "react";
import dayjs from "../../../../utils/dayjs";
import { useTheme } from "../../../../hooks/useTheme";
import { TimeState } from "../../../../types/ui";
import { useArticlesWithMarkers } from "../../../../hooks/useArticlesWithMarkers";

type Props = {
  symbol: string;
  timeState: TimeState;
  clickedDatePoint?: string;
};

const HEADER_OFFSET = 53;

export const News: React.FC<Props> = ({
  symbol,
  timeState,
  clickedDatePoint,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { articlesByDay: news, isLoading } = useArticlesWithMarkers({
    symbol,
    timeState,
    isNewsEnabled: true,
  });
  const { colors } = useTheme();
  const isEmpty = !isLoading && Object.keys(news).length === 0;

  useEffect(() => {
    if (clickedDatePoint) {
      const elementToScroll = ref?.current?.querySelector<HTMLDivElement>(
        `[data-point='${clickedDatePoint}']`
      );

      if (elementToScroll) {
        ref?.current?.scrollTo({
          top: elementToScroll.offsetTop - HEADER_OFFSET,
          behavior: "smooth",
        });
      }
    }
  }, [ref, clickedDatePoint]);

  return (
    <div
      ref={ref}
      className="fkl-px-5 fkl-flex fkl-flex-col fkl-gap-2 fkl-overflow-scroll fkl-h-full fkl-relative"
      style={{ color: colors.text }}
    >
      <div
        className="fkl-sticky fkl-top-0 fkl-z-10"
        style={{ backgroundColor: colors.background }}
      >
        <div className="fkl-text-[24px] fkl-mb-2">Market News & Insights</div>
        <hr />
      </div>

      {isEmpty ? (
        <div className="fkl-flex fkl-items-center fkl-justify-center fkl-flex-1">
          <div>No news for selected time state</div>
        </div>
      ) : (
        Object.entries(news).map(([datepoint, artiles]) => (
          <div key={datepoint} data-point={datepoint}>
            <div>{dayjs(datepoint).format("MMM DD, YYYY")}</div>

            <div className="fkl-flex fkl-flex-col fkl-gap-6 fkl-py-5">
              {artiles?.map((article) => {
                const articleImage = article._embedded["wp:featuredmedia"]?.[0];

                return (
                  <a
                    key={article.id}
                    href={article.link}
                    className="fkl-flex fkl-flex-row fkl-gap-4 hover:fkl-text-[#6842FF]"
                  >
                    <div className="fkl-w-[100px] fkl-h-[60px] fkl-relative fkl-shrink-0 fkl-overflow-hidden">
                      <img
                        src={
                          articleImage?.media_details?.sizes?.medium
                            ?.source_url ?? articleImage?.source_url
                        }
                        alt="article picture"
                        className="fkl-absolute fkl-left-0 fkl-top-0 fkl-right-0 fkl-bottom-0"
                      />
                    </div>
                    <div className="fkl-flex  fkl-flex-col fkl-justify-between">
                      <div className="fkl-text-xs">
                        {article.title.rendered}
                      </div>
                      <div className="fkl-text-[10px]">
                        {dayjs(article.date).format(
                          "MMM DD[,] YYYY [|] hh:mma"
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

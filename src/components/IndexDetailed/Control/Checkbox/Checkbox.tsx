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

import React from "react";
import classNames from "classnames";
import { useTheme } from "../../../../hooks/useTheme";

type Props = {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<Props> = ({ title, checked, onChange }) => {
  const { colors } = useTheme();

  return (
    <label className="fkl-flex fkl-relative fkl-items-center fkl-space-x-4 fkl-cursor-pointer fkl-shrink-0">
      <span
        style={{ color: colors.text }}
        className={classNames(
          "fkl-text-[12px] fkl-leading-[16px] fkl-font-semibold",
          "lg:fkl-text-[20px] lg:fkl-leading-[32px]"
        )}
      >
        {title}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={classNames("fkl-cursor-pointer checkbox checkbox-primary")}
      />
    </label>
  );
};

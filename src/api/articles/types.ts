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

export type Article = {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  _embedded: Embedded;
};

export type Embedded = {
  "wp:featuredmedia"?: EmbeddedFeatureMedia[];
};

export type EmbeddedFeatureMedia = {
  id: number;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    filesize: number;
    sizes: {
      medium: MediaImageSizes;
      large: MediaImageSizes;
      thumbnail: MediaImageSizes;
      medium_large: MediaImageSizes;
      full: MediaImageSizes;
    };
  };
};

export type MediaImageSizes = {
  file: string;
  width: number;
  height: number;
  filesize: number;
  mime_type: string;
  source_url: string;
};

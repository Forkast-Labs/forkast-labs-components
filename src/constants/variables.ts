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

export const WEB_API_URL = process.env.WEB_API_URL ?? "";

export const BLOBR_KEY = process.env.BLOBR_KEY ?? "";

if (!WEB_API_URL) {
  console.error(
    "WEB_API_URL env missed. Please provide WEB_API_URL environment variable."
  );
}

export const WP_API_URL = process.env.WP_API_URL ?? "";

export const WP_INDEX_TAGS = JSON.parse(process.env.WP_INDEX_TAGS ?? "{}");

if (!WP_API_URL) {
  console.error(
    "WP_API_URL env missed. Please provide WP_API_URL environment variable."
  );
}

if (!Object.keys(WP_INDEX_TAGS)) {
  console.warn("WP_INDEX_TAGS not defined. Used empty object.");
}

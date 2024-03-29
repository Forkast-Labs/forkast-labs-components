# Forkast Labs components

![Forkastlabs](https://github.com/Forkast-Labs/forkast-labs-components/blob/main/.github/preview.png)

## Install

```bash
npm install forkast-labs-components
```

## Example

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Index, ThemeProvider } from "forkast-labs-package";

const App = () => {
  return (
    <ThemeProvider
      colors={{
        background: "#171717",
        text: "#FFFFFF",
      }}
    >
      <Index symbol={indexName} />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## Components

- `ThemeProvider`

| Props             | Type     | Description                         |
| ----------------- | -------- | ----------------------------------- |
| colors.headline   | _string_ | brand color                         |
| colors.background | _string_ | basic background color for elements |
| colors.text       | _string_ | text color                          |

- `Index`

| Props  | Type                        | Description |
| ------ | --------------------------- | ----------- |
| symbol | _`fk500`, `fketh`, `fksol`_ | symbol name |

- `IndexDetailed`

| Props  | Type                        | Description |
| ------ | --------------------------- | ----------- |
| symbol | _`fk500`, `fketh`, `fksol`_ | symbol name |

## Sign Up for a Free Forkast Labs API Account

To use the React component, you need to sign up for the free Forkast Labs API service. This service delivers high-performance access to the Forkast Labs indexes with up to 250,000 API calls per month.

It couldn't be simpler: Go to [our developer web site](https://developer.forkastlabs.xyz/) and create your Free developer account. Pass your URL prefix and API keys from your account to the component in your environment, and you're off and running.

## Environment Variables

The following environment variables need to be set in order to use this package:

- _WEB_API_URL_: the URL for the Forkast Labs API service.
- _API_KEY_: the API key for the Forkast Labs API service.
- _WP_API_URL_: the WordPress API url.
- _WP_INDEX_TAGS_: Tags map between index and WordPress tag ids.

## Create a Bug Report

If you see an error message or run into an issue, please [create bug report](https://github.com/Forkast-Labs/forkast-labs-components/issues/new?assignees=&labels=bug&title=%F0%9F%90%9B+Bug+Report%3A+).

## Submit a Feature Request

If you have an idea, or you're missing a capability that would make development easier and more robust, please [Submit feature request](https://github.com/Forkast-Labs/forkast-labs-components/issues/new?assignees=&labels=feature%20request&title=Feature%20request:+).

If a similar feature request already exists, don't forget to leave a "+1".
If you add some more information such as your thoughts and vision about the feature, your comments will be embraced warmly :)

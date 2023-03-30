# Forkast Labs components

## Install

```bash
npm install forkast-labs-components
```

## Example

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Index, ThemeProvider } from 'forkast-labs-package';

const App = () => {
  return (
    <ThemeProvider
      colors={{
        headline: '#24F1BB',
        background: '#171717',
        text: '#FFFFFF',
      }}
    >
      <Index symbol={indexName} />
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Components

- `ThemeProvider`

| Props             | Type     | Description                         |
| ----------------- | -------- | ----------------------------------- |
| colors.background | _string_ | basic background color for elements |
| colors.text       | _string_ | text color                          |

- `Index`

| Props  | Type     | Description                   |
| ------ | -------- | ----------------------------- |
| symbol | _string_ | `fk500` or `fketh` or `fksol` |

- `IndexDetailed`

| Props  | Type     | Description                   |
| ------ | -------- | ----------------------------- |
| symbol | _string_ | `fk500` or `fketh` or `fksol` |

## Create a Bug Report

If you see an error message or run into an issue, please [create bug report](https://github.com/Forkast-Labs/forkast-labs-components/issues/new?assignees=&labels=bug&title=%F0%9F%90%9B+Bug+Report%3A+).

## Submit a Feature Request

If you have an idea, or you're missing a capability that would make development easier and more robust, please [Submit feature request](https://github.com/Forkast-Labs/forkast-labs-components/issues/new?assignees=&labels=feature%20request&title=Feature%20request:+).

If a similar feature request already exists, don't forget to leave a "+1".
If you add some more information such as your thoughts and vision about the feature, your comments will be embraced warmly :)

# react-lazy-load-marker

> React component for IntersectionObserver callback

[![NPM](https://img.shields.io/npm/v/react-lazy-load-marker.svg)](https://www.npmjs.com/package/react-lazy-load-marker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Features

- Auto add event listener for Intersection (when an element is scrolled into viewport)
- Auto cleanup the event listner when unmounted, to prevent memory leaks
- Support custom style, e.g. transform, translate, position, display, .e.t.c

Demo: [https://react-lazy-load-marker-demo.surge.sh](https://react-lazy-load-marker-demo.surge.sh)

## Install

```bash
## using npm
npm install react-lazy-load-marker

## or using yarn
yarn add react-lazy-load-marker

## or using pnpm
pnpm install react-lazy-load-marker
```

## Typescript Signature

```typescript
interface Props {
  children?: any
  onEnter: () => void
  style?: CSSProperties
  rootMargin?: string
  threshold?: number
}

export default class LazyLoadMarker extends React.Component<Props> {}
```

## Usage

```tsx
import React, { useState } from 'react'
import LazyLoadMarker from 'react-lazy-load-marker'

const LoadOnLastOneExample = () => {
  const total = 100
  const batch = 10
  const [items, setItems] = useState<number[]>([])
  const hasMore = items.length < total
  function loadMore() {
    setTimeout(() => {
      let newItems = [...items]
      for (let i = 0; i < batch; i++) {
        newItems.push(Math.random())
      }
      setItems(newItems)
    }, 1000)
  }
  return (
    <div>
      {items.map((item, i) => (
        <div key={item} style={{ height: '150px', border: '1px solid black' }}>
          {i + 1}/{total}: {item}
        </div>
      ))}
      {hasMore ? (
        <LazyLoadMarker onEnter={loadMore}>
          <p>Loading more ...</p>
        </LazyLoadMarker>
      ) : null}
    </div>
  )
}
```

Moreover, you can pre-load the items when the user scroll to last-N item, e.g.

```tsx
let listItems = items.map(item => (
  <div className="item" key={item.id}>
    <div>id: {item.id}</div>
    <img src={item.image} />
  </div>
))

if (hasMore) {
  const preload = 5
  listItems.splice(
    -preload,
    0,
    <LazyLoadMarker key={'loadMore'} onEnter={loadMore} />,
  )
}

return (
  <>
    {listItems}
    {hasMore ? <p>Loading more ...</p> : null}
  </>
)
```

Details see [DemoApp.tsx](./src/DemoApp.tsx)

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others

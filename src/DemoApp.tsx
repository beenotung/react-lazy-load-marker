import React, { useState } from 'react';
import './DemoApp.css';
import LazyLoadMarker from './LazyLoadMarker';

function toItem(id: number): Item {
  return { id: id, image: `https://picsum.photos/seed/${id}/200/200` };
}

type Item = {
  id: number;
  image: string;
};

function LoadOnLastFiveExample() {
  const total = 100;
  const batch = 10;
  const preload = 5;
  const [items, setItems] = useState<Item[]>([]);

  const hasMore = items.length < total;

  function loadMore() {
    console.log('load more');
    const offset = items.length;
    setTimeout(() => {
      if (items.length !== offset) return;
      setItems((items) =>
        Object.values(
          Object.fromEntries(
            [
              ...items,
              ...Array.from({ length: batch }, (_, i) =>
                toItem(offset + i + 1),
              ),
            ].map((item) => [item.id, item]),
          ),
        ),
      );
    }, 1000);
  }

  let listItems = items.map((item) => (
    <div className="item" key={item.id}>
      <div>id: {item.id}</div>
      <img src={item.image} />
    </div>
  ));

  if (hasMore) {
    listItems.splice(
      -preload,
      0,
      <LazyLoadMarker key={'loadMore'} onEnter={loadMore} />,
    );
  }

  return (
    <>
      <div className="items">
        {listItems}
        {hasMore ? <p>Loading more ...</p> : null}
      </div>

      <LazyLoadMarker
        onEnter={() => {
          console.log('scrolled to bottom');
        }}
      >
        <p>The bottom</p>
      </LazyLoadMarker>
    </>
  );
}

const LoadOnLastOneExample = () => {
  const total = 100;
  const batch = 10;
  const [items, setItems] = useState<number[]>([]);
  const hasMore = items.length < total;
  function loadMore() {
    setTimeout(() => {
      let newItems = [...items];
      for (let i = 0; i < batch; i++) {
        newItems.push(Math.random());
      }
      setItems(newItems);
    }, 1000);
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
  );
};

function Demo() {
  const [[Component], setComponents] = useState([LoadOnLastFiveExample]);
  return (
    <>
      <h1>
        <code>react-lazy-load-marker</code> Demo
      </h1>
      <p>
        <a href="https://www.npmjs.com/package/react-lazy-load-marker">
          <img
            src="https://img.shields.io/npm/v/react-lazy-load-marker.svg"
            alt="npm package version badge"
          ></img>
        </a>{' '}
        <a href="https://github.com/beenotung/react-lazy-load-marker">
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 16 16"
            version="1.1"
            width="32"
            data-view-component="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </p>

      <button onClick={() => setComponents([LoadOnLastOneExample])}>
        Load on Last one Example
      </button>
      <button onClick={() => setComponents([LoadOnLastFiveExample])}>
        Load on Last-5 Example
      </button>
      <Component />
    </>
  );
}

export default Demo;

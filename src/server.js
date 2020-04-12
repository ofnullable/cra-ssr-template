import React from 'react';
import { renderToString } from 'react-dom/server';

const html = renderToString(
  <div>Hi server!</div>,
);

console.log(html);


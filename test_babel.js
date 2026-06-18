const babel = require('@babel/core');

const code = `
import React, { FC } from 'react';
interface Props {
  name: string;
}
export const Hello: FC<Props> = ({ name }) => {
  return <div>Hello {name} as {name as string}!</div>;
};
`;

const output = babel.transformSync(code, {
  filename: 'test.tsx',
  presets: [
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }]
  ],
  retainLines: true,
});

console.log(output.code);

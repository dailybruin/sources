// src/views/{login.{html,css},*.svg}
// src/routes/schema.graphql

import { copy, watch } from 'cpx';
import * as path from 'path';

const toCopy = [
  {
    src: 'src/routes/schema.graphql',
    dest: 'dist/routes',
  },
  {
    src: 'src/views/favicon.ico',
    dest: 'dist/views',
  },
  {
    src: 'src/views/*.svg',
    dest: 'dist/views/static',
  },
  {
    src: 'src/views/*.css',
    dest: 'dist/views/static',
  },
  {
    src: 'src/views/login.html',
    dest: 'dist/views/static',
  },
];

for (const file of toCopy) {
  if (process.argv[2] === 'watch') {
    watch(file.src, file.dest);
  } else {
    copy(file.src, file.dest);
  }
}

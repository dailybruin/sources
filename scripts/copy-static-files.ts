// src/views/{login.{html,css},*.svg}
// src/routes/schema.graphql

import { watch } from 'cpx';
import * as path from 'path';

watch('src/routes/schema.graphql', 'dist/routes');
watch('src/views/favicon.ico', 'dist/views');
watch('src/views/*.svg', 'dist/views/static');
watch('src/views/*.css', 'dist/views/static');
watch('src/views/login.html', 'dist/views/static');

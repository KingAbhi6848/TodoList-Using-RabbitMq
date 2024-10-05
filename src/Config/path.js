import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const paths = {
    views: join(__dirname, '../views'),
    // add other paths as needed
};

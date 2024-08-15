import { fileURLToPath } from 'url';
import path from 'path';

// get the resolved path to the file

const __filename = fileURLToPath(import.meta.url);

// get the name of the directory

const __dirname = path.dirname(__filename);

// return data with the given limit

const handleLimit = (req, res, data) => {

    const limit = parseInt(req.query.limit);

    // checks if limit is higher than the array of data
    if (!isNaN(limit) && limit > 0) return data.slice(0, limit);

    return data;
}

export {
    __filename,
    __dirname,
    handleLimit
}
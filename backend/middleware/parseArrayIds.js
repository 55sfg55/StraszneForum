// middleware/parseArrayIds.js

export function parseArrayIds(req, res, next) {
    // Log the incoming request URL and parameters for debugging
    console.log(`Incoming request URL: ${req.originalUrl}`);
    console.log(`Request parameters:`, req.params);

    // Check if the 'manyids' parameter exists in the URL
    if (req.params.manyids) {
        // Split the parameter by comma, trim whitespace, and convert to an array
        req.ids = req.params.manyids.split(',').map(id => id.trim());

        // Log the parsed IDs for debugging
        console.log(`Parsed IDs:`, req.ids);
    } else {
        req.ids = []; // Set to an empty array if no parameter found
        console.log(`No 'manyids' parameter found. Defaulting to empty array.`);
    }

    // Call the next middleware or route handler
    next();
}

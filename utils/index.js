// return data with the given limit
const handleLimit = (req, res, data) => {

    const limit = parseInt(req.query.limit);

    // checks if limit is higher than the array of data
    if (!isNaN(limit) && limit > 0) return data.slice(0, limit);

    return data;
}

const handleFindPostById = (posts, id) => {
    return posts.find(post => post.id === id);
}

export {
    handleLimit,
    handleFindPostById
}
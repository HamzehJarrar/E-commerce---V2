export const getPagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const getPaginationData = (data, page, limit) => {
  const { count, orders } = data;
  const totalPages = Math.ceil(count / limit);
  return {
    pagination: {
      data,
      totalItems: count,
      totalPages,
      currentPage: page,
      limit,
    },
    data: orders,
  };
};

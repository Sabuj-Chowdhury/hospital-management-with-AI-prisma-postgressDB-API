export type TOptions = {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  order?: string;
};

type TOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sort: string;
  order: string;
};

const calculatePagination = (options: TOptions): TOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (Number(page) - 1) * limit;

  const sort: string = options.sort || "createdAt";
  const order: string = options.order || "desc";

  return {
    page,
    limit,
    skip,
    sort,
    order,
  };
};

export const paginationHelper = {
  calculatePagination,
};

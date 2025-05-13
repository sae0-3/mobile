export const authEndpoints = {
  login: '/auth/login',
  register: '/auth/register',
};

export const productEnpoints = {
  index: '/catalog/products',
};

export const categoryEndpoints = {
  index: '/catalog/categories',
};

export const productForCategoryEndpoints = {
  index: (id: string) => `/catalog/categories/${id}/products`,
};
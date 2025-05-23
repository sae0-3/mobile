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

export const dealerEndpoints = {
  index: '/users/dealers',
};

export const deliveryEndpoints = {
  index: '/orders/delivery',
};

export const clientOrdersEndpoints = {
  index: '/orders/client',
};

export const clientOrderEndpoints = {
  index: (id: string) => `/orders/client/${id}`,
};

export const clientEndpoints = {
  index: '/users/clients',
};

export const locationEnpoints = {
  index: '/locations',
};
import { BaseRepository } from '../../../core/common/base.repository';
import { ProductCategories, ProductCategory } from '../types/product-category.type';

export class ProductCategoryRepository extends BaseRepository {
  async linkProductToCategory(product_category: ProductCategory): Promise<ProductCategory | null> {
    const sql = `
      INSERT INTO product_categories (product_id, category_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
      RETURNING *`;
    return await this.queryOne<ProductCategory>(sql, [
      product_category.product_id,
      product_category.category_id
    ]);
  }

  async linkProductToCategories(product_categories: ProductCategories): Promise<ProductCategory[]> {
    const valuesSql = product_categories.category_ids
      .map((_, index) => `($1, $${index + 2})`)
      .join(', ');

    const sql = `
      INSERT INTO product_categories (product_id, category_id)
      VALUES ${valuesSql}
      ON CONFLICT DO NOTHING
      RETURNING *
    `;

    const params = [product_categories.product_id, ...product_categories.category_ids];
    return await this.query<ProductCategory>(sql, params);
  }

  async unlinkProductFromCategory(product_category: ProductCategory): Promise<ProductCategory | null> {
    const sql = `
      DELETE FROM product_categories
      WHERE product_id = $1 AND category_id = $2
      RETURNING *`;
    return await this.queryOne<ProductCategory>(sql, [
      product_category.product_id,
      product_category.category_id
    ]);
  }
}

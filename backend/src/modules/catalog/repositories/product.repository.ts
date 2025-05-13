import { BaseRepository } from '../../../core/common/base.repository';
import { Category } from '../types/category.type';
import { Product, ProductInsert, ProductUpdate } from '../types/product.type';

export class ProductRepository extends BaseRepository {
  async findAll(isClient = false): Promise<Product[]> {
    const sql = `
      SELECT * FROM products
      WHERE ${isClient ? 'visible = true' : 'TRUE'}
      ORDER BY display_order DESC
    `;
    return await this.query<Product>(sql);
  }

  async findById(id: string, isClient = false): Promise<Product | null> {
    const sql = `
      SELECT * FROM products
      WHERE id = $1
        AND ${isClient ? 'visible = true' : 'TRUE'}
    `;
    return await this.queryOne<Product>(sql, [id]);
  }

  async findCategoriesByProductId(id: string, isClient = false, linked = true): Promise<Category[]> {
    const condition = linked ? `
      INNER JOIN product_categories pc ON c.id = pc.category_id
      WHERE pc.product_id = $1
      ` : `
      WHERE NOT EXISTS (
        SELECT 1
        FROM product_categories pc
        WHERE pc.category_id = c.id
          AND pc.product_id = $1
      )
      `;
    const sql = `
      SELECT c.*
      FROM categories c
      ${condition}
      AND ${isClient ? 'c.visible = true' : 'TRUE'}
      ORDER BY c.display_order DESC
    `;
    return await this.query<Category>(sql, [id]);
  }

  async create(product: ProductInsert): Promise<Product | null> {
    return await this.insert<Product>('products', product);
  }

  async update(id: string, updates: ProductUpdate): Promise<Product | null> {
    return await this.updateById<Product>('products', id, updates);
  }

  async delete(id: string): Promise<Product | null> {
    return await this.deleteById<Product>('products', id);
  }
}

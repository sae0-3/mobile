import { BaseRepository } from '../../../core/common/base.repository';
import { Category, CategoryInsert, CategoryUpdate } from '../types/category.type';
import { Product } from '../types/product.type';

export class CategoryRepository extends BaseRepository {
  async findAll(isClient = false): Promise<Category[]> {
    const sql = `
      SELECT * FROM categories
      WHERE ${isClient ? 'visible = true' : 'TRUE'}
      ORDER BY display_order`;
    return await this.query<Category>(sql);
  }

  async findById(id: string, isClient = false): Promise<Category | null> {
    const sql = `
      SELECT * FROM categories
      WHERE id = $1
        AND ${isClient ? 'visible = true' : 'TRUE'}
      `;
    return await this.queryOne<Category>(sql, [id]);
  }

  async findProductsByCategoryId(categoryId: string, isClient = false): Promise<Product[]> {
    const sql = `
      SELECT p.*
      FROM products p
      INNER JOIN product_categories pc ON p.id = pc.product_id
      WHERE pc.category_id = $1
        AND ${isClient ? 'p.visible = true' : 'TRUE'}
      ORDER BY p.display_order`;
    return await this.query<Product>(sql, [categoryId]);
  }

  async create(category: CategoryInsert): Promise<Category | null> {
    return await this.insert<Category>('categories', category);
  }

  async update(id: string, updates: CategoryUpdate): Promise<Category | null> {
    return await this.updateById<Category>('categories', id, updates);
  }

  async delete(id: string): Promise<Category | null> {
    return await this.deleteById<Category>('categories', id);
  }
}

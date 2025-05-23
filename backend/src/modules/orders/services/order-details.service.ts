import { validateDto } from '../../../core/common/validation';
import { AppError } from '../../../core/errors/app.error';
import { ProductService } from '../../catalog/services/product.service';
import { OrderDetailsInsertDto, OrderDetailsInsertSchema } from '../dtos/client-order.dto';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { OrderDetailsWithProduct } from '../types/client-order.types';
import { OrderDetails } from '../types/order.type';

export class OrderDetailsService {
  constructor(
    private orderDetailsRepository: OrderDetailsRepository,
    private productService: ProductService,
  ) { }

  async getDetailsWithProduct(order_id: string): Promise<OrderDetailsWithProduct[]> {
    const items = await this.orderDetailsRepository.findAll(order_id);

    const itemsWithProducts = await Promise.all(
      items.map(async (order_details) => {
        let product;

        try {
          product = await this.productService.findById(order_details.product_id, true);
        } catch (err) {
          product = null;
        }

        return {
          id: order_details.id,
          quantity: order_details.quantity,
          subtotal: order_details.subtotal,
          product,
        };
      })
    );

    return itemsWithProducts;
  }

  async createMany(order_id: string, items: OrderDetailsInsertDto[]): Promise<OrderDetails[]> {
    if (items.length === 0) return [];

    const itemsWithOrderId = await Promise.all(
      items.map(async (item) => {
        await validateDto(OrderDetailsInsertSchema, item);

        return {
          ...item,
          order_id,
        };
      })
    );

    const created = await this.orderDetailsRepository.createMany(itemsWithOrderId);
    if (!created) {
      throw new AppError({
        publicMessage: 'No se logro registrar los items del pedido'
      });
    }

    return created;
  }
}

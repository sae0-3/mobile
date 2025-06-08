import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { ProductService } from '../../catalog/services/product.service';
import { Product } from '../../catalog/types/product.type';
import { OrderDetailsInsertDto } from '../dtos/client-order.dto';
import { OrderDetailsRepository } from '../repositories/order-details.repository';
import { OrderDetailsService } from '../services/order-details.service';
import { OrderDetails } from '../types/order.type';

jest.mock('../../../core/common/validation', () => ({
  validateDto: jest.fn().mockResolvedValue(undefined),
}));

describe('OrderDetailsService', () => {
  let service: OrderDetailsService;
  let orderDetailsRepository: jest.Mocked<OrderDetailsRepository>;
  let productService: jest.Mocked<ProductService>;

  const mockOrderDetail: OrderDetails = {
    id: 'detail1',
    order_id: 'order1',
    product_id: 'prod1',
    quantity: 2,
    subtotal: 20,
  };

  const mockProduct: Product = {
    id: 'prod1',
    name: 'Producto 1',
    description: 'Descripción del producto',
    price: 10,
    ingredients: null,
    img_reference: null,
    visible: true,
    available: true,
    display_order: 1,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  };

  const validDto: OrderDetailsInsertDto = {
    product_id: 'prod1',
    quantity: 2,
    subtotal: 20,
  };

  beforeEach(() => {
    orderDetailsRepository = {
      findAll: jest.fn(),
      createMany: jest.fn(),
    } as any;

    productService = {
      findById: jest.fn(),
    } as any;

    service = new OrderDetailsService(
      orderDetailsRepository,
      productService
    );

    jest.resetAllMocks();
  });

  describe('getDetailsWithProduct()', () => {
    it('debería retornar los detalles con información del producto', async () => {
      orderDetailsRepository.findAll.mockResolvedValue([mockOrderDetail]);
      productService.findById.mockResolvedValue(mockProduct);

      const result = await service.getDetailsWithProduct('order1');

      expect(orderDetailsRepository.findAll).toHaveBeenCalledWith('order1');
      expect(productService.findById).toHaveBeenCalledWith('prod1', true);
      expect(result).toEqual([
        {
          id: 'detail1',
          quantity: 2,
          subtotal: 20,
          product: mockProduct,
        }
      ]);
    });

    it('debería retornar null para productos no encontrados', async () => {
      orderDetailsRepository.findAll.mockResolvedValue([mockOrderDetail]);
      productService.findById.mockRejectedValue(new NotFoundError());

      const result = await service.getDetailsWithProduct('order1');

      expect(result).toEqual([
        {
          id: 'detail1',
          quantity: 2,
          subtotal: 20,
          product: null,
        }
      ]);
    });

    it('debería retornar array vacío si no hay detalles', async () => {
      orderDetailsRepository.findAll.mockResolvedValue([]);

      const result = await service.getDetailsWithProduct('order1');

      expect(result).toEqual([]);
    });
  });

  describe('createMany()', () => {
    it('debería crear múltiples detalles de pedido', async () => {
      const items = [validDto, { ...validDto, product_id: 'prod2' }];
      const createdDetails = [
        mockOrderDetail,
        { ...mockOrderDetail, id: 'detail2', product_id: 'prod2' }
      ];

      orderDetailsRepository.createMany.mockResolvedValue(createdDetails);

      const result = await service.createMany('order1', items);

      expect(validateDto).toHaveBeenCalledTimes(2);
      expect(orderDetailsRepository.createMany).toHaveBeenCalledWith([
        { ...validDto, order_id: 'order1' },
        { ...validDto, product_id: 'prod2', order_id: 'order1' }
      ]);
      expect(result).toEqual(createdDetails);
    });

    it('debería retornar array vacío si no hay items', async () => {
      const result = await service.createMany('order1', []);

      expect(result).toEqual([]);
      expect(orderDetailsRepository.createMany).not.toHaveBeenCalled();
    });

    it('No debería lanzar error si no se crearon items pero el repositorio devuelve array vacío', async () => {
      orderDetailsRepository.createMany.mockResolvedValue([]);

      const result = await service.createMany('order1', [validDto]);
      expect(result).toEqual([]);
    });

    it('debería lanzar ValidationError si los datos son inválidos', async () => {
      const invalidItem = { ...validDto, quantity: 0 };

      (validateDto as jest.Mock).mockRejectedValue(
        new ValidationError({ internalMessage: 'quantity debe ser mayor que 0' })
      );

      await expect(service.createMany('order1', [invalidItem]))
        .rejects.toThrow(ValidationError);
    });
  });

  describe('getDetailsByOrderId()', () => {
    it('debería retornar los detalles de un pedido', async () => {
      orderDetailsRepository.findAll.mockResolvedValue([mockOrderDetail]);

      const result = await service.getDetailsByOrderId('order1');

      expect(orderDetailsRepository.findAll).toHaveBeenCalledWith('order1');
      expect(result).toEqual([mockOrderDetail]);
    });

    it('debería lanzar NotFoundError si no se proporciona order_id', async () => {
      await expect(service.getDetailsByOrderId(''))
        .rejects.toThrow(NotFoundError);
      expect(orderDetailsRepository.findAll).not.toHaveBeenCalled();
    });

    it('debería retornar array vacío si no hay detalles', async () => {
      orderDetailsRepository.findAll.mockResolvedValue([]);

      const result = await service.getDetailsByOrderId('order1');

      expect(result).toEqual([]);
    });
  });
});

import { NotFoundError } from '../../../core/errors/app.error';
import { OrderRepository } from '../repositories/order-dealer.repository';
import { OrderService } from '../services/order-dealer.service';
import { AvailableOrder, Order, OrderDetail } from '../types/order-dealer.types';
import * as validation from '../../../core/common/validation';
import { OrderDeliveryDto } from '../dtos/order-dealer.dto';

describe('OrderService', () => {
  let service: OrderService;
  let repository: jest.Mocked<OrderRepository>;

  const mockOrder: Order = {
    id: 'order1',
    client_id: 'cust1',
    status: 'pending',
    total: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_address_id: 'address1',
    delivery_id: 'delivery1',
  };

  const mockOrderDetail: OrderDetail = {
    order_id: 'order1',
    latitud: -17.3741,
    longitud: -66.2421,
    address: 'address1',
    client_name: 'Juan Pérez',
    client_phone: '78982312',
    product_name: 'salchipapa',
    subtotal: 20,
    quantity: 2,

  };

  const mockAvailableOrders: AvailableOrder[] = [
    {
      order_id: 'order1',
      client_name: 'Juan Pérez',
      client_phone: '78982312',
      client_address: 'Av. Siempre Viva 123',
      total: 20,
      created_at: new Date().toISOString()
    },
  ];

  const validDto: OrderDeliveryDto = {
    id: 'order1',
    delivery_id: 'delivery1'
  };

  beforeEach(() => {
    repository = {
      getAllAvailableOrders: jest.fn(),
      accepOrder: jest.fn(),
      getOrderDetails: jest.fn(),
      markOrderAsDelivered: jest.fn(),
    } as any;

    service = new OrderService(repository);
    jest.resetAllMocks();

    jest.spyOn(validation, 'validateDto').mockResolvedValue(undefined);
  });

  describe('getAllAvailableOrders()', () => {
    it('debería retornar las órdenes disponibles', async () => {
      repository.getAllAvailableOrders.mockResolvedValue(mockAvailableOrders);

      const result = await service.getAllAvailableOrders();

      expect(repository.getAllAvailableOrders).toHaveBeenCalled();
      expect(result).toEqual(mockAvailableOrders);
    });
  });

  describe('accepOrder()', () => {
    it('debería aceptar y retornar el pedido', async () => {
      repository.accepOrder.mockResolvedValue(mockOrder);

      const result = await service.accepOrder(validDto);

      expect(repository.accepOrder).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockOrder);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      repository.accepOrder.mockResolvedValue(null);

      await expect(service.accepOrder(validDto)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getOrderDetails()', () => {
    it('debería retornar los detalles del pedido', async () => {
      repository.getOrderDetails.mockResolvedValue(mockOrderDetail);

      const result = await service.getOrderDetails('order1');

      expect(repository.getOrderDetails).toHaveBeenCalledWith('order1');
      expect(result).toEqual(mockOrderDetail);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      repository.getOrderDetails.mockResolvedValue(null);

      await expect(service.getOrderDetails('orderX')).rejects.toThrow(NotFoundError);
    });
  });

  describe('markOrderAsDelivered()', () => {
    it('debería marcar como entregado y retornar el pedido', async () => {
      repository.markOrderAsDelivered.mockResolvedValue(mockOrder);

      const result = await service.markOrderAsDelivered(validDto);

      expect(repository.markOrderAsDelivered).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockOrder);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      repository.markOrderAsDelivered.mockResolvedValue(null);

      await expect(service.markOrderAsDelivered(validDto)).rejects.toThrow(NotFoundError);
    });
  });
});

import { AppError, NotFoundError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { Location } from '../../locations/types/location.type';
import { ClientService } from '../../users/services/client.service';
import { DealerService } from '../../users/services/dealer.service';
import { Client } from '../../users/types/client.type';
import { Dealer } from '../../users/types/dealer.type';
import { AdminOrderRepository } from '../repositories/admin-order.repository';
import { AdminOrderService } from '../services/admin-order.service';
import { OrderDetailsService } from '../services/order-details.service';
import { Order, OrderDetailsWithProduct } from '../types/order.type';

describe('AdminOrderService', () => {
  let service: AdminOrderService;
  let adminOrderRepository: jest.Mocked<AdminOrderRepository>;
  let orderDetailsService: jest.Mocked<OrderDetailsService>;
  let clientService: jest.Mocked<ClientService>;
  let dealerService: jest.Mocked<DealerService>;
  let locationService: jest.Mocked<LocationService>;

  const mockOrder: Order = {
    id: 'order1',
    client_id: 'client1',
    user_address_id: 'address1',
    total: 100,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    delivery_id: 'dealer1',
  };

  const mockLocation: Location = {
    id: 'address1',
    user_id: 'client1',
    address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
    created_at: new Date().toISOString(),
  };

  const mockClient: Client = {
    id: 'client1',
    name: 'Cliente Ejemplo',
    email: 'cliente@example.com',
    phone: '123456789',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mockDealer: Dealer = {
    id: 'dealer1',
    name: 'Repartidor Ejemplo',
    email: 'repartidor@example.com',
    vehicle: 'motorcycle',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mockOrderDetails: OrderDetailsWithProduct[] = [
    {
      id: 'detail1',
      quantity: 2,
      subtotal: 50,
      product: {
        id: 'prod1',
        name: 'Producto 1',
        price: 25,
        description: 'Descripción',
        ingredients: null,
        img_reference: null,
      },
    },
  ];

  beforeEach(() => {
    adminOrderRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      cancelById: jest.fn(),
    } as any;

    orderDetailsService = {
      getDetailsByOrderId: jest.fn(),
      getDetailsWithProduct: jest.fn(),
    } as any;

    clientService = {
      findById: jest.fn(),
    } as any;

    dealerService = {
      findById: jest.fn(),
    } as any;

    locationService = {
      findById: jest.fn(),
    } as any;

    service = new AdminOrderService(
      adminOrderRepository,
      orderDetailsService,
      clientService,
      dealerService,
      locationService
    );

    jest.resetAllMocks();
  });

  describe('findAll()', () => {
    it('debería retornar el historial de todos los pedidos', async () => {
      const mockOrders: Order[] = [
        mockOrder,
        { ...mockOrder, id: 'order2', status: 'delivered' },
      ];

      adminOrderRepository.findAll.mockResolvedValue(mockOrders);
      orderDetailsService.getDetailsByOrderId
        .mockResolvedValueOnce([
          {
            id: 'detail1',
            order_id: 'order_id',
            product_id: 'produduct_id',
            quantity: 1,
            subtotal: 100
          }
        ])
        .mockResolvedValueOnce([]);
      locationService.findById.mockResolvedValue(mockLocation);

      const result = await service.findAll();

      expect(adminOrderRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 'order1',
          status: 'pending',
          total: 100,
          items: 1,
          created_at: mockOrder.created_at,
          updated_at: mockOrder.updated_at,
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
        },
        {
          id: 'order2',
          status: 'delivered',
          total: 100,
          items: 0,
          created_at: mockOrder.created_at,
          updated_at: mockOrder.updated_at,
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
        },
      ]);
    });

    it('debería retornar array vacío si no hay pedidos', async () => {
      adminOrderRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findById()', () => {
    it('debería retornar los detalles completos de un pedido con repartidor', async () => {
      adminOrderRepository.findById.mockResolvedValue(mockOrder);
      orderDetailsService.getDetailsWithProduct.mockResolvedValue(mockOrderDetails);
      clientService.findById.mockResolvedValue(mockClient);
      locationService.findById.mockResolvedValue(mockLocation);
      dealerService.findById.mockResolvedValue(mockDealer);

      const result = await service.findById('order1');

      expect(result).toEqual({
        id: 'order1',
        status: 'pending',
        total: 100,
        created_at: mockOrder.created_at,
        updated_at: mockOrder.updated_at,
        client: {
          id: 'client1',
          name: 'Cliente Ejemplo',
          email: 'cliente@example.com',
          phone: '123456789',
        },
        dealer: {
          id: 'dealer1',
          name: 'Repartidor Ejemplo',
          email: 'repartidor@example.com',
          vehicle: 'motorcycle',
        },
        location: {
          address: 'Av. Siempre Viva 123',
          latitud: -17.7856,
          longitud: -63.1809,
        },
        items: mockOrderDetails,
      });
    });

    it('debería retornar los detalles completos de un pedido sin repartidor', async () => {
      const orderWithoutDealer = { ...mockOrder, delivery_id: null };
      adminOrderRepository.findById.mockResolvedValue(orderWithoutDealer);
      orderDetailsService.getDetailsWithProduct.mockResolvedValue(mockOrderDetails);
      clientService.findById.mockResolvedValue(mockClient);
      locationService.findById.mockResolvedValue(mockLocation);

      const result = await service.findById('order1');

      expect(result).toEqual({
        id: 'order1',
        status: 'pending',
        total: 100,
        created_at: mockOrder.created_at,
        updated_at: mockOrder.updated_at,
        client: {
          id: 'client1',
          name: 'Cliente Ejemplo',
          email: 'cliente@example.com',
          phone: '123456789',
        },
        dealer: null,
        location: {
          address: 'Av. Siempre Viva 123',
          latitud: -17.7856,
          longitud: -63.1809,
        },
        items: mockOrderDetails,
      });
      expect(dealerService.findById).not.toHaveBeenCalled();
    });

    it('debería lanzar NotFoundError si el pedido no existe', async () => {
      adminOrderRepository.findById.mockResolvedValue(null);

      await expect(service.findById('order1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('cancelById()', () => {
    it('debería cancelar un pedido existente', async () => {
      const cancelledOrder: Order = { ...mockOrder, status: 'cancelled' };
      adminOrderRepository.findById.mockResolvedValue(mockOrder);
      adminOrderRepository.cancelById.mockResolvedValue(cancelledOrder);

      const result = await service.cancelById('order1');

      expect(adminOrderRepository.cancelById).toHaveBeenCalledWith('order1');
      expect(result).toEqual(cancelledOrder);
    });

    it('debería lanzar NotFoundError si el pedido no existe', async () => {
      adminOrderRepository.findById.mockResolvedValue(null);

      await expect(service.cancelById('order1')).rejects.toThrow(NotFoundError);
      expect(adminOrderRepository.cancelById).not.toHaveBeenCalled();
    });

    it('debería lanzar AppError si no se puede cancelar el pedido', async () => {
      adminOrderRepository.findById.mockResolvedValue(mockOrder);
      adminOrderRepository.cancelById.mockResolvedValue(null);

      await expect(service.cancelById('order1')).rejects.toThrow(AppError);
    });
  });
});

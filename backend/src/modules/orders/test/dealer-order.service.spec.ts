import * as validation from '../../../core/common/validation';
import { NotFoundError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { Location } from '../../locations/types/location.type';
import { ClientService } from '../../users/services/client.service';
import { Client } from '../../users/types/client.type';
import { DealerOrderDeliveryDto } from '../dtos/dealer-order.dto';
import { DealerOrderRepository } from '../repositories/dealer-order.repository';
import { DealerOrderService } from '../services/dealer-order.service';
import { OrderDetailsService } from '../services/order-details.service';
import { AvailableOrder, Order, OrderDetail, OrderLocationInfo, OrderWithDetails } from '../types/dealer-order.types';

describe('DealerOrderService', () => {
  let service: DealerOrderService;
  let orderRepository: jest.Mocked<DealerOrderRepository>;
  let orderDetailsService: jest.Mocked<OrderDetailsService>;
  let clientService: jest.Mocked<ClientService>;
  let locationService: jest.Mocked<LocationService>;

  const mockOrder: Order = {
    id: 'order1',
    client_id: 'cust1',
    status: 'delivered',
    total: 25,
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    user_address_id: 'address1',
    delivery_id: 'delivery1',
  };

  const mockOrderDetail: OrderDetail = {
    order_id: 'order1',
    total: 40.2,
    client_name: 'Juan Pérez',
    client_phone: '78982312',
    products: [
      {
        name: 'salchipapa',
        subtotal: 20,
        quantity: 2,
      }
    ],
  };

  const mockLocationInfo: OrderLocationInfo = {
    order_id: 'order1',
    client_name: 'Juan Pérez',
    client_address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
    delaer_vehicle: 'motorcycle',
  };

  const mockAvailableOrders: AvailableOrder[] = [
    {
      order_id: 'order1',
      client_name: 'Juan Pérez',
      client_phone: '78982312',
      client_address: 'Av. Siempre Viva 123',
      total: 20,
      created_at: new Date().toString()
    },
  ];

  const mockClient: Client = {
    id: 'cust1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '78982312',
    created_at: new Date().toString(),
    updated_at: new Date().toString()
  };

  const mockLocation: Location = {
    id: 'address1',
    user_id: 'user1',
    address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
    created_at: new Date().toString()
  };

  const validDto: DealerOrderDeliveryDto = {
    id: 'order1',
    delivery_id: 'delivery1'
  };

  beforeEach(() => {
    orderRepository = {
      getAllAvailableOrders: jest.fn(),
      accepOrder: jest.fn(),
      getOrderDetails: jest.fn(),
      markOrderAsDelivered: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      getOrderLocationInfo: jest.fn(),
    } as any;

    orderDetailsService = {
      getDetailsWithProduct: jest.fn(),
      getDetailsByOrderId: jest.fn(),
    } as any;

    clientService = {
      findById: jest.fn(),
    } as any;

    locationService = {
      findById: jest.fn(),
    } as any;

    service = new DealerOrderService(
      orderRepository,
      orderDetailsService,
      clientService,
      locationService
    );

    jest.spyOn(validation, 'validateDto').mockResolvedValue(undefined);
  });

  describe('getAllAvailableOrders()', () => {
    it('debería retornar las órdenes disponibles', async () => {
      orderRepository.getAllAvailableOrders.mockResolvedValue(mockAvailableOrders);

      const result = await service.getAllAvailableOrders();

      expect(orderRepository.getAllAvailableOrders).toHaveBeenCalled();
      expect(result).toEqual(mockAvailableOrders);
    });
  });

  describe('accepOrder()', () => {
    it('debería aceptar y retornar el pedido', async () => {
      orderRepository.accepOrder.mockResolvedValue(mockOrder);

      const result = await service.accepOrder(validDto);

      expect(validation.validateDto).toHaveBeenCalled();
      expect(orderRepository.accepOrder).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockOrder);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      orderRepository.accepOrder.mockResolvedValue(null);

      await expect(service.accepOrder(validDto)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getOrderLocation()', () => {
    it('debería retornar la información de ubicación del pedido', async () => {
      orderRepository.getOrderLocationInfo.mockResolvedValue(mockLocationInfo);

      const result = await service.getOrderLocation(validDto);

      expect(validation.validateDto).toHaveBeenCalled();
      expect(orderRepository.getOrderLocationInfo).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockLocationInfo);
    });

    it('debería lanzar NotFoundError si no encuentra la información de ubicación', async () => {
      orderRepository.getOrderLocationInfo.mockResolvedValue(null);

      await expect(service.getOrderLocation(validDto)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getOrderDetails()', () => {
    it('debería retornar los detalles del pedido', async () => {
      orderRepository.getOrderDetails.mockResolvedValue(mockOrderDetail);

      const result = await service.getOrderDetails('order1');

      expect(orderRepository.getOrderDetails).toHaveBeenCalledWith('order1');
      expect(result).toEqual(mockOrderDetail);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      orderRepository.getOrderDetails.mockResolvedValue(null);

      await expect(service.getOrderDetails('orderX')).rejects.toThrow(NotFoundError);
    });
  });

  describe('markOrderAsDelivered()', () => {
    it('debería marcar como entregado y retornar el pedido', async () => {
      orderRepository.markOrderAsDelivered.mockResolvedValue(mockOrder);

      const result = await service.markOrderAsDelivered(validDto);

      expect(validation.validateDto).toHaveBeenCalled();
      expect(orderRepository.markOrderAsDelivered).toHaveBeenCalledWith(validDto);
      expect(result).toEqual(mockOrder);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      orderRepository.markOrderAsDelivered.mockResolvedValue(null);

      await expect(service.markOrderAsDelivered(validDto)).rejects.toThrow(NotFoundError);
    });
  });

  describe('getHistory()', () => {
    it('debería retornar el historial de pedidos del repartidor', async () => {
      const mockOrders: Order[] = [
        { ...mockOrder, id: 'order1', status: 'delivered' },
        { ...mockOrder, id: 'order2', status: 'delivered' }
      ];

      const mockOrderDetails = [
        { id: 'detail1', order_id: 'order1', product_id: 'prod1', quantity: 1, subtotal: 10 },
        { id: 'detail2', order_id: 'order1', product_id: 'prod2', quantity: 2, subtotal: 20 }
      ];

      orderRepository.findAll.mockResolvedValue(mockOrders);
      orderDetailsService.getDetailsByOrderId
        .mockResolvedValueOnce(mockOrderDetails)
        .mockResolvedValueOnce([]);
      locationService.findById.mockResolvedValue(mockLocation);

      const result = await service.getHistory('dealer1');

      expect(orderRepository.findAll).toHaveBeenCalledWith('dealer1');
      expect(result).toEqual([
        {
          id: 'order1',
          total: 25,
          status: 'delivered',
          created_at: expect.any(String),
          updated_at: expect.any(String),
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
          items: 2
        },
        {
          id: 'order2',
          total: 25,
          status: 'delivered',
          created_at: expect.any(String),
          updated_at: expect.any(String),
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
          items: 0
        }
      ]);
    });

    it('debería lanzar NotFoundError si no se proporciona dealer_id', async () => {
      await expect(service.getHistory('')).rejects.toThrow(NotFoundError);
    });
  });

  describe('getOrderFromHistoryById()', () => {
    it('debería retornar los detalles completos de un pedido', async () => {
      const mockOrderWithDetails: OrderWithDetails = {
        id: 'order1',
        total: 25,
        status: 'delivered',
        created_at: new Date().toString(),
        updated_at: new Date().toString(),
        client: {
          id: 'cust1',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '78982312'
        },
        location: {
          address: 'Av. Siempre Viva 123',
          latitud: -17.7856,
          longitud: -63.1809
        },
        items: [
          {
            id: 'detail1',
            quantity: 1,
            subtotal: 10,
            product: {
              id: 'prod1',
              name: 'Producto 1',
              description: 'Descripción',
              price: 10,
              ingredients: null,
              img_reference: null,
            }
          }
        ]
      };

      orderRepository.findById.mockResolvedValue(mockOrder);
      clientService.findById.mockResolvedValue(mockClient);
      locationService.findById.mockResolvedValue(mockLocation);
      orderDetailsService.getDetailsWithProduct.mockResolvedValue([
        {
          id: 'detail1',
          quantity: 1,
          subtotal: 10,
          product: {
            id: 'prod1',
            name: 'Producto 1',
            description: 'Descripción',
            price: 10,
            ingredients: null,
            img_reference: null
          }
        }
      ]);

      const result = await service.getOrderFromHistoryById('order1', 'dealer1');

      expect(result).toEqual(mockOrderWithDetails);
    });

    it('debería lanzar NotFoundError si no se proporciona dealer_id', async () => {
      await expect(service.getOrderFromHistoryById('order1', ''))
        .rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si no encuentra el pedido', async () => {
      orderRepository.findById.mockResolvedValue(null);

      await expect(service.getOrderFromHistoryById('order1', 'dealer1'))
        .rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si no encuentra el cliente', async () => {
      orderRepository.findById.mockResolvedValue(mockOrder);
      clientService.findById.mockRejectedValue(new NotFoundError());

      await expect(service.getOrderFromHistoryById('order1', 'dealer1'))
        .rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si no encuentra la ubicación', async () => {
      orderRepository.findById.mockResolvedValue(mockOrder);
      clientService.findById.mockResolvedValue(mockClient);
      locationService.findById.mockRejectedValue(new NotFoundError());

      await expect(service.getOrderFromHistoryById('order1', 'dealer1'))
        .rejects.toThrow(NotFoundError);
    });
  });
});

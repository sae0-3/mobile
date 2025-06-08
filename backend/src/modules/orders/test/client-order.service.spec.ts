import { validateDto } from '../../../core/common/validation';
import { AppError, NotFoundError, ValidationError } from '../../../core/errors/app.error';
import { LocationService } from '../../locations/services/location.service';
import { Location } from '../../locations/types/location.type';
import { ClientOrderInsertDto } from '../dtos/client-order.dto';
import { ClientOrderRepository } from '../repositories/client-order.repository';
import { ClientOrderService } from '../services/client-order.service';
import { OrderDetailsService } from '../services/order-details.service';
import { Order, OrderDetailsWithProduct } from '../types/order.type';

jest.mock('../../../core/common/validation', () => ({
  validateDto: jest.fn().mockResolvedValue(undefined),
}));

describe('ClientOrderService', () => {
  let service: ClientOrderService;
  let clientOrderRepository: jest.Mocked<ClientOrderRepository>;
  let orderDetailsService: jest.Mocked<OrderDetailsService>;
  let locationService: jest.Mocked<LocationService>;

  const mockOrder: Order = {
    id: 'order1',
    client_id: 'client1',
    user_address_id: 'address1',
    total: 100,
    status: 'pending',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
    delivery_id: null,
  };

  const mockLocation: Location = {
    id: 'address1',
    user_id: 'client1',
    address: 'Av. Siempre Viva 123',
    latitud: -17.7856,
    longitud: -63.1809,
    created_at: new Date().toString(),
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

  const validDto: ClientOrderInsertDto = {
    total: 100,
    user_address_id: 'address1',
    items: [
      {
        product_id: 'prod1',
        quantity: 2,
        subtotal: 50,
      },
    ],
  };

  beforeEach(() => {
    clientOrderRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      cancelById: jest.fn(),
    } as any;

    orderDetailsService = {
      getDetailsByOrderId: jest.fn(),
      getDetailsWithProduct: jest.fn(),
      createMany: jest.fn(),
    } as any;

    locationService = {
      findById: jest.fn(),
    } as any;

    service = new ClientOrderService(
      clientOrderRepository,
      orderDetailsService,
      locationService
    );

    jest.resetAllMocks();
  });

  describe('findAll()', () => {
    it('debería retornar el historial de pedidos del cliente', async () => {
      const mockOrders: Order[] = [
        mockOrder,
        { ...mockOrder, id: 'order2', status: 'delivered' },
      ];

      clientOrderRepository.findAll.mockResolvedValue(mockOrders);
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

      const result = await service.findAll('client1');

      expect(clientOrderRepository.findAll).toHaveBeenCalledWith('client1');
      expect(result).toEqual([
        {
          id: 'order1',
          created_at: mockOrder.created_at,
          updated_at: mockOrder.updated_at,
          total: 100,
          status: 'pending',
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
          items: 1,
        },
        {
          id: 'order2',
          created_at: mockOrder.created_at,
          updated_at: mockOrder.updated_at,
          total: 100,
          status: 'delivered',
          location: {
            address: 'Av. Siempre Viva 123',
            latitud: -17.7856,
            longitud: -63.1809,
          },
          items: 0,
        },
      ]);
    });

    it('debería lanzar NotFoundError si no se proporciona client_id', async () => {
      await expect(service.findAll('')).rejects.toThrow(NotFoundError);
    });

    it('debería retornar array vacío si no hay pedidos', async () => {
      clientOrderRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll('client1');
      expect(result).toEqual([]);
    });
  });

  describe('findById()', () => {
    it('debería retornar los detalles completos de un pedido', async () => {
      clientOrderRepository.findById.mockResolvedValue(mockOrder);
      orderDetailsService.getDetailsWithProduct.mockResolvedValue(mockOrderDetails);
      locationService.findById.mockResolvedValue(mockLocation);

      const result = await service.findById('order1', 'client1');

      expect(result).toEqual({
        id: 'order1',
        created_at: mockOrder.created_at,
        updated_at: mockOrder.updated_at,
        total: 100,
        status: 'pending',
        location: {
          address: 'Av. Siempre Viva 123',
          latitud: -17.7856,
          longitud: -63.1809,
        },
        items: mockOrderDetails,
      });
    });

    it('debería lanzar NotFoundError si no se proporciona client_id', async () => {
      await expect(service.findById('order1', '')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si no se proporciona order_id', async () => {
      await expect(service.findById('', 'client1')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si el pedido no existe', async () => {
      clientOrderRepository.findById.mockResolvedValue(null);

      await expect(service.findById('order1', 'client1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('create()', () => {
    it('debería crear un nuevo pedido correctamente', async () => {
      clientOrderRepository.create.mockResolvedValue(mockOrder);
      orderDetailsService.createMany.mockResolvedValue([]);

      const result = await service.create('client1', validDto);

      expect(validateDto).toHaveBeenCalledWith(expect.anything(), validDto);
      expect(clientOrderRepository.create).toHaveBeenCalledWith({
        total: 100,
        user_address_id: 'address1',
        client_id: 'client1',
      });
      expect(orderDetailsService.createMany).toHaveBeenCalledWith('order1', validDto.items);
      expect(result).toEqual(mockOrder);
    });

    it('debería cancelar el pedido si falla la creación de items', async () => {
      clientOrderRepository.create.mockResolvedValue(mockOrder);
      orderDetailsService.createMany.mockRejectedValue(new Error());
      clientOrderRepository.cancelById.mockResolvedValue({ ...mockOrder, status: 'cancelled' });

      await expect(service.create('client1', validDto)).rejects.toThrow(AppError);
      expect(clientOrderRepository.cancelById).toHaveBeenCalledWith('order1');
    });

    it('debería lanzar NotFoundError si no se proporciona client_id', async () => {
      await expect(service.create('', validDto)).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar ValidationError si los datos son inválidos', async () => {
      const invalidDto = { ...validDto, total: -1 };

      (validateDto as jest.Mock).mockRejectedValue(
        new ValidationError({ internalMessage: 'total debe ser positivo' })
      );

      await expect(service.create('client1', invalidDto)).rejects.toThrow(ValidationError);
    });

    it('debería lanzar AppError si no se puede crear el pedido', async () => {
      clientOrderRepository.create.mockResolvedValue(null);

      await expect(service.create('client1', validDto)).rejects.toThrow(AppError);
    });
  });

  describe('cancelById()', () => {
    it('debería cancelar un pedido existente', async () => {
      const cancelledOrder: Order = { ...mockOrder, status: 'cancelled' };
      clientOrderRepository.cancelById.mockResolvedValue(cancelledOrder);

      const result = await service.cancelById('order1', 'client1');

      expect(clientOrderRepository.cancelById).toHaveBeenCalledWith('order1');
      expect(result).toEqual(cancelledOrder);
    });

    it('debería lanzar NotFoundError si no se proporciona client_id', async () => {
      await expect(service.cancelById('order1', '')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar NotFoundError si no se proporciona order_id', async () => {
      await expect(service.cancelById('', 'client1')).rejects.toThrow(NotFoundError);
    });

    it('debería lanzar AppError si no se puede cancelar el pedido', async () => {
      clientOrderRepository.cancelById.mockResolvedValue(null);

      await expect(service.cancelById('order1', 'client1')).rejects.toThrow(AppError);
    });
  });
});

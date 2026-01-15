import * as service from '../../src/services/itemsService';
import ShoppingItem from '../../src/models/ShoppingItem';

jest.mock('../../src/models/ShoppingItem', () => ({
  find: jest.fn(),
  deleteMany: jest.fn(),
}));

const MockedShoppingItem = ShoppingItem as unknown as {
  find: jest.Mock;
  deleteMany: jest.Mock;
};

describe('itemsService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('getAll returns items', async () => {
    MockedShoppingItem.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([{ name: 'milk' }]),
    });

    const items = await service.getAll();

    expect(items).toEqual([{ name: 'milk' }]);
    expect(MockedShoppingItem.find).toHaveBeenCalled();
  });

  it('deleteAll calls deleteMany', async () => {
    MockedShoppingItem.deleteMany.mockResolvedValue({ deletedCount: 2 });

    await service.deleteAll();

    expect(MockedShoppingItem.deleteMany).toHaveBeenCalledWith({});
  });
});

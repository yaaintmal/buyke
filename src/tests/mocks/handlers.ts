import { http, HttpResponse } from 'msw';

const API_BASE = (import.meta.env.VITE_API_URL as string) || '';

export const handlers = [
  http.get(`${API_BASE}/items`, () => {
    return HttpResponse.json([
      {
        _id: '1',
        name: 'Apples',
        bought: false,
        quantity: 1,
        unit: 'pcs',
        category: 'Produce',
        createdAt: new Date().toISOString(),
      },
      {
        _id: '2',
        name: 'Bananas',
        bought: true,
        quantity: 1,
        unit: 'bunch',
        category: 'Produce',
        createdAt: new Date().toISOString(),
      },
    ]);
  }),
];

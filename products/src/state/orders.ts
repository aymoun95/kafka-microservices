// Simple in-memory store for mapping orders to product IDs
// In a real app, this would be a Redis cache or Database
export const orderProductMap = new Map<string, string[]>();

'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const mockCartStorage = new Map<string, Array<{ productId: number; quantity: number }>>();

async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    });
  }
  
  return sessionId;
}

export async function addToCart(productId: number, quantity: number = 1) {
  try {
    const sessionId = await getSessionId();
    const cartItems = mockCartStorage.get(sessionId) || [];
    
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ productId, quantity });
    }
    
    mockCartStorage.set(sessionId, cartItems);
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: 'Failed to add item to cart' };
  }
}

export async function updateCartItemQuantity(productId: number, quantity: number) {
  try {
    const sessionId = await getSessionId();
    
    if (quantity <= 0) {
      return await removeFromCart(productId);
    }

    const cartItems = mockCartStorage.get(sessionId) || [];
    const itemIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      cartItems[itemIndex].quantity = quantity;
      mockCartStorage.set(sessionId, cartItems);
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return { success: false, error: 'Failed to update cart item' };
  }
}

export async function removeFromCart(productId: number) {
  try {
    const sessionId = await getSessionId();
    const cartItems = mockCartStorage.get(sessionId) || [];
    
    const filteredItems = cartItems.filter(item => item.productId !== productId);
    mockCartStorage.set(sessionId, filteredItems);

    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}

export async function getCartItems() {
  try {
    const sessionId = await getSessionId();
    const cartItems = mockCartStorage.get(sessionId) || [];
    
    return cartItems.map(item => ({
      id: item.productId,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        id: item.productId,
        name: `Product ${item.productId}`,
        price: '25.00',
        images: [],
      },
    }));
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

export async function getCartItemCount() {
  try {
    const sessionId = await getSessionId();
    const cartItems = mockCartStorage.get(sessionId) || [];
    
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    return totalCount;
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
}

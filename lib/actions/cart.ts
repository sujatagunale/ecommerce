'use server';

import { db } from '@/db';
import { cartItems, products } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

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
    
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.productId, productId)
      ))
      .limit(1);
    
    if (existingItem.length > 0) {
      await db
        .update(cartItems)
        .set({ quantity: existingItem[0].quantity + quantity })
        .where(eq(cartItems.id, existingItem[0].id));
    } else {
      await db.insert(cartItems).values({
        sessionId,
        productId,
        quantity,
      });
    }
    
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
      await db
        .delete(cartItems)
        .where(and(
          eq(cartItems.sessionId, sessionId),
          eq(cartItems.productId, productId)
        ));
    } else {
      await db
        .update(cartItems)
        .set({ quantity })
        .where(and(
          eq(cartItems.sessionId, sessionId),
          eq(cartItems.productId, productId)
        ));
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return { success: false, error: 'Failed to update cart item' };
  }
}

export async function removeFromCart(productId: number) {
  try {
    const sessionId = await getSessionId();
    
    await db
      .delete(cartItems)
      .where(and(
        eq(cartItems.sessionId, sessionId),
        eq(cartItems.productId, productId)
      ));
    
    return { success: true };
  } catch (error) {
    console.error('Error removing from cart:', error);
    return { success: false, error: 'Failed to remove item from cart' };
  }
}

export async function getCartItems() {
  try {
    const sessionId = await getSessionId();
    
    const result = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        product: {
          id: products.id,
          name: products.name,
          slug: products.slug,
          price: products.price,
          images: products.images,
        },
      })
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));
    
    return result;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
}

export async function getCartItemCount() {
  try {
    const sessionId = await getSessionId();
    
    const result = await db
      .select({ quantity: cartItems.quantity })
      .from(cartItems)
      .where(eq(cartItems.sessionId, sessionId));
    
    const totalCount = result.reduce((sum, item) => sum + item.quantity, 0);
    return totalCount;
  } catch (error) {
    console.error('Error fetching cart count:', error);
    return 0;
  }
}

'use server';

import { prisma } from '@/lib/db';

export async function getWeeklyHighlight() {
  try {
    const product = await prisma.product.findFirst({
      where: {
        is_weekly_highlight: true,
      },
    });
    return product;
  } catch (error) {
    console.error('Error fetching weekly highlight:', error);
    return null;
  }
}

export async function getFeaturedProducts(limit = 3) {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return products;
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
}

export async function createProduct(data: any) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        description: data.description || null,
        image: data.image || null,
        is_weekly_highlight: data.is_weekly_highlight || false,
        weekly_highlight_image: data.weekly_highlight_image || null,
      },
    });
    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        description: data.description || null,
        image: data.image || null,
        is_weekly_highlight: data.is_weekly_highlight,
        weekly_highlight_image: data.weekly_highlight_image,
      },
    });
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

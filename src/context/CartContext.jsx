/**
 * GRUPO NORTÃO — CartContext
 * 
 * Estado global do carrinho de compras.
 * Gerencia: adicionar, remover, limpar, calcular totais.
 * Persiste no sessionStorage (limpa ao fechar o navegador).
 * 
 * Peças seminovas são estoque único (quantidade sempre 1).
 * Não permite duplicar a mesma peça no carrinho.
 * 
 * Uso:
 * import { useCart } from '../context/CartContext';
 * const { items, addItem, removeItem, total, itemCount } = useCart();
 */

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { sanitize } from '../security/sanitize';

const CartContext = createContext(null);

// Chave de storage
const STORAGE_KEY = 'gn_cart';

/**
 * Recupera carrinho do sessionStorage.
 */
function loadCart() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Salva carrinho no sessionStorage.
 */
function saveCart(items) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // sessionStorage indisponível
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Persiste toda vez que items muda
  useEffect(() => {
    saveCart(items);
  }, [items]);

  /**
   * Adiciona item ao carrinho.
   * Peça seminova = estoque único, não permite duplicar.
   * @param {Object} product — { slug, name, code, price, priceNum, condition, image }
   */
  const addItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find(
        (item) => item.slug === product.slug || item.code === product.code
      );
      if (exists) {
        return prev;
      }
      // Sanitiza dados de texto antes de armazenar
      const safeProduct = {
        slug: sanitize(product.slug || ''),
        name: sanitize(product.name || ''),
        code: sanitize(product.code || ''),
        price: sanitize(product.price || ''),
        priceNum: typeof product.priceNum === 'number' ? product.priceNum : 0,
        condition: sanitize(product.condition || 'Seminovo Original'),
        image: product.image || '',
        quantity: 1,
        addedAt: Date.now(),
      };
      return [...prev, safeProduct];
    });
    setDrawerOpen(true);
  }, []);

  /**
   * Remove item do carrinho por slug.
   * @param {string} slug
   */
  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  /**
   * Limpa todo o carrinho.
   */
  const clearCart = useCallback(() => {
    setItems([]);
    setDrawerOpen(false);
  }, []);

  /**
   * Verifica se um produto já está no carrinho.
   * @param {string} slug
   * @returns {boolean}
   */
  const isInCart = useCallback((slug) => {
    return items.some((item) => item.slug === slug);
  }, [items]);

  /**
   * Abre/fecha a gaveta do carrinho.
   */
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);

  /**
   * Cálculos derivados.
   */
  const itemCount = useMemo(() => items.length, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = typeof item.priceNum === 'number' ? item.priceNum : 0;
      return sum + price;
    }, 0);
  }, [items]);

  // Formata valor em BRL
  const subtotalFormatted = useMemo(() => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(subtotal);
  }, [subtotal]);

  const value = useMemo(() => ({
    items,
    itemCount,
    subtotal,
    subtotalFormatted,
    addItem,
    removeItem,
    clearCart,
    isInCart,
    drawerOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  }), [items, itemCount, subtotal, subtotalFormatted, addItem, removeItem, clearCart, isInCart, drawerOpen, openDrawer, closeDrawer, toggleDrawer]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook para acessar o carrinho.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}

/**
 * Formata preço em BRL.
 * @param {number} value
 * @returns {string}
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Parseia string de preço BR para número.
 * Ex: "R$ 890,00" → 890
 * @param {string} priceStr
 * @returns {number}
 */
export function parsePrice(priceStr) {
  if (typeof priceStr === 'number') return priceStr;
  if (!priceStr) return 0;
  const cleaned = priceStr
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

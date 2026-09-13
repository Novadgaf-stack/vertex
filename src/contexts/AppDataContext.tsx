"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Customer, Product, Transaction } from '../types';
import { mockCustomers, mockProducts, mockTransactions } from '../data/mockData';

interface AppDataContextType {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const addCustomer = (customer: Omit<Customer, 'id'>) => {
    const newCustomer = { ...customer, id: `C-${Math.floor(100 + Math.random() * 900)}` };
    setCustomers([newCustomer, ...customers]);
  };

  const updateCustomer = (id: string, data: Partial<Customer>) => {
    setCustomers(customers.map(c => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `P-${Math.floor(100 + Math.random() * 900)}` };
    setProducts([newProduct, ...products]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...data } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { ...transaction, id: `TRX-${Math.floor(10000 + Math.random() * 90000)}` };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <AppDataContext.Provider value={{
      customers, addCustomer, updateCustomer, deleteCustomer,
      products, addProduct, updateProduct, deleteProduct,
      transactions, addTransaction
    }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error('useAppData must be used within AppDataProvider');
  return context;
}

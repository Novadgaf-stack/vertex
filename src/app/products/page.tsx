"use client";
import { Plus, Search, Package, Edit2, Trash2 } from "lucide-react";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppData } from '../../contexts/AppDataContext';
import { useToast } from '../../contexts/ToastContext';
import { Product } from '../../types';


export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useAppData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Software',
    price: 0,
    status: 'in_stock' as 'in_stock' | 'low_stock' | 'out_of_stock',
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: '', category: 'Software', price: 0, status: 'in_stock' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name, 
      category: product.category, 
      price: product.price, 
      status: product.status 
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (product: Product) => {
    setEditingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      addToast(`Product ${formData.name} updated successfully.`, 'success');
    } else {
      addProduct({
        ...formData,
        sales: 0,
        revenue: 0,
      });
      addToast(`Product ${formData.name} added successfully.`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (editingProduct) {
      deleteProduct(editingProduct.id);
      addToast(`Product deleted successfully.`, 'success');
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Products</h1>
          <p className="text-sm text-text-muted mt-1">Manage your product catalog and inventory.</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:max-w-sm">
              <Input 
                placeholder="Search products..." 
                icon={<Search className="h-4 w-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <select 
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto text-text-primary"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Sales</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-surface-alt flex items-center justify-center text-text-muted">
                          <Package className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{product.name}</div>
                          <div className="text-xs text-text-muted font-mono">{product.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="neutral">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-right text-text-secondary">
                      {product.sales.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        product.status === 'in_stock' ? 'success' : 
                        product.status === 'low_stock' ? 'warning' : 'error'
                      }>
                        {product.status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(product)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-error hover:bg-error/10 hover:text-error" onClick={() => handleOpenDelete(product)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-text-muted">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-text-primary">Name</label>
            <Input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Premium Analytics"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-text-primary">Category</label>
            <Input 
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="e.g. Software"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary">Price ($)</label>
              <Input 
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary">Status</label>
              <select 
                className="flex h-10 w-full rounded-lg border border-border bg-surface text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Product</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Product</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          You are about to delete <strong>{editingProduct?.name}</strong>.
        </p>
      </Modal>
    </div>
  );
}

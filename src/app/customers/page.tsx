"use client";
import { Plus, Search, Edit2, Trash2, Filter, MoreHorizontal } from "lucide-react";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppData } from '../../contexts/AppDataContext';
import { useToast } from '../../contexts/ToastContext';
import { Customer } from '../../types';


export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useAppData();
  const { addToast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'Basic' as 'Basic' | 'Pro' | 'Enterprise',
    status: 'active' as 'active' | 'inactive' | 'churned',
  });

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({ name: '', email: '', plan: 'Basic', status: 'active' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({ 
      name: customer.name, 
      email: customer.email, 
      plan: customer.plan, 
      status: customer.status 
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
      addToast(`Customer ${formData.name} updated successfully.`, 'success');
    } else {
      addCustomer({
        ...formData,
        avatar: formData.name.substring(0, 2).toUpperCase(),
        revenue: 0,
        lastActivity: 'Just now'
      });
      addToast(`Customer ${formData.name} added successfully.`, 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (editingCustomer) {
      deleteCustomer(editingCustomer.id);
      addToast(`Customer deleted successfully.`, 'success');
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Customers</h1>
          <p className="text-sm text-text-muted mt-1">Manage your customer base and view their activity.</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:max-w-sm">
              <Input 
                placeholder="Search customers..." 
                icon={<Search className="h-4 w-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <select 
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto text-text-primary"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="churned">Churned</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>LTV Revenue</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar fallback={customer.avatar} />
                        <div>
                          <div className="font-medium text-text-primary">{customer.name}</div>
                          <div className="text-sm text-text-muted">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        customer.status === 'active' ? 'success' : 
                        customer.status === 'churned' ? 'error' : 'neutral'
                      }>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.plan === 'Enterprise' ? 'info' : 'neutral'} className="bg-surface-alt">
                        {customer.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${customer.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="text-text-secondary text-sm">
                      {customer.lastActivity}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(customer)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-error hover:bg-error/10 hover:text-error" onClick={() => handleOpenDelete(customer)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-text-muted">
                    No customers found.
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
        title={editingCustomer ? "Edit Customer" : "Add Customer"}
        description={editingCustomer ? "Update customer details." : "Add a new customer to your base."}
      >
        <form id="customer-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-text-primary">Name</label>
            <Input 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-text-primary">Email</label>
            <Input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="jane@example.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary">Plan</label>
              <select 
                className="flex h-10 w-full rounded-lg border border-border bg-surface text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.plan}
                onChange={(e) => setFormData({...formData, plan: e.target.value as any})}
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-text-primary">Status</label>
              <select 
                className="flex h-10 w-full rounded-lg border border-border bg-surface text-text-primary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="churned">Churned</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Save Customer</Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete Customer</Button>
          </>
        }
      >
        <p className="text-sm text-text-secondary">
          You are about to delete <strong>{editingCustomer?.name}</strong>.
        </p>
      </Modal>
    </div>
  );
}

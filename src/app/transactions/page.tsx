"use client";
import { Search, Eye, Filter } from "lucide-react";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAppData } from '../../contexts/AppDataContext';
import { Transaction } from '../../types';
import { format } from 'date-fns';


export default function Transactions() {
  const { transactions } = useAppData();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingTx, setViewingTx] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleView = (tx: Transaction) => {
    setViewingTx(tx);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Transactions</h1>
          <p className="text-sm text-text-muted mt-1">Manage and view all financial transactions.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:max-w-sm">
              <Input 
                placeholder="Search by ID or customer..." 
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
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell className="font-mono text-sm">{trx.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar fallback={trx.customerName.charAt(0)} size="sm" className="bg-surface-alt text-text-secondary" />
                        <span className="font-medium text-text-primary">{trx.customerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${trx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        trx.status === 'completed' ? 'success' : 
                        trx.status === 'pending' ? 'warning' : 'error'
                      }>
                        {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-secondary text-sm">
                      {trx.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right text-text-secondary text-sm">
                      {format(new Date(trx.date), 'MMM dd, yyyy - HH:mm')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleView(trx)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-text-muted">
                    No transactions found.
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
        title="Transaction Details"
        footer={<Button onClick={() => setIsModalOpen(false)}>Close</Button>}
      >
        {viewingTx && (
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <div>
                <p className="text-sm text-text-muted">Amount</p>
                <p className="text-2xl font-bold text-text-primary">${viewingTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <Badge variant={
                viewingTx.status === 'completed' ? 'success' : 
                viewingTx.status === 'pending' ? 'warning' : 'error'
              } className="text-sm px-3 py-1">
                {viewingTx.status.charAt(0).toUpperCase() + viewingTx.status.slice(1)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
              <div>
                <p className="text-text-muted mb-1">Transaction ID</p>
                <p className="font-mono text-text-primary">{viewingTx.id}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1">Date & Time</p>
                <p className="text-text-primary">{format(new Date(viewingTx.date), 'MMM dd, yyyy - HH:mm:ss')}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1">Customer</p>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar fallback={viewingTx.customerName.charAt(0)} size="sm" />
                  <p className="font-medium text-text-primary">{viewingTx.customerName}</p>
                </div>
              </div>
              <div>
                <p className="text-text-muted mb-1">Customer ID</p>
                <p className="font-mono text-text-primary">{viewingTx.customerId}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1">Payment Method</p>
                <p className="text-text-primary">{viewingTx.paymentMethod}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

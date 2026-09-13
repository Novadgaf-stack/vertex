"use client";
import { Download, Plus } from "lucide-react";

import React from 'react';
import { MetricCard } from '../components/ui/MetricCard';
import { DashboardRevenueChart } from '../components/dashboard/RevenueChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';

import { useAppData } from '../contexts/AppDataContext';
import { mockMetrics } from '../data/mockData';
import { useToast } from '../contexts/ToastContext';

export default function Dashboard() {
  const { transactions } = useAppData();
  const { addToast } = useToast();

  const handleExport = () => {
    addToast('Generating CSV export...', 'info');
    setTimeout(() => {
      addToast('Export downloaded successfully!', 'success');
    }, 1500);
  };

  const handleNewReport = () => {
    addToast('New report configuration opened.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-sm text-text-muted mt-1">Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleNewReport}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, i) => (
          <MetricCard key={i} data={metric} />
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <Card className="col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Top Services</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              {[
                { name: 'Analytics Pro', value: 65, color: 'bg-primary' },
                { name: 'Cloud Storage', value: 20, color: 'bg-info' },
                { name: 'API Enterprise', value: 10, color: 'bg-success' },
                { name: 'Other', value: 5, color: 'bg-border' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-text-secondary">{item.name}</span>
                    <span className="text-text-primary font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-alt rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">View All</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar fallback={trx.customerName.charAt(0)} size="sm" className="bg-surface-alt text-text-secondary" />
                      <div>
                        <div className="font-medium text-text-primary">{trx.customerName}</div>
                        <div className="text-xs text-text-muted font-mono">{trx.id}</div>
                      </div>
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
                    {format(new Date(trx.date), 'MMM dd, yyyy')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

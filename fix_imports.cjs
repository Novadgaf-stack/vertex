const fs = require('fs');

const files = [
  { path: 'src/app/customers/page.tsx', imports: 'import { Plus, Search, Edit2, Trash2, Filter, MoreHorizontal } from "lucide-react";' },
  { path: 'src/app/page.tsx', imports: 'import { Download, Plus } from "lucide-react";' },
  { path: 'src/app/products/page.tsx', imports: 'import { Plus, Search, Package, Edit2, Trash2 } from "lucide-react";' },
  { path: 'src/app/transactions/page.tsx', imports: 'import { Search, Eye, Filter } from "lucide-react";' },
  { path: 'src/components/layout/DashboardLayout.tsx', imports: 'import { X } from "lucide-react";' },
  { path: 'src/components/layout/Header.tsx', imports: 'import { Menu, Search, Bell } from "lucide-react";' },
  { path: 'src/components/layout/ThemeToggle.tsx', imports: 'import { Sun, Monitor, Moon } from "lucide-react";' },
  { path: 'src/components/ui/MetricCard.tsx', imports: 'import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";' },
  { path: 'src/components/ui/Modal.tsx', imports: 'import { X } from "lucide-react";' },
  { path: 'src/contexts/ToastContext.tsx', imports: 'import { CheckCircle, AlertCircle, Info, X } from "lucide-react";' },
  { path: 'src/components/layout/Sidebar.tsx', imports: 'import { LayoutDashboard, Users, CreditCard, Package, Settings, Search, Bell, Menu, X, ArrowUpRight, ArrowDownRight, Minus, Plus, Filter, MoreHorizontal, Trash2, Edit2, Download, Eye, Sun, Monitor, Moon, CheckCircle, AlertCircle, Info } from "lucide-react";' }
];

files.forEach(({path, imports}) => {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace('"use client";\n', `"use client";\n${imports}\n`);
  fs.writeFileSync(path, content);
});

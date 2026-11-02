import React, { useState } from 'react';
import { X, Download, Copy, Check } from 'lucide-react';
import {
  ORDERS_RAW,
  PRODUCTS,
  ORDERS_FEB,
  CAPSTONE_MARKS_RAW,
  CAPSTONE_DEPARTMENTS,
  ordersRawToTSV,
  productsToTSV,
  capstoneMarksToTSV,
  capstoneDeptsToTSV,
  downloadCSV,
} from '../../data/datasets';

interface DatasetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SheetTab = 'orders' | 'products' | 'feb' | 'capstone';

export const DatasetModal: React.FC<DatasetModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SheetTab>('orders');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Workshop Practice Datasets</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Copy directly into Excel 365, Excel 2021, or Google Sheets (preserves exact leading spaces and intentional errors), or download CSV files.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {(
              [
                { id: 'orders', label: 'Orders_Raw (8 rows)' },
                { id: 'products', label: 'Products (4 rows)' },
                { id: 'feb', label: 'Orders_Feb (Append)' },
                { id: 'capstone', label: 'Capstone Student Marks' },
              ] as { id: SheetTab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeTab === t.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'orders' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy('orders', ordersRawToTSV())}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedKey === 'orders' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'orders' ? 'Copied for Excel / Sheets' : 'Copy Table'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadCSV(
                      'Orders_Raw.csv',
                      ['OrderID', 'Customer', 'City', 'OrderDate', 'ProductCode', 'Qty', 'Price', 'Email'],
                      ORDERS_RAW.map((r) => [r.orderId, r.customer, r.city, r.orderDate, r.productCode, r.qty, r.price, r.email])
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Orders_Raw.csv</span>
                </button>
              </>
            )}

            {activeTab === 'products' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy('products', productsToTSV())}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedKey === 'products' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'products' ? 'Copied for Excel / Sheets' : 'Copy Table'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadCSV(
                      'Products.csv',
                      ['ProductCode', 'ProductName', 'Category'],
                      PRODUCTS.map((p) => [p.productCode, p.productName, p.category])
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Products.csv</span>
                </button>
              </>
            )}

            {activeTab === 'feb' && (
              <button
                type="button"
                onClick={() =>
                  downloadCSV(
                    'Orders_Feb.csv',
                    ['OrderID', 'Customer', 'City', 'OrderDate', 'ProductCode', 'Qty', 'Price', 'Email'],
                    ORDERS_FEB.map((r) => [r.orderId, r.customer, r.city, r.orderDate, r.productCode, String(r.qty), String(r.price), r.email])
                  )
                }
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Orders_Feb.csv</span>
              </button>
            )}

            {activeTab === 'capstone' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy('cap_marks', capstoneMarksToTSV())}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedKey === 'cap_marks' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cap_marks' ? 'Marks Copied' : 'Copy Marks'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy('cap_depts', capstoneDeptsToTSV())}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copiedKey === 'cap_depts' ? <Check className="w-3.5 h-3.5 text-teal-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cap_depts' ? 'Depts Copied' : 'Copy Depts'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    downloadCSV(
                      'Capstone_Student_Marks_Raw.csv',
                      ['RollNo', 'StudentName', 'DOB', 'DeptCode', 'Marks', 'Email'],
                      CAPSTONE_MARKS_RAW.map((r) => [r.rollNo, r.studentName, r.dob, r.deptCode, r.marks, r.email])
                    )
                  }
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Capstone CSV</span>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeTab === 'orders' && (
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-2.5 px-3">OrderID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">OrderDate</th>
                  <th className="py-2.5 px-3">ProductCode</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ORDERS_RAW.map((r) => (
                  <tr key={r.rowNum} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">{r.orderId}</td>
                    <td className="py-2.5 px-3 whitespace-pre">{r.customer}</td>
                    <td className="py-2.5 px-3">{r.city}</td>
                    <td className="py-2.5 px-3">{r.orderDate}</td>
                    <td className="py-2.5 px-3">{r.productCode}</td>
                    <td className="py-2.5 px-3 text-slate-500">{r.qty || '(blank)'}</td>
                    <td className="py-2.5 px-3">{r.price}</td>
                    <td className="py-2.5 px-3">{r.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'products' && (
            <table className="w-full max-w-xl text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-2.5 px-3">ProductCode</th>
                  <th className="py-2.5 px-3">ProductName</th>
                  <th className="py-2.5 px-3">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PRODUCTS.map((p) => (
                  <tr key={p.productCode} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-medium text-slate-900">{p.productCode}</td>
                    <td className="py-2.5 px-3">{p.productName}</td>
                    <td className="py-2.5 px-3">{p.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'feb' && (
            <table className="w-full text-left border-collapse font-mono text-xs tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                  <th className="py-2.5 px-3">OrderID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">OrderDate</th>
                  <th className="py-2.5 px-3">ProductCode</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Price</th>
                  <th className="py-2.5 px-3">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ORDERS_FEB.map((r) => (
                  <tr key={r.orderId} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3">{r.orderId}</td>
                    <td className="py-2.5 px-3">{r.customer}</td>
                    <td className="py-2.5 px-3">{r.city}</td>
                    <td className="py-2.5 px-3">{r.orderDate}</td>
                    <td className="py-2.5 px-3">{r.productCode}</td>
                    <td className="py-2.5 px-3">{r.qty}</td>
                    <td className="py-2.5 px-3">{r.price}</td>
                    <td className="py-2.5 px-3">{r.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'capstone' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="text-xs font-semibold text-slate-700 mb-2">Sheet 1: Student_Marks_Raw (7 messy rows)</div>
                <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                      <th className="py-2 px-2.5">RollNo</th>
                      <th className="py-2 px-2.5">StudentName</th>
                      <th className="py-2 px-2.5">DOB</th>
                      <th className="py-2 px-2.5">DeptCode</th>
                      <th className="py-2 px-2.5">Marks</th>
                      <th className="py-2 px-2.5">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CAPSTONE_MARKS_RAW.map((r) => (
                      <tr key={r.rowNum}>
                        <td className="py-2 px-2.5">{r.rollNo}</td>
                        <td className="py-2 px-2.5 whitespace-pre">{r.studentName}</td>
                        <td className="py-2 px-2.5">{r.dob}</td>
                        <td className="py-2 px-2.5">{r.deptCode}</td>
                        <td className="py-2 px-2.5 text-slate-600">{r.marks || '(blank)'}</td>
                        <td className="py-2 px-2.5">{r.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">Sheet 2: Departments (Lookup)</div>
                <table className="w-full text-left border-collapse font-mono text-xs tabular-nums border border-slate-200">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50">
                      <th className="py-2 px-2.5">DeptCode</th>
                      <th className="py-2 px-2.5">DeptName</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {CAPSTONE_DEPARTMENTS.map((d) => (
                      <tr key={d.deptCode}>
                        <td className="py-2 px-2.5 font-medium">{d.deptCode}</td>
                        <td className="py-2 px-2.5">{d.deptName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

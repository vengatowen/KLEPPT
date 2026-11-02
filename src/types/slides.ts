export type ModuleId =
  | 'opening'
  | 'module1'
  | 'module2'
  | 'module3'
  | 'module4'
  | 'module5'
  | 'module6';

export interface SlideMeta {
  number: number;
  module: ModuleId;
  moduleLabel: string;
  title: string;
  subtitle?: string;
  isHandsOn?: boolean;
  durationMinutes?: number;
  facilitatorPrompt: string;
  softwareNote?: string;
}

export interface OrderRawRow {
  rowNum: number; // Excel row number (2..9)
  orderId: string;
  customer: string;
  city: string;
  orderDate: string;
  productCode: string;
  qty: string;
  price: string;
  email: string;
  issues: Record<string, string>; // column key -> explanation of dirt
}

export interface ProductRow {
  productCode: string;
  productName: string;
  category: string;
}

export interface CapstoneMarkRow {
  rowNum: number;
  rollNo: string;
  studentName: string;
  dob: string;
  deptCode: string;
  marks: string;
  email: string;
  issueSummary: string;
}

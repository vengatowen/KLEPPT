import { OrderRawRow, ProductRow, CapstoneMarkRow } from '../types/slides';

export const ORDERS_RAW: OrderRawRow[] = [
  {
    rowNum: 2,
    orderId: '1001',
    customer: ' ravi kumar ',
    city: 'chennai',
    orderDate: '05/03/2026',
    productCode: 'P01',
    qty: '2',
    price: '450',
    email: 'ravi.k@mail.com',
    issues: {
      customer: 'Leading/trailing spaces + lowercase name',
      city: 'Lowercase city ("chennai")',
      orderDate: 'Ambiguous slash format (05/03/2026 — DMY vs MDY)',
    },
  },
  {
    rowNum: 3,
    orderId: '1002',
    customer: 'PRIYA SHARMA',
    city: 'Coimbatore',
    orderDate: '2026-03-07',
    productCode: 'P02',
    qty: '',
    price: '1200',
    email: 'priya@mail',
    issues: {
      orderId: 'Order 1002 is duplicated in Row 5',
      customer: 'ALL CAPS name ("PRIYA SHARMA")',
      qty: 'Missing value (blank Qty)',
      email: 'Invalid email domain ("priya@mail" missing TLD)',
    },
  },
  {
    rowNum: 4,
    orderId: '1003',
    customer: 'Anil  Verma',
    city: 'MADURAI',
    orderDate: '7 March 2026',
    productCode: 'P01',
    qty: '3',
    price: '450',
    email: 'anil.v@mail.com',
    issues: {
      customer: 'Extra internal space ("Anil  Verma", LEN = 11)',
      city: 'ALL CAPS city ("MADURAI")',
      orderDate: 'Written text date ("7 March 2026")',
    },
  },
  {
    rowNum: 5,
    orderId: '1002',
    customer: 'PRIYA SHARMA',
    city: 'Coimbatore',
    orderDate: '2026-03-07',
    productCode: 'P02',
    qty: '',
    price: '1200',
    email: 'priya@mail',
    issues: {
      orderId: 'Exact duplicate of Row 3 (Order 1002)',
      customer: 'ALL CAPS name',
      qty: 'Missing value (blank Qty)',
      email: 'Invalid email ("priya@mail")',
    },
  },
  {
    rowNum: 6,
    orderId: '1004',
    customer: 'meena iyer',
    city: 'Chennai',
    orderDate: '09-03-2026',
    productCode: 'P03',
    qty: '1',
    price: 'N/A',
    email: 'meena.i@mail.com',
    issues: {
      customer: 'Lowercase name ("meena iyer")',
      orderDate: 'Hyphenated date style ("09-03-2026")',
      price: 'Text placeholder "N/A" in numeric Price column',
    },
  },
  {
    rowNum: 7,
    orderId: '1005',
    customer: 'Suresh Babu',
    city: 'Trichy',
    orderDate: '10/03/2026',
    productCode: 'P02',
    qty: '-2',
    price: '1200',
    email: 'suresh.b@mail.com',
    issues: {
      orderDate: 'Slash date style ("10/03/2026")',
      qty: 'Impossible negative quantity (-2)',
    },
  },
  {
    rowNum: 8,
    orderId: '1006',
    customer: 'ravi kumar',
    city: 'Chennai',
    orderDate: '12/03/2026',
    productCode: 'P09',
    qty: '5',
    price: '300',
    email: 'ravi.k@mail.com',
    issues: {
      customer: 'Lowercase name ("ravi kumar")',
      orderDate: 'Slash date style ("12/03/2026")',
      productCode: 'Invalid ProductCode "P09" (not in Products sheet)',
    },
  },
  {
    rowNum: 9,
    orderId: '1007',
    customer: 'Divya R',
    city: 'coimbatore',
    orderDate: '13/03/2026',
    productCode: 'P01',
    qty: '4',
    price: 'Rs.450',
    email: 'divya@mail.com',
    issues: {
      city: 'Lowercase city ("coimbatore")',
      orderDate: 'Slash date ("13/03/2026" — proves DMY format)',
      price: 'Currency text prefix "Rs.450" stored as text',
    },
  },
];

export const PRODUCTS: ProductRow[] = [
  { productCode: 'P01', productName: 'Arduino Kit', category: 'Electronics' },
  { productCode: 'P02', productName: 'Raspberry Pi', category: 'Electronics' },
  { productCode: 'P03', productName: 'Sensor Pack', category: 'Components' },
  { productCode: 'P04', productName: 'Jumper Wires', category: 'Components' },
];

export const ORDERS_FEB = [
  {
    orderId: '2001',
    customer: 'Karthik S',
    city: 'Madurai',
    orderDate: '2026-02-14',
    productCode: 'P04',
    qty: 6,
    price: 150,
    email: 'karthik.s@mail.com',
  },
  {
    orderId: '2002',
    customer: 'Lakshmi N',
    city: 'Chennai',
    orderDate: '2026-02-21',
    productCode: 'P03',
    qty: 2,
    price: 350,
    email: 'lakshmi.n@mail.com',
  },
];

export const CAPSTONE_MARKS_RAW: CapstoneMarkRow[] = [
  {
    rowNum: 2,
    rollNo: 'R101',
    studentName: ' arjun nair ',
    dob: '14/05/2005',
    deptCode: 'D01',
    marks: '88',
    email: 'arjun.n@college.edu',
    issueSummary: 'Extra spaces + lowercase name, slash DOB',
  },
  {
    rowNum: 3,
    rollNo: 'R102',
    studentName: 'KAVYA MENON',
    dob: '2005-08-22',
    deptCode: 'D02',
    marks: '92 marks',
    email: 'kavya.m@college.edu',
    issueSummary: 'ALL CAPS name, "92 marks" stored as text',
  },
  {
    rowNum: 4,
    rollNo: 'R102',
    studentName: 'KAVYA MENON',
    dob: '2005-08-22',
    deptCode: 'D02',
    marks: '92 marks',
    email: 'kavya.m@college.edu',
    issueSummary: 'Exact duplicate RollNo R102',
  },
  {
    rowNum: 5,
    rollNo: 'R103',
    studentName: 'Rohit  Sharma',
    dob: '3 Nov 2004',
    deptCode: 'D01',
    marks: '',
    email: 'rohit@college',
    issueSummary: 'Double internal space, text DOB, missing marks, invalid email',
  },
  {
    rowNum: 6,
    rollNo: 'R104',
    studentName: 'sneha patel',
    dob: '19-01-2005',
    deptCode: 'D99',
    marks: '76',
    email: 'sneha.p@college.edu',
    issueSummary: 'Lowercase name, hyphen DOB, unknown DeptCode D99',
  },
  {
    rowNum: 7,
    rollNo: 'R105',
    studentName: 'Vikram Das',
    dob: '27/09/2005',
    deptCode: 'D03',
    marks: '-15',
    email: 'vikram.d@college.edu',
    issueSummary: 'Impossible negative marks (-15), slash DOB',
  },
  {
    rowNum: 8,
    rollNo: 'R106',
    studentName: 'Nithya K',
    dob: '11/12/2005',
    deptCode: 'D04',
    marks: 'N/A',
    email: 'nithya.k@college.edu',
    issueSummary: 'Ambiguous DOB (11/12/2005), "N/A" placeholder in marks',
  },
];

export const CAPSTONE_DEPARTMENTS = [
  { deptCode: 'D01', deptName: 'Computer Science', hod: 'Dr. S. Raman' },
  { deptCode: 'D02', deptName: 'Electronics & Comm.', hod: 'Dr. P. Krishnan' },
  { deptCode: 'D03', deptName: 'Mechanical Engg.', hod: 'Dr. M. Sundar' },
  { deptCode: 'D04', deptName: 'Data Science', hod: 'Dr. A. Natarajan' },
];

export function ordersRawToTSV(): string {
  const header = ['OrderID', 'Customer', 'City', 'OrderDate', 'ProductCode', 'Qty', 'Price', 'Email'].join('\t');
  const rows = ORDERS_RAW.map((r) =>
    [r.orderId, r.customer, r.city, r.orderDate, r.productCode, r.qty, r.price, r.email].join('\t')
  );
  return [header, ...rows].join('\n');
}

export function productsToTSV(): string {
  const header = ['ProductCode', 'ProductName', 'Category'].join('\t');
  const rows = PRODUCTS.map((p) => [p.productCode, p.productName, p.category].join('\t'));
  return [header, ...rows].join('\n');
}

export function capstoneMarksToTSV(): string {
  const header = ['RollNo', 'StudentName', 'DOB', 'DeptCode', 'Marks', 'Email'].join('\t');
  const rows = CAPSTONE_MARKS_RAW.map((r) =>
    [r.rollNo, r.studentName, r.dob, r.deptCode, r.marks, r.email].join('\t')
  );
  return [header, ...rows].join('\n');
}

export function capstoneDeptsToTSV(): string {
  const header = ['DeptCode', 'DeptName', 'HOD'].join('\t');
  const rows = CAPSTONE_DEPARTMENTS.map((d) => [d.deptCode, d.deptName, d.hod].join('\t'));
  return [header, ...rows].join('\n');
}

export function downloadCSV(filename: string, headers: string[], rows: string[][]): void {
  const escapeCell = (val: string) => {
    if (val.includes(',') || val.includes('"') || val.includes('\n') || val.startsWith(' ') || val.endsWith(' ')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };
  const csv = [headers.map(escapeCell).join(','), ...rows.map((r) => r.map(escapeCell).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

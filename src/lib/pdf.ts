import { jsPDF } from 'jspdf';
import type { User } from '../types';

const BLUE  = '#1a6bff';
const BLACK = '#111111';
const GREY  = '#9a9a96';
const LIGHT = '#e0e0dc';
const OFF   = '#f8f8f6';

// ─── low-level helpers ────────────────────────────────────────────────────────

function doc(): jsPDF {
  return new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
}

function hex(pdf: jsPDF, color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  pdf.setTextColor(r, g, b);
}

function fillHex(pdf: jsPDF, color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  pdf.setFillColor(r, g, b);
}

function strokeHex(pdf: jsPDF, color: string) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  pdf.setDrawColor(r, g, b);
}

function label(pdf: jsPDF, text: string, x: number, y: number) {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  hex(pdf, GREY);
  pdf.text(text.toUpperCase(), x, y);
}

function bold(pdf: jsPDF, text: string, x: number, y: number, size = 10) {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(size);
  hex(pdf, BLACK);
  pdf.text(text, x, y);
}

function divider(pdf: jsPDF, y: number, dashed = false) {
  strokeHex(pdf, dashed ? LIGHT : BLACK);
  pdf.setLineWidth(dashed ? 0.2 : 0.5);
  if (dashed) {
    pdf.setLineDashPattern([1, 1.5], 0);
  } else {
    pdf.setLineDashPattern([], 0);
  }
  pdf.line(15, y, 195, y);
  pdf.setLineDashPattern([], 0);
}

// ─── brand header ─────────────────────────────────────────────────────────────

function brandHeader(pdf: jsPDF, docType: string, ref: string, date: string) {
  // Blue accent bar at top
  fillHex(pdf, BLUE);
  pdf.rect(0, 0, 210, 6, 'F');

  // Logo wordmark
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(22);
  hex(pdf, BLACK);
  pdf.text('Sduella', 15, 22);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  hex(pdf, GREY);
  pdf.text('COMMUNITY EDUCATION FUND', 15, 27);

  // Doc type + ref (right-aligned)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  hex(pdf, BLUE);
  pdf.text(docType.toUpperCase(), 195, 18, { align: 'right' });

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  hex(pdf, BLACK);
  pdf.text(ref, 195, 23, { align: 'right' });

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  hex(pdf, GREY);
  pdf.text(date, 195, 28, { align: 'right' });

  divider(pdf, 33);
}

// ─── brand footer ─────────────────────────────────────────────────────────────

function brandFooter(pdf: jsPDF) {
  const pageH = pdf.internal.pageSize.getHeight();
  divider(pdf, pageH - 22);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  hex(pdf, GREY);
  pdf.text(
    'Sduella Community Education Fund. Contributions are managed by the Sduella committee and disbursed to approved students only.',
    15, pageH - 17
  );
  pdf.text(
    'Section 18A tax receipt available on request. All sensitive data encrypted at rest.',
    15, pageH - 12
  );

  const generated = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });
  pdf.setFont('helvetica', 'bold');
  hex(pdf, GREY);
  pdf.text(`Generated: ${generated}`, 195, pageH - 12, { align: 'right' });

  // Bottom accent bar
  fillHex(pdf, BLUE);
  pdf.rect(0, pageH - 5, 210, 5, 'F');
}

// ─── donor info rows ──────────────────────────────────────────────────────────

function donorSection(pdf: jsPDF, donor: User, startY: number): number {
  let y = startY;

  label(pdf, 'Donor Details', 15, y); y += 6;
  divider(pdf, y, true); y += 6;

  const rows: [string, string][] = [
    ['Full Name', donor.name],
    ['Email', donor.email],
    ...(donor.phone ? [['Phone', donor.phone] as [string, string]] : []),
    ...(donor.address ? [['Address', donor.address] as [string, string]] : []),
    ...(donor.donorType === 'company' && donor.company ? [
      ['Company', donor.company.companyName] as [string, string],
      ['Reg. Number', donor.company.registrationNumber] as [string, string],
      ...(donor.company.vatNumber ? [['VAT Number', donor.company.vatNumber] as [string, string]] : []),
      ['Representative', donor.company.authorisedRepresentative] as [string, string],
    ] : []),
  ];

  for (const [lbl, val] of rows) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    hex(pdf, GREY);
    pdf.text(lbl, 15, y);
    pdf.setFont('helvetica', 'bold');
    hex(pdf, BLACK);
    pdf.text(val, 195, y, { align: 'right' });
    divider(pdf, y + 2.5, true);
    y += 8;
  }

  return y + 4;
}

// ─── public API ───────────────────────────────────────────────────────────────

export function printDonationReceipt(donation: any, donor: User, index: number) {
  const pdf = doc();
  const ref = `SDU-RCP-${new Date(donation.date).getFullYear()}-${String(index + 1).padStart(4, '0')}`;

  brandHeader(pdf, 'Donation Receipt', ref, donation.date);

  // Amount highlight block
  fillHex(pdf, OFF);
  strokeHex(pdf, LIGHT);
  pdf.setLineWidth(0.3);
  pdf.rect(15, 37, 180, 22, 'FD');
  // Blue left accent
  fillHex(pdf, BLUE);
  pdf.rect(15, 37, 3, 22, 'F');

  label(pdf, 'Contribution Amount', 22, 44);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  hex(pdf, BLACK);
  pdf.text(`R ${donation.amount.toLocaleString('en-ZA')}`, 22, 54);

  // Status pill (right side of block)
  const statusColor = donation.status === 'Disbursed' ? '#00875a' : BLUE;
  const statusBg    = donation.status === 'Disbursed' ? '#e6f9f3' : '#e8f0ff';
  fillHex(pdf, statusBg);
  pdf.roundedRect(155, 41, 36, 8, 1, 1, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7);
  hex(pdf, statusColor);
  pdf.text(donation.status.toUpperCase(), 173, 46.5, { align: 'center' });

  let y = 68;

  y = donorSection(pdf, donor, y);

  label(pdf, 'Donation Details', 15, y); y += 6;
  divider(pdf, y, true); y += 6;

  const details: [string, string][] = [
    ['Date', donation.date],
    ['Amount', `R ${donation.amount.toLocaleString('en-ZA')}`],
    ['Students Helped', String(donation.students ?? '—')],
    ['Fund Status', donation.status],
    ['Reference', ref],
  ];

  for (const [lbl, val] of details) {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    hex(pdf, GREY);
    pdf.text(lbl, 15, y);
    pdf.setFont('helvetica', 'bold');
    hex(pdf, BLACK);
    pdf.text(val, 195, y, { align: 'right' });
    divider(pdf, y + 2.5, true);
    y += 8;
  }

  brandFooter(pdf);
  pdf.save(`Sduella-Receipt-${ref}.pdf`);
}

export function printDonationStatement(donor: User) {
  const pdf = doc();
  const donations = donor.donations ?? [];
  const total         = donations.reduce((s: number, d: any) => s + d.amount, 0);
  const totalStudents = donations.reduce((s: number, d: any) => s + (d.students ?? 0), 0);
  const ref = `SDU-STMT-${donor.email.split('@')[0].toUpperCase()}-${new Date().getFullYear()}`;
  const dateStr = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });

  brandHeader(pdf, 'Donation Statement', ref, dateStr);

  let y = 42;
  y = donorSection(pdf, donor, y);

  // Summary boxes
  const boxes = [
    { label: 'Total Donated',    value: `R ${total.toLocaleString('en-ZA')}`, color: BLUE },
    { label: 'Students Helped',  value: String(totalStudents),                color: BLACK },
    { label: 'Donations on Record', value: String(donations.length),          color: BLACK },
  ];
  const bw = 56, bh = 18, bx = 15;
  boxes.forEach((b, i) => {
    const x = bx + i * (bw + 4);
    fillHex(pdf, OFF);
    strokeHex(pdf, LIGHT);
    pdf.setLineWidth(0.3);
    pdf.rect(x, y, bw, bh, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    hex(pdf, GREY);
    pdf.text(b.label.toUpperCase(), x + 4, y + 6);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    hex(pdf, b.color);
    pdf.text(b.value, x + 4, y + 14);
  });
  y += 26;

  label(pdf, 'Donation History', 15, y); y += 6;
  divider(pdf, y); y += 5;

  // Table header
  const cols = [15, 55, 95, 130, 162];
  const headers = ['Date', 'Amount', 'Students', 'Status', 'Reference'];
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(7.5);
  hex(pdf, GREY);
  headers.forEach((h, i) => pdf.text(h.toUpperCase(), cols[i], y));
  y += 2;
  divider(pdf, y, true); y += 5;

  donations.forEach((d: any, i: number) => {
    const rowRef = `SDU-RCP-${new Date(d.date).getFullYear()}-${String(i + 1).padStart(4, '0')}`;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    hex(pdf, BLACK);
    pdf.text(d.date,                                cols[0], y);
    bold(pdf, `R ${d.amount.toLocaleString('en-ZA')}`, cols[1], y, 9);
    pdf.setFont('helvetica', 'normal');
    pdf.text(String(d.students ?? '—'),             cols[2], y);

    // Status pill
    const sc = d.status === 'Disbursed' ? '#00875a' : BLUE;
    const sb = d.status === 'Disbursed' ? '#e6f9f3' : '#e8f0ff';
    fillHex(pdf, sb);
    pdf.roundedRect(cols[3] - 1, y - 3.5, 26, 6, 1, 1, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(6.5);
    hex(pdf, sc);
    pdf.text(d.status.toUpperCase(), cols[3] + 12, y, { align: 'center' });

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    hex(pdf, GREY);
    pdf.text(rowRef, cols[4], y);

    y += 8;
    divider(pdf, y - 3, true);
  });

  // Totals row
  y += 2;
  divider(pdf, y);
  y += 6;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  hex(pdf, BLACK);
  pdf.text('TOTAL', cols[0], y);
  hex(pdf, BLUE);
  pdf.text(`R ${total.toLocaleString('en-ZA')}`, cols[1], y);
  hex(pdf, BLACK);
  pdf.text(String(totalStudents), cols[2], y);

  brandFooter(pdf);
  pdf.save(`Sduella-Statement-${ref}.pdf`);
}

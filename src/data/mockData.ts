import type { Role } from '../types';

export const INITIAL_POOL = 0;

export const MOCK_DATA = {
  donors: {
    'thandi@email.com': {
      name: 'Thandi Mokoena',
      role: 'donor' as Role,
      phone: '+27 82 345 6789',
      address: '14 Protea Street, Soweto, Johannesburg, 1804',
      totalDonated: 15000,
      donations: [
        { date: '2025-10-12', amount: 5000, students: 3, status: 'Disbursed' },
        { date: '2025-12-01', amount: 5000, students: 4, status: 'Disbursed' },
        { date: '2026-02-18', amount: 5000, students: 3, status: 'Active' },
      ],
    },
    'siya@email.com': {
      name: 'Siyanda Dlamini',
      role: 'donor' as Role,
      phone: '+27 71 890 1234',
      address: '8 Berea Road, Durban North, KwaZulu-Natal, 4051',
      totalDonated: 8500,
      donations: [
        { date: '2025-11-05', amount: 3500, students: 2, status: 'Disbursed' },
        { date: '2026-01-20', amount: 5000, students: 3, status: 'Active' },
      ],
    },
  },
  students: {
    'mpho@university.edu': {
      name: 'Mpho Sithole',
      role: 'student' as Role,
      phone: '+27 63 012 3456',
      idNumber: '0001015800082',
      address: '22 Jan Smuts Avenue, Braamfontein, Johannesburg, 2001',
      institution: 'Metropolitan University',
      year: '3rd Year',
      applications: [
        { id: 'APP-2024-031', date: '2025-09-14', category: 'Graduation Clearance', amount: 12000, status: 'Approved' },
        { id: 'APP-2025-007', date: '2026-01-08', category: 'Tuition Fees', amount: 8500, status: 'Under Review' },
      ],
    },
    'naledi@institute.edu': {
      name: 'Naledi Khumalo',
      role: 'student' as Role,
      phone: '+27 74 567 8901',
      idNumber: '0205100800087',
      address: '3 Adderley Street, Cape Town City Centre, Western Cape, 8001',
      institution: 'Globala Tech Institute',
      year: '2nd Year',
      applications: [],
    },
  },
  passwords: {
    'thandi@email.com': 'pass123',
    'siya@email.com': 'pass123',
    'mpho@university.edu': 'pass123',
    'naledi@institute.edu': 'pass123',
    'admin@sduella.com': 'admin123',
  },
};

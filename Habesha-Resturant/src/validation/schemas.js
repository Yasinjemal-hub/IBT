import { z } from 'zod';

// ──────────────────────────────────────────────
// Checkout Form Validation Schema
// ──────────────────────────────────────────────

export const recipientSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be at most 60 characters')
    .regex(/^[a-zA-Z\u1200-\u137F\s]+$/, 'Name can only contain letters and spaces'),
  phone: z
    .string()
    .min(9, 'Phone number must be at least 9 digits')
    .max(10, 'Phone number must be at most 10 digits')
    .regex(/^9\d{8,9}$/, 'Enter a valid Ethiopian phone number (9XX XXX XXXX)'),
});

export const deliveryAddressSchema = z.object({
  city: z
    .string()
    .min(2, 'City is required'),
  subCity: z
    .string()
    .min(2, 'Sub-city is required'),
  kebele: z
    .string()
    .min(1, 'Kebele / area is required'),
  building: z
    .string()
    .optional(),
});

export const checkoutSchema = z.object({
  recipient: recipientSchema,
  deliveryAddress: deliveryAddressSchema.optional(),
  deliveryType: z.enum(['delivery', 'pickup']),
  paymentMethod: z
    .string({ required_error: 'Please select a payment method' })
    .min(1, 'Please select a payment method'),
  telebirrPhone: z
    .string()
    .regex(/^9\d{8,9}$/, 'Enter a valid Telebirr phone number')
    .optional()
    .or(z.literal('')),
});

// Refine: if delivery, address fields are required
export const checkoutFormSchema = checkoutSchema.refine(
  (data) => {
    if (data.deliveryType === 'delivery') {
      return data.deliveryAddress && data.deliveryAddress.subCity && data.deliveryAddress.kebele;
    }
    return true;
  },
  { message: 'Delivery address is required for delivery orders', path: ['deliveryAddress'] }
).refine(
  (data) => {
    if (data.paymentMethod === 'telebirr') {
      return data.telebirrPhone && /^9\d{8,9}$/.test(data.telebirrPhone);
    }
    return true;
  },
  { message: 'Telebirr phone number is required', path: ['telebirrPhone'] }
);

// ──────────────────────────────────────────────
// Account / Login Validation Schema
// ──────────────────────────────────────────────

export const loginPhoneSchema = z.object({
  phone: z
    .string()
    .min(9, 'Phone number must be at least 9 digits')
    .regex(/^\d{8,9}$/, 'Enter a valid Ethiopian phone number (e.g. 91123 4567)'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(50, 'Password must be at most 50 characters'),
});

export const loginEmailSchema = z.object({
  email: z
    .string()
    .email('Enter a valid email address')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(50, 'Password must be at most 50 characters'),
});

// ──────────────────────────────────────────────
// Search Query Validation Schema
// ──────────────────────────────────────────────

export const searchQuerySchema = z
  .string()
  .max(100, 'Search query is too long')
  .transform((val) => val.trim());

// ──────────────────────────────────────────────
// Helper: validate & return errors map
// ──────────────────────────────────────────────

export function validateForm(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: {} };
  }
  const errors = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return { success: false, data: null, errors };
}

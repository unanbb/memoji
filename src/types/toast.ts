import { z } from 'zod';

export const toastArgsSchema = z.object({
  name: z.string(),
  state: z.string(),
  message: z.string().optional(),
  type: z.enum(['success', 'error']).optional(),
});

export type ToastArgs = z.infer<typeof toastArgsSchema>;

export interface ToastProps {
  closeToast: () => void;
  ariaLabel: string;
  message?: ToastArgs['message'];
}

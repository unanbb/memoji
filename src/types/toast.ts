import { z } from 'zod';

export const toastArgsSchema = z.object({
  name: z.string(),
  state: z.string(),
  type: z.enum(['success', 'error']).optional(),
  ariaLabel: z.string(),
})

export type ToastArgs = z.infer<typeof toastArgsSchema>;

export interface ToastProps extends ToastArgs {
  closeToast: () => void;
}

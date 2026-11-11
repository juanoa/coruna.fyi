// shadcn/ui (Base UI), adapted to the tokens documented in /ds.
import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />;
}
function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}
function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}
function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return <DialogPrimitive.Backdrop data-slot="dialog-overlay" className={cn('fixed inset-0 z-80 bg-video-shade', className)} {...props} />;
}
function DialogContent({ className, children, showCloseButton = true, ...props }: DialogPrimitive.Popup.Props & { showCloseButton?: boolean }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup data-slot="dialog-content" className={cn('fixed top-1/2 left-1/2 z-81 flex max-h-[calc(100dvh_-_48px)] w-[min(640px,calc(100%_-_32px))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-card border border-line bg-surface font-body text-ink outline-none', className)} {...props}>
        {children}
        {showCloseButton && <DialogClose className="absolute top-2.5 right-2 inline-flex size-control cursor-pointer items-center justify-center rounded-control text-muted hover:bg-sea-light hover:text-sea focus-visible:outline-3 focus-visible:outline-sea focus-visible:-outline-offset-3" aria-label="Cerrar buscador"><X size={20} strokeWidth={1.5} aria-hidden="true" /></DialogClose>}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="dialog-header" className={className} {...props} />;
}
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={className} {...props} />;
}
function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description data-slot="dialog-description" className={className} {...props} />;
}

export { Dialog, DialogTrigger, DialogClose, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogDescription };

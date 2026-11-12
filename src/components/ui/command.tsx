// shadcn/ui Command (cmdk + Base UI Dialog), styled with the project's tokens.
import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return <CommandPrimitive data-slot="command" className={cn('flex min-h-0 flex-col overflow-hidden [&_[hidden]]:hidden!', className)} {...props} />;
}
function CommandDialog({
  title = 'Buscar páginas', description = 'Busca entre las notas de coruña.fyi.',
  children, className, showCloseButton = true, contentProps, ...props
}: Omit<React.ComponentProps<typeof Dialog>, 'children'> & {
  title?: string; description?: string; children: React.ReactNode; className?: string;
  showCloseButton?: boolean; contentProps?: Omit<React.ComponentProps<typeof DialogContent>, 'children'>;
}) {
  return (
    <Dialog {...props}>
      <DialogContent {...contentProps} className={cn('top-[min(18vh,128px)] max-h-[calc(100dvh_-_min(18vh,128px)_-_24px)] translate-y-0 max-sm:top-6 max-sm:max-h-[calc(100dvh_-_48px)]', className)} showCloseButton={showCloseButton}>
        <DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return <div data-slot="command-input-wrapper" className="flex items-center gap-3 border-b border-line py-3 pr-15 pl-5 text-sea max-sm:gap-2 max-sm:pl-4 [&>svg]:shrink-0"><Search size={20} strokeWidth={1.5} aria-hidden="true" /><CommandPrimitive.Input data-slot="command-input" className={cn('min-h-10 w-full min-w-0 border-0 bg-transparent font-body text-md leading-[1.5] text-ink outline-none placeholder:text-muted max-sm:text-base', className)} {...props} /></div>;
}
function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn('max-h-[min(50dvh,440px)] scroll-p-2 overflow-x-hidden overflow-y-auto overscroll-contain p-2 outline-none max-sm:max-h-[min(55dvh,440px)]', className)} {...props} />;
}
function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className={cn('px-5 py-10 text-center text-sm [&_span]:mt-2 [&_span]:block [&_span]:text-label [&_span]:text-muted', className)} {...props} />;
}
function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return <CommandPrimitive.Group data-slot="command-group" className={cn('[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-4 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:text-meta [&_[cmdk-group-heading]]:font-[550] [&_[cmdk-group-heading]]:tracking-eyebrow [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:uppercase', className)} {...props} />;
}
function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return <CommandPrimitive.Item data-slot="command-item" className={cn('relative flex min-h-14 cursor-pointer items-center gap-3 rounded-control px-3 py-2.5 text-sm text-ink outline-none select-none data-[selected=true]:bg-sea-light data-[selected=true]:text-sea data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&>svg]:shrink-0 [&>svg]:text-sea', className)} {...props} />;
}
function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn('h-px bg-line', className)} {...props} />;
}
function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span data-slot="command-shortcut" className={cn('ml-auto text-meta text-muted', className)} {...props} />;
}
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut };

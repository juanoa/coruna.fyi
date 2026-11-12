import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Building2, Compass, FileText, Home, Landmark, Search } from 'lucide-react';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { filterPage, type SearchPage } from '../data/search';

const groups: SearchPage['group'][] = ['General', 'Lugares', 'Barrios', 'Rutas'];
const groupIcons = { General: FileText, Lugares: Landmark, Barrios: Building2, Rutas: Compass };
const keyClasses = 'inline-flex min-h-6 items-center justify-center whitespace-nowrap rounded-tag border border-line bg-paper px-1.5 py-0.5 font-body text-meta font-normal leading-none';

export default function SiteSearch({ searchPages }: { searchPages: SearchPage[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [shortcut, setShortcut] = useState('⌘ K');
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function changeOpen(next: boolean) {
    if (next) setQuery('');
    setOpen(next);
  }

  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad|iPod/.test(navigator.platform) ? '⌘ K' : 'Ctrl K');
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !event.repeat && !event.isComposing) {
        event.preventDefault();
        setOpen((current) => !current);
        setQuery('');
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <button ref={triggerRef} type="button" className="inline-flex min-h-control w-60 cursor-pointer items-center gap-2 rounded-control border border-line bg-surface px-2 py-1.5 font-body text-label text-muted hover:border-sea hover:text-sea focus-visible:outline-3 focus-visible:outline-sea focus-visible:outline-offset-5 max-sm:size-control max-sm:justify-center max-sm:p-0" onClick={() => changeOpen(true)} aria-label="Buscar páginas" aria-haspopup="dialog" aria-expanded={open} aria-keyshortcuts="Meta+K Control+K">
        <Search size={16} strokeWidth={1} aria-hidden="true" />
        <span className="max-sm:hidden">Buscar en la web</span>
        <kbd className={`${keyClasses} ml-auto max-sm:hidden`} aria-hidden="true">{shortcut}</kbd>
      </button>
      <CommandDialog open={open} onOpenChange={changeOpen} contentProps={{ initialFocus: inputRef, finalFocus: triggerRef }}>
        <Command label="Páginas de coruña.fyi" filter={filterPage}>
          <CommandInput ref={inputRef} value={query} onValueChange={setQuery} placeholder="Buscar un lugar, barrio o página…" aria-label="Buscar un lugar, barrio o página" autoComplete="off" autoCorrect="off" spellCheck={false} />
          <CommandList label="Resultados de búsqueda">
            <CommandEmpty>No se han encontrado páginas.<span>Prueba con otro nombre.</span></CommandEmpty>
            {groups.map((group) => <CommandGroup key={group} heading={group}>
              {searchPages.filter((page) => page.group === group).map((page) => {
                const PageIcon = page.href === '/' ? Home : groupIcons[group];
                return <CommandItem key={page.href} value={page.href} keywords={[page.title, ...page.keywords]} onSelect={() => { setOpen(false); window.location.assign(page.href); }}>
                  <PageIcon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span className="flex min-w-0 flex-col gap-0.75"><span>{page.title}</span><span className="text-meta text-muted [overflow-wrap:anywhere]">{page.href}</span></span>
                  <ArrowUpRight size={16} strokeWidth={1} className="ml-auto" aria-hidden="true" />
                </CommandItem>;
              })}
            </CommandGroup>)}
          </CommandList>
        </Command>
        <div className="flex shrink-0 flex-wrap items-center gap-4 border-t border-line bg-paper px-5 py-3 text-meta text-muted max-sm:gap-3 max-sm:px-4 [&>span]:flex [&>span]:items-center [&>span]:gap-1.5" aria-hidden="true"><span><kbd className={keyClasses}>↑</kbd><kbd className={keyClasses}>↓</kbd> navegar</span><span><kbd className={keyClasses}>↵</kbd> abrir</span><span><kbd className={keyClasses}>esc</kbd> cerrar</span></div>
      </CommandDialog>
    </>
  );
}

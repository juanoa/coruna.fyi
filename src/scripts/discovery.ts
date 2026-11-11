  const mapPlaces = [...document.querySelectorAll<HTMLButtonElement>('[data-map-place]')];
  function selectPlace(button: HTMLButtonElement) {
    mapPlaces.forEach((place) => {
      place.setAttribute('aria-pressed', String(place === button));
    });
    document.querySelectorAll<SVGElement>('[data-map-marker]').forEach((marker) => {
      const active = marker.dataset.mapMarker === button.dataset.mapPlace;
      marker.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('[data-map-description]')!.textContent = button.dataset.description!;
  }
  mapPlaces.forEach((button) => button.addEventListener('click', () => selectPlace(button)));
  document.querySelectorAll<SVGElement>('[data-map-marker]').forEach((marker) => {
    const select = () => {
      const place = mapPlaces.find((place) => place.dataset.mapPlace === marker.dataset.mapMarker);
      if (place) selectPlace(place);
    };
    marker.addEventListener('click', select);
    marker.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select();
      }
    });
  });
  document.querySelectorAll<HTMLButtonElement>('[data-map-filter]').forEach((button) =>
    button.addEventListener('click', () => {
      const filter = button.dataset.mapFilter;
      document.querySelectorAll<HTMLButtonElement>('[data-map-filter]').forEach((control) => {
        control.setAttribute('aria-pressed', String(control === button));
      });
      mapPlaces.forEach((place) => {
        const hidden = filter !== 'all' && place.dataset.category !== filter;
        place.hidden = hidden;
        const marker = document.querySelector<SVGElement>(`[data-map-marker="${place.dataset.mapPlace}"]`);
        if (marker) marker.setAttribute('data-hidden', String(hidden));
      });
      const selected = mapPlaces.find((place) => place.getAttribute('aria-pressed') === 'true');
      if (selected?.hidden) {
        const first = mapPlaces.find((place) => !place.hidden);
        if (first) selectPlace(first);
      }
    }),
  );

  const wordButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-word-trigger]')];
  function closeWords() {
    wordButtons.forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      document.getElementById(button.getAttribute('aria-controls')!)!.hidden = true;
    });
  }
  wordButtons.forEach((button) =>
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      closeWords();
      if (!open) return;
      button.setAttribute('aria-expanded', 'true');
      const definition = document.getElementById(button.getAttribute('aria-controls')!)!;
      definition.hidden = false;
      definition.dataset.align = 'start';
      const bounds = definition.getBoundingClientRect();
      if (bounds.right > window.innerWidth - 20) definition.dataset.align = 'end';
    }),
  );
  document.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('[data-galician-word]')) closeWords();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeWords();
  });

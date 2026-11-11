import type { iconography } from './iconography';

export interface HomeStory {
  id: string;
  href: string;
  section: 'lugares' | 'barrios' | 'rutas';
  image: string;
  alt: string;
  category: keyof typeof iconography;
  categoryLabel: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  body: string;
  stops: string[];
}

// Contenido de muestra para la guía y las exploraciones de portada.
export const stories: HomeStory[] = [
  {
    id: 'torre', href: '/torre-de-hercules/', section: 'lugares', image: '/images/torre.jpg', alt: 'La Torre de Hércules sobre los acantilados y el Atlántico',
    category: 'monuments', categoryLabel: 'Monumentos', title: 'Torre de Hércules',
    description: 'El faro y su entorno: senderos costeros, acantilados y vistas al Atlántico.',
    location: 'A Torre · Monte Alto', duration: 'Un paseo de 2 horas',
    body: 'Empieza junto al mar y deja que el faro marque el rumbo. Esta propuesta rodea la península de la Torre entre senderos, pequeñas calas y lugares donde sentarse a mirar. No hace falta subir para disfrutar del paisaje: el paseo ya es un buen motivo para venir.',
    stops: ['Empezar en la playa de As Lapas', 'Rodear la Torre por los senderos costeros', 'Terminar entre los Menhires pola Paz'],
  },
  {
    id: 'riazor', href: '/riazor-y-orzan/', section: 'lugares', image: '/images/riazor.jpg', alt: 'La curva de la playa de Riazor junto a los edificios de la ciudad',
    category: 'sea', categoryLabel: 'Mar y playas', title: 'Riazor y Orzán',
    description: 'Las playas del centro y el paseo marítimo que recorre la ensenada.',
    location: 'Riazor · Orzán', duration: 'Un paseo de 1 hora',
    body: 'Hay quien viene a correr, quien trae un libro y quien solo necesita un rato de horizonte. Nuestro plan empieza en Riazor y sigue el paseo hasta el Orzán. Si el día acompaña, baja a la arena; si sopla el viento, busca un café y disfruta de la ciudad desde dentro.',
    stops: ['Bajar hasta el paseo de Riazor', 'Caminar junto a la ensenada del Orzán', 'Hacer una pausa en las calles del centro'],
  },
  {
    id: 'mesa', href: '/pulpo-a-feira/', section: 'lugares', image: '/images/polbo.jpg', alt: 'Pulpo a la gallega con aceite, pimentón y patatas',
    category: 'dining', categoryLabel: 'Gastronomía', title: 'Pulpo á feira',
    description: 'Pulpo con aceite y pimentón: una de las especialidades de la cocina gallega.',
    location: 'Pescadería', duration: 'Comida o cena',
    body: 'Una mesa compartida también puede ser el principio de una visita. En esta ruta de muestra proponemos entrar en Pescadería, pasear por sus calles y dejar sitio para los sabores de aquí. El pulpo es una buena excusa; quedarse conversando es parte del plan.',
    stops: ['Pasear por las calles de Pescadería', 'Compartir una ración de pulpo á feira', 'Dejar un hueco para el postre y la conversación'],
  },
  {
    id: 'menhires', href: '/menhires-pola-paz/', section: 'lugares', image: '/images/menhires.jpg', alt: 'Menhires de piedra junto al mar en el parque de la Torre',
    category: 'walks', categoryLabel: 'Paseos', title: 'Menhires pola Paz',
    description: 'Un conjunto de esculturas junto al mar, en el parque de la Torre.',
    location: 'Parque de la Torre', duration: 'Un paseo de 45 minutos',
    body: 'Hay un lado de la ciudad que se descubre caminando despacio. Los senderos del parque de la Torre conectan espacios abiertos, esculturas y vistas al mar. Esta propuesta es una invitación a salir con tiempo, elegir un camino y hacer una pausa cuando apetezca.',
    stops: ['Entrar al parque desde el entorno de la Torre', 'Acercarse a los Menhires pola Paz', 'Volver siguiendo el paisaje costero'],
  },
  {
    id: 'vella', href: '/cidade-vella/', section: 'barrios', image: '/images/san-carlos.jpg', alt: 'Piedra tallada entre los árboles del jardín de San Carlos en la Cidade Vella',
    category: 'history', categoryLabel: 'Barrios', title: 'Cidade Vella',
    description: 'El casco antiguo de A Coruña: plazas, calles de piedra y el jardín de San Carlos.',
    location: 'Cidade Vella', duration: 'Un paseo de 2 horas',
    body: 'Empieza en San Xurxo, cruza María Pita y sigue hacia la Cidade Vella. La escala cambia: aparecen plazas recogidas, calles de piedra y rincones para detenerse. La propuesta termina en San Carlos, con un rato de sombra y otra mirada sobre el puerto.',
    stops: ['Mirar hacia arriba en San Xurxo', 'Cruzar María Pita hacia la Cidade Vella', 'Descansar en el jardín de San Carlos'],
  },
  {
    id: 'marina', href: '/a-marina/', section: 'lugares', image: '/images/marina.jpg', alt: 'Las galerías de A Mariña iluminadas frente al puerto al anochecer',
    category: 'port', categoryLabel: 'Puerto', title: 'A Mariña',
    description: 'Las galerías acristaladas y el paseo frente al puerto de A Coruña.',
    location: 'A Mariña', duration: 'Un paseo al atardecer',
    body: 'De día, las galerías recogen la luz. Al caer la tarde, sus ventanas cambian el paisaje del puerto. Este es un plan sencillo: caminar por A Mariña, mirar los reflejos y volver hacia María Pita cuando empiece a apetecer una mesa.',
    stops: ['Pasear junto a las galerías de A Mariña', 'Parar a mirar el puerto', 'Volver por María Pita'],
  },
];

export const neighborhoods: HomeStory[] = [
  stories.find((story) => story.id === 'vella')!,
  {
    id: 'monte-alto', href: '/monte-alto/', section: 'barrios', title: 'Monte Alto',
    image: '/images/torre.jpg', alt: 'La Torre de Hércules y la costa junto a Monte Alto',
    category: 'neighborhoods', categoryLabel: 'Barrios',
    description: 'Un barrio al norte de la península, junto a la Torre de Hércules y la costa.',
    location: 'Monte Alto', duration: 'Un paseo de 2 horas',
    body: 'Monte Alto combina calles residenciales con accesos al litoral y al parque de la Torre. Este recorrido de muestra conecta el barrio con el entorno del faro y la playa de As Lapas.',
    stops: ['Recorrer las calles de Monte Alto', 'Acercarse al parque de la Torre', 'Terminar junto a la playa de As Lapas'],
  },
  {
    id: 'pescaderia', href: '/pescaderia/', section: 'barrios', title: 'Pescadería',
    image: '/images/polbo.jpg', alt: 'Pulpo á feira servido en una mesa',
    category: 'neighborhoods', categoryLabel: 'Barrios',
    description: 'Calles comerciales, bares y restaurantes entre el puerto y las playas del centro.',
    location: 'Pescadería', duration: 'Un paseo de 1 hora',
    body: 'Pescadería ocupa la zona entre el puerto y la ensenada del Orzán. En esta propuesta de muestra, un paseo por sus calles sirve para conocer el centro y hacer una parada para comer.',
    stops: ['Empezar junto a A Mariña', 'Recorrer las calles de Pescadería', 'Continuar hacia el Orzán'],
  },
];

export const towerRoute: HomeStory = {
  id: 'ruta-torre', href: '/torre-de-hercules-y-menhires/', section: 'rutas',
  title: 'Torre de Hércules y Menhires',
  image: '/images/menhires.jpg', alt: 'Los Menhires pola Paz junto a los senderos costeros del parque de la Torre',
  category: 'routes', categoryLabel: 'Rutas a pie',
  description: 'Un recorrido por As Lapas, la Torre de Hércules y los Menhires pola Paz.',
  location: 'Parque de la Torre', duration: '2 horas aproximadamente',
  body: 'Esta ruta de muestra comienza en la playa de As Lapas, continúa por el entorno de la Torre de Hércules y termina en los Menhires pola Paz. El recorrido se realiza por los senderos del parque y permite conocer varios puntos de la costa en una mañana.',
  stops: ['As Lapas: comenzar junto a la playa', 'Torre de Hércules: recorrer el entorno del faro', 'Menhires pola Paz: terminar junto a las esculturas'],
};

// Cidade Vella aparece también en la selección de portada; cada URL se genera una vez.
export const guideEntries = [...new Map([...stories, ...neighborhoods, towerRoute].map((entry) => [entry.href, entry])).values()];

export function getStory(id: string): HomeStory {
  const story = stories.find((item) => item.id === id);
  if (!story) throw new Error(`Historia de muestra desconocida: ${id}`);
  return story;
}

export const homeVariants = [
  { number: 1, name: 'La editorial', description: 'Una bienvenida con carácter. El lugar y las historias abren la puerta.' },
  { number: 2, name: 'Tu próximo plan', description: 'Una guía práctica. Primero eliges qué te apetece; después, dónde ir.' },
  { number: 3, name: 'El cuaderno', description: 'Una mirada de barrio. Fotografía, pequeñas historias y tiempo para leer.' },
];

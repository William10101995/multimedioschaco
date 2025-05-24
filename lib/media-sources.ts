export interface MediaSource {
  id: string;
  name: string;
  type: "radio" | "tv" | "streaming";
  url: string;
  description?: string;
}

export const defaultMediaSources: MediaSource[] = [
  // Radios
  {
    id: "radio-provincia",
    name: "Radio Provincia 101.5 FM",
    type: "radio",
    url: "https://debred5.ecomchaco.com.ar:8443/radioecom",
    description: "Radio Provincia del Chaco - FM 101.5",
  },
  {
    id: "radio-libertad",
    name: "Radio Libertad 99.1 FM",
    type: "radio",
    url: "https://cdn.instream.audio:9570/stream",
    description: "Radio Libertad - FM 99.1",
  },
  {
    id: "radio-natalaga",
    name: "Radio Natalaga 94.7 FM",
    type: "radio",
    url: "https://radio02.ferozo.com/proxy/ra01000458?mp=/stream",
    description: "Radio Natalaga - FM 94.7",
  },
  {
    id: "radio-alerta-urbana",
    name: "Radio Gualamba 101.3 FM",
    type: "radio",
    url: "https://ssl.radiosnethosting.com/index.php?port=9072/;stream.mp3",
    description: "Alerta Urbana - Radio Gualamba FM 101.3",
  },
  {
    id: "radio-JW",
    name: "La Radio 104.7 FM",
    type: "radio",
    url: "https://server.laradio.online/proxy/laradio1047?mp=/stream",
    description: "Radio de Julio Wajcman - FM 104.7",
  },
  {
    id: "radio-ciudad",
    name: "Radio Ciudad 92.3 FM",
    type: "radio",
    url: "https://turadioenvivo.com/proxy/radiociudad/stream?1747709895452",
    description: "Radio Ciudad - FM 92.3",
  },
  {
    id: "radio-facundo-quiroga",
    name: "Radio Facundo Quiroga 95.9 FM",
    type: "radio",
    url: "https://arcast.com.ar:9522/stream",
    description: "Radio Facundo Quiroga - FM 95.9",
  },
  {
    id: "radio-10",
    name: "Radio 10 92.9 FM",
    type: "radio",
    url: "https://01.solumedia.com.ar:9066/stream",
    description: "Radio 10 - FM 92.9",
  },
  {
    id: "radio-rivadavia",
    name: "Radio Rivadavia 88.1 FM",
    type: "radio",
    url: "https://01.solumedia.com.ar:9070/stream",
    description: "Radio Rivadavia - FM 88.1",
  },
  {
    id: "radio-universidad",
    name: "Radio Universidad 91.1 FM",
    type: "radio",
    url: "https://01.solumedia.com.ar:8336/stream",
    description: "Radio Universidad - FM 91.1",
  },
  {
    id: "radio-sembradora",
    name: "Radio Sembradora 93.1 FM",
    type: "radio",
    url: "https://stream-172.zeno.fm/vwtau7x7ytzuv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJ2d3RhdTd4N3l0enV2IiwiaG9zdCI6InN0cmVhbS0xNzIuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IlVxY0FFQ05QUTdpRW40QzZEc3p4Z2ciLCJpYXQiOjE3NDc3NjM1NzcsImV4cCI6MTc0Nzc2MzYzN30.9hM4ShGnqKsq6NkiwHbmA9aVLoEEC7OfHtBR7gYF2bs&1747763577680",
    description: "Radio Sembradora - Colonia Benítez",
  },
  {
    id: "radio-9de-julio",
    name: "Radio 9 de Julio 102.3 FM",
    type: "radio",
    url: "https://stream.zeno.fm/bkou0c5ohbtuv",
    description: "Radio 9 de Julio - Tres Isletas",
  },
  {
    id: "radio-argentina",
    name: "Radio Argentina 91.3 FM",
    type: "radio",
    url: "https://ssl.radiosnethosting.com/index.php?port=9358/;stream.mp3",
    description: "Radio Argentina - FM 91.3",
  },
  {
    id: "radio-noticias-del-parana",
    name: "Radio Noticias del Paraná",
    type: "radio",
    url: "https://fdsfdsfdsf.radio12345.com/intro.mp3?1747978787450",
    description: "Radio Noticias del Paraná",
  },
  {
    id: "radio-la-red",
    name: "Radio La Red 92.9 FM",
    type: "radio",
    url: "https://turadioenvivo.com/proxy/saenzp/stream?1747979202275",
    description: "Radio La Red - Presidencia Roque Sáenz Peña",
  },
  {
    id: "radio-portico",
    name: "Radio Pórtico 105.5 FM",
    type: "radio",
    url: "https://sonic.host-live.com:8444/stream.aac",
    description: "Radio Pórtico - Juan José Castelli",
  },
  {
    id: "radio-multimedios-ciudad",
    name: "Multimedios Ciudad 100.5 FM",
    type: "radio",
    url: "https://streaming.radiosenlinea.com.ar:10973/stream?icy=http",
    description: "Multimedios Ciudad - Presidencia Roque Sáenz Peña",
  },
  {
    id: "radio-municipal",
    name: "Radio Municipal 87.9 FM",
    type: "radio",
    url: "https://ssl.radiosnethosting.com/index.php?port=9594",
    description: "Radio Municipal - Villa Ángela",
  },
  {
    id: "radio-sudoeste",
    name: "Radio Sudoeste 103.1 FM",
    type: "radio",
    url: "http://www.genexservicios.com:8092/stream/1/;",
    description: "Radio Sudoeste - Charata",
  },

  // TV
  {
    id: "somos-uno-tv",
    name: "Somos Uno TV",
    type: "tv",
    url: "https://wowzasrv.chaco.gov.ar/Streamtv/chacotv/playlist.m3u8",
    description: "Canal oficial de la Provincia del Chaco",
  },
  {
    id: "ng-federal",
    name: "Norte Grande Federal",
    type: "tv",
    url: "https://617c5175c970b.streamlock.net:4444/tvlink/live/chunklist_w360616744.m3u8",
    description: "Norte Grande Federal - Canal de noticias",
  },
  {
    id: "ciudad-tv",
    name: "Ciudad TV Resistencia",
    type: "tv",
    url: "https://617c5175c970b.streamlock.net:4444/chacodxdtv/livenew/chunklist_w1342135396.m3u8",
    description: "Ciudad TV Resistencia en vivo",
  },
  {
    id: "stc-tv",
    name: "STC Presidencia Roque Sáenz Peña",
    type: "tv",
    url: "https://genexservicios.com:19360/sudoestetv/sudoestetv.m3u8",
    description: "Sudoeste Televisora Color - Canal 2",
  },

  // Streaming
  {
    id: "che-chaco",
    name: "Che Chaco",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCGqjzzsxTgs2Ta1dYYwKi4g&autoplay=1",
    description: "Che Chaco - Canal de noticias y entretenimiento",
  },
  {
    id: "che-corrientes",
    name: "Che Corrientes",
    type: "streaming",
    url: "https://www.youtube.com/embed/N2bn_XWu7hA?si=pWlC7AGjq1DdsQfd",
    description: "Che Corrientes - Canal de noticias y entretenimiento",
  },
  {
    id: "datachaco",
    name: "Data Chaco Streaming",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UC9__9QhrT8ggoCoFUUmciQQ&autoplay=1",
    description: "Data Chaco - Canal de noticias y entretenimiento",
  },
  {
    id: "chaco-tv",
    name: "Chaco TV Streaming",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCyjxc5sEXT3-484a_69OFXQ&autoplay=1",
    description: "Chaco TV - Canal de noticias y entretenimiento",
  },
  {
    id: "afuera",
    name: "Afuera!",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCK9etlP6wx_HMgkmQuYh1gA&autoplay=1",
    description: "Afuera! - Liberttoons",
  },
  {
    id: "legislatura-chaco",
    name: "Poder Legislativo del Chaco",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCQ0qn9ILr5BXj5Pw0x32bLA&autoplay=1",
    description: "Transmisiones en vivo de la Legislatura del Chaco",
  },
  {
    id: "sise-argentina",
    name: "Camaras del Puente Chaco-Corrientes",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UC2RkL2eATR1V6H8g4eNfA5Q&autoplay=1",
    description: "Camaras del Puente Chaco-Corrientes",
  },
  {
    id: "noticiero-9",
    name: "Canal 9 Chaco",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCvcfdYwgndfgIqzJw79GlUw&autoplay=1",
    description: "Noticiero 9 - Canal 9 Chaco",
  },
  {
    id: "multimedios-ciudad",
    name: "Multimedios Ciudad",
    type: "streaming",
    url: "https://www.youtube.com/embed/live_stream?channel=UCE8whPomb-u52ToG2Qr0sJg&autoplay=1",
    description: "Multimedios Ciudad - Presidencia Roque Sáenz Peña",
  },
];

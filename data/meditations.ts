import { ImageSourcePropType } from 'react-native'

export interface Meditation {
  /* Unique id of the meditation */
  id: string
  /* Title of the meditation */
  title: string
  /* Description of the meditation */
  subtitle: string
  /* How long is the meditation in minutes */
  time: number
  /* when the meditation becomes available */
  release_date: string
  /* The order of the meditation in the list */
  order: number
  /* URL of the image to show */
  image: string
  /* URI of the audio file */
  uri: string
  /* Track ID from the back-end */
  track: number
  /* Task from the back-end */
  task: string
}
export interface MeditationItem {
  item: Meditation
}


export const miesiaca: Meditation[] = [
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e321',
    order: 31,
    track: 31,
    title: "Koherencja Serca",
    subtitle: "Spokój",
    time: 5,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/05/koherencja-e-book-1.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/e-book/praktyka_5.mp3"
  },
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e322',
    order: 32,
    track: 32,
    title: "20 oddechów oczyszczających",
    subtitle: "Rozluźnienie",
    time: 6,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/05/szybka-redukcja-stresu-pr.-oddechowa-1.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/e-book/praktyka_7.mp3"
  }, 
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e323',
    order: 33,
    track: 33,
    title: "Medytacja góry",
    subtitle: "Uważność",
    time: 6,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/05/szybka-redukcja-stresu-pr.-oddechowa-1.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/e-book/praktyka_9.mp3"
  }
]

export const relaksacje: Meditation[] = [
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e324',
    order: 34,
    track: 34,
    title: "Rozluźnienie",
    subtitle: "Odpoczynek",
    time: 40,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/04/Rozluźnienie.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/e-book/praktyka_2.mp3"
  },
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e328',
    order: 34,
    track: 34,
    title: "Na poczucie bezpieczeństwa",
    subtitle: "Dbanie o siebie",
    time: 40,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/04/Joga-nidra-0422-3.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/nowenidry/poczucie_bezpieczenstwa.mp3"
  },
  {
    id: "ff171f80-5960-41e7-965c-1f9bcf31e105",
    order: 5,
    track: 25,
    title: "Na zmęczenie fizyczne",
    subtitle: "Odpoczynek",
    time: 35,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/oddech-3-częściowy-praktyka-oddechowa.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/czas_na_spokoj/Zmeczenie_fizyczne_2.mp3"
  },
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e019',
    order: 19,
    track: 19,
    title: "Na sen",
    subtitle: "Sen",
    time: 39,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/na-sen-relaksacja.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/medytacja_na_sen.mp3"
  },
]

export const praktyki_oddechowe: Meditation[] = [
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e541',
    order: 41,
    track: 41,
    title: "Technika natychmiastowej redukcji stresu",
    subtitle: "Stres",
    time: 4,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/04/szybka-redukcja-stresu-pr.-oddechowa.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/e-book/praktyka_1.mp3"
  },
  {
    id: "ff171f80-5960-41e7-965c-1f9bcf31e103",
    order: 3,
    track: 23,
    title: "Uważny oddech",
    subtitle: "Oddychanie",
    time: 13,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/uważny-oddech-praktyka-oddechowa.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/czas_na_spokoj/Uwazny_oddech.mp3"
  },
  {
    id: "ff171f80-5960-41e7-965c-1f9bcf31e104",
    order: 4,
    track: 24,
    title: "Oddech trzyczęściowy",
    subtitle: "Oddychanie",
    time: 9,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/oddech-3-częściowy-praktyka-oddechowa.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/czas_na_spokoj/Oddech_3-czesciowy.mp3"
  },
]


export const medytacje: Meditation[] = [
  {
    id: 'ff171f80-5960-41e7-965c-1f9bcf31e021',
    order: 1,
    track: 1,
    title: "Życzliwości",
    subtitle: "Dbanie o siebie",
    time: 16,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/życzliwości.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/Medytacja_zyczliwosci.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e022',
    order: 2,
  track: 2,
    title: "Czułości dla siebie",
  subtitle: "Dbanie o siebie",
    time: 5,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/czułości-dla-siebie.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Medytacje/Medytacja_czulosci_dla_siebie.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e024',
    order: 4,
  track: 4,
    title: "Na początek dnia",
  subtitle: "Dbanie o siebie",
    time: 15,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/na-początek-dnia.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/Medytacja_na_poczatek_dnia.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e025',
    order: 5,
  track: 5,
    title: "Na koniec dnia",
  subtitle: "Dbanie o siebie",
    time: 15,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/na-koniec-dnia.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/Medytacja_na_koniec_dnia.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e026',
    order: 6,
  track: 6,
    title: "Wdzięczność 1",
  subtitle: "Dbanie o siebie",
    time: 11,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/wdzięczność-2.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Wdziecznosc/wdziecznosc_2.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e027',
    order: 7,
  track: 7,
    title: "Wdzięczność do ciała",
  subtitle: "Dbanie o siebie",
    time: 11,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/wdzięczność-do-ciała.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Wdziecznosc/wdziecznosc_do_ciala.mp3"
  },
   {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e028',
    order: 8,
  track: 8,
    title: "Odzyskiwanie siły",
  subtitle: "Siła",
    time: 10,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/odzyskiwanie-siły.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Odzyskiwanie_sily.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e029',
    order: 9,
  track: 9,
    title: "Odzyskiwanie sprawczości",
  subtitle: "Siła",
    time: 10,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/odzyskiwanie-sprawczości.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Odzyskiwanie_sprawczosci.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e010',
    order: 10,
  track: 10,
    title: "Odzyskiwanie spokoju",
  subtitle: "Spokój",
    time: 11,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/odzyskiwanie-spokoju.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Odzyskiwanie_spokoju.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e011',
    order: 11,
  track: 11,
    title: "Wdzięczność 2",
  subtitle: "Dbanie o siebie",
    time: 11,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/wdzięczność-2.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Wdziecznosc/wdziecznosc_3.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e012',
    order: 12,
  track: 12,
    title: "Uwalnianie myśli",
  subtitle: "Stres",
    time: 11,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/uwalnianie-myśli.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Uwalnianie_mysli.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e013',
    order: 13,
  track: 13,
    title: "Uwalnianie uczuć",
  subtitle: "Stres",
    time: 12,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/uwalnianie-uczuć.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Uwalnianie_uczuc.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e014',
    order: 14,
  track: 14,
    title: "Uwalnianie napięć",
  subtitle: "Stres",
    time: 13,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/uwalnianie-napięć.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/S.O.S./Uwalnianie_napiec.mp3"
  },
  {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e015',
     order: 15,
  track: 15,
     title: "Łagodząca stres",
  subtitle: "Stres",
     time: 16,
     image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/łagodząca-stres.png",
     uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/Medytacja_lagodzaca_stres.mp3"
   },
   {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e016',
     order: 16,
  track: 16,
     title: "Jeziora",
  subtitle: "Uważność",
     time: 13,
     image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/jeziora.png",
     uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Na_prezent/Medytacja_jeziora.mp3"
   },
   {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e017',
     order: 17,
  track: 17,
     title: "Z olejkami eterycznymi",
  subtitle: "Uważność",
     time: 7,
     image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/z-olejkami-eterycznymi.png",
     uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Medytacje/Medytacja_z_olejkami.mp3"
   },
   {
     id: 'ff171f80-5960-41e7-965c-1f9bcf31e018',
     order: 18,
  track: 18,
     title: "Uważny spacer",
  subtitle: "Uważność",
     time: 15,
     image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/uważny-spacer.png",
     uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/Medytacje/Medytacyjny_spacer.mp3"
   },
]

export const kurs: Meditation[] = [
  {
    id: "ff171f80-5960-41e7-965c-1f9bcf31e101",
    order: 1,
    track: 21,
    title: "Koncentracja 1",
    subtitle: "Koncentracja",
    time: 16,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/koncentracja.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/czas_na_spokoj/Koncentracja_1.mp3"
  },
  {
       id: "ff171f80-5960-41e7-965c-1f9bcf31e102",
    order: 2,
  track: 22,
    title: "Intencja 1",
  subtitle: "Intencja",
    time: 21,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/intencja.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/czas_na_spokoj/Intencja_-_praktyka_1.mp3"
  },
]

export const lekcje: Meditation[] = [
  {
    id: "ff171f80-5960-41e7-965c-1f9bcf31e201",
    order: 31,
    track: 31,
    title: "Instrukcja S.O.S.",
    subtitle: "Stres",
    time: 19,
    image: "https://szkolaspokoju.pl/wp-content/uploads/2022/03/Instrukcja-s.o.s.-lekcja-audio.png",
    uri: "https://szkolaspokoju.pl/wp-content/uploads/aplikacja/s.o.s/instrukcja_s.o.s.mp3"
  },
]

export const meditations = {}

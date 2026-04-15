export interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface SurveyData {
  nama: string;
  instansi: string;
  tampilan_produk: string;
  tampilan_stand: string;
  penjelasan_produk: string;
  hiburan: string;
  kritik_saran: string;
}

export interface ApiResponse {
  reply_html: string;
  reply: string;
  debug?: unknown;
}

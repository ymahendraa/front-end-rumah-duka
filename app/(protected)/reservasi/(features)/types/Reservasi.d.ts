import { TODO } from "@/types/todo";
import { DetailTambahan } from "./DetailTambahan";

export type Reservasi = {
  id_reservasi: string | number;
  kremasi_id: string | number;
  nama_lengkap: string;
  no_reservation: string;
  pemohon_id: string | number;
  reservation_date: string;
  room_id: string | number;
  screenshot?: string;
  status?: string;
  detail_barang?: DetailTambahan[];
  dokumen?: TODO;
  sum_total?: string | number;
};

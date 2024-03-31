type Almarhum = {
  id_almarhum: string;
  nama_almarhum: string;
  tempat_meninggal: string;
};

type Reservasi = {
  no_ruangan: string;
  category_room: string;
  no_ruangan_kremasi: string;
  nama_ruangan_kremasi: string;
  bukti_tf: File | string;
};

type Document = {
  file: File | string;
};

type Customer = {
  id_customer: string;
  nik: string;
  name: string;
  jenis_pekerjaan: string;
  hub_jenazah: string;
  almarhum?: Almarhum;
  reservasi?: Reservasi;
  document?: Document;
};

export type { Customer };

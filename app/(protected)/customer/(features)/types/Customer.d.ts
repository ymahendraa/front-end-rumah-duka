export type ReceivedCustomer = {
  id: string;
  nik: string;
  name: string;
  hub_almarhum: string;
  pekerjaan: string;
  almarhum: {
    nama_almarhum: string;
    umur_almarhum: string;
    jenis_pekerjaan_almarhum: string;
    alamat_almarhum: string;
    diagnosa: string;
    tanggal_meninggal: string;
    tempat_meninggal: string;
    document: File | string;
    documentDetail?: any;
  };
  reservasi: {
    no_ruangan: string;
    no_ruangan_kremasi: string;
    status_transaksi: string;
    reservation_date: string;
    screenshow?: File | string;
    screenshotDetail?: any;
  };
};

export type SendCustomer = {
  nik: string;
  nama_lengkap_pemohon: string;
  jenis_pekerjaan: string;
  alamat: string;
  hub_almarhum: string;
  nama_lengkap_almarhum: string;
  umur: string;
  jenis_kelamin: "Pria" | "Wanita";
  riwayat_pekerjaan: string;
  alamat_almarhum: string;
  tgl_waktu_meninggal: string;
  tempat_meninggal: string;
  diagnosa: string;
  no_room: string;
  no_kremasi: string;
  status: string;
  reservation_date: string;
  screenshot?: File | string;
  document: File | string;
  screenshotDetail?: any;
  documentDetail?: any;
};

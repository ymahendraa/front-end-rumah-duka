import ImageKit from "imagekit";

export const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL || "",
});

export const getImageDetail = async (fileId: string) => {
  return new Promise((resolve, reject) => {
    imageKit.getFileDetails(fileId, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
        // console.log(result)
      }
    });
  });
};

import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

import addIcon from '@/../public/assets/images/icons/add.svg';
import uploadIcon from '@/../public/assets/images/icons/upload.svg';

import styles from './styles.module.scss';

interface ImageFile extends File {
  preview: string;
}

interface IDropImage {
  image : ImageFile | null;
  setImage: (image: ImageFile | null) => void;
}

const DragAndDropImage: FC<IDropImage> = ({ image, setImage }) => {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    multiple: false,
  });

  return (
    <div className={styles.drop_image}>
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <div className={styles.drop_content}>
          <div className={styles.upload_icon_wrapper}>
            <img src={uploadIcon.src} alt="icon" className={styles.upload_icon} />
          </div>
          <p>Drop an image here</p>
        </div>
      </div>

      {image && (
        <div className={styles.preview}>
          <img src={addIcon.src} alt="icon" className={styles.delete_icon} onClick={() => setImage(null)}/>
          <img src={image.preview} alt="Preview" className={styles.image} />
        </div>
      )}
    </div>
  );
};

export default DragAndDropImage;

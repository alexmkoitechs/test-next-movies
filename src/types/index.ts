export interface IMovie {
  id: number;
  year: string;
  title: string;
  imgUrl: string;
}

export interface IMovieFormInputs {
  id?: number;
  year: number;
  title: string;
  imgUrl?: string;
}

export interface IImageFile extends File {
  preview: string;
}
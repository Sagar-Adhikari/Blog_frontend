export interface IItem {
  _id: string;
  name: string;
  description: string;
  imageURLs?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const emptyItem: IItem = {
  _id: "",
  name: "",
  description: "",
  imageURLs: ["assets/img/empty-div.svg"],
};

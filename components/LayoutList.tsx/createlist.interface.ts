export interface OwnProp {
  title: string;
  icon?: JSX.Element;
  image: string;
  newImage?: string;
  setImage: (postInfo: string) => void;
  valueName: string;
  onChangeName: (event: any) => void;
  valueDesc: string | undefined;
  onChamgeDesc: (event: any) => void;
  onClick_Create: () => void;
  onClick_Cancel: () => void;
}

export interface CatProp {
  name: string;
  description?: string;
}

export interface INewListProp {
  setShowPopup: (arg0: boolean) => void;
  showPopup: boolean;
}

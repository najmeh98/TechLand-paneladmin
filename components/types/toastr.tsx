export interface ToasterRef {
  showToaster: (mode: string, title: string, descripton: string) => void;
}

export interface ToasterProps {
  position: string;
  duration: number;
  hasIcon: boolean;
  destoryByClick: boolean;
}

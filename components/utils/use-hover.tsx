import { MouseEventHandler, useState } from "react";

export const useHover = (options?: {
  stopPropagation?: boolean;
  onMouseEnter?: MouseEventHandler;
}) => {
  const [hovered, setHovered] = useState(false);

  return [
    hovered,
    {
      onMouseEnter: (event: any) => {
        if (options?.stopPropagation) {
          event.stopPropagation();
        }
        setHovered(true);
        if (options?.onMouseEnter) {
          options.onMouseEnter(event);
        }
      },
      onMouseMove: !hovered
        ? (event: any) => {
            setHovered(true);
          }
        : undefined,
      onMouseLeave: (event: any) => {
        setHovered(false);
      },
    },
  ];
};

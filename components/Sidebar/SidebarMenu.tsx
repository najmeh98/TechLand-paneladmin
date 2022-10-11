import { ReactNode } from "react";
type OwnProp = {
  label: ReactNode;
  // هر پراپی ک بعنوان زchildren یاشه تایپش از نوع ReactNode
  className: string;
  onClick: () => void;
  icon?: any;
};

export const SidebarMenu = ({
  label,
  className,
  icon,
  onClick,
}: OwnProp): JSX.Element => {
  return (
    <div className="flex items-center justify-start" onClick={onClick}>
      <>{icon}</>
      <div className={className}> {label}</div>
    </div>
  );
};

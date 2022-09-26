import { ReactNode } from "react";
import { CustomButton } from "../CustomButton";
import { Flex } from "../share/Container";
import { SidebarOption } from "../Sidebar/SidebarOption";
import { ThemedText } from "../ThemedText";

interface OwnProp {
  title: string;
  button: string;
  onClick: () => void;
  children: ReactNode;
  className: string;
}

export const ListofItems: React.FC<OwnProp> = ({
  title,
  button,
  onClick,
  children,
  className,
}) => {
  return (
    <Flex>
      <SidebarOption />
      <div
        style={{ minHeight: "100vh" }}
        className="w-full flex items-start flex-col mx-auto my-0 max-w-[44rem] md:max-w-2xl"
      >
        <Flex
          className="w-full border border-b-1 border-blue-900  pb-8   my-14"
          style={{ borderBottom: "1px solid lightgray" }}
        >
          <ThemedText fontSize="XLarge" className="font-bold">
            {title}
          </ThemedText>
          <CustomButton
            // className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4"
            className={className}
            onClick={onClick}
          >
            {button}
          </CustomButton>
        </Flex>
        {children}
      </div>
    </Flex>
  );
};

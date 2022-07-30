import { SidebarItem } from "./SidebarItem";
import { itemProp } from "./SidebarOption";

interface MenuProp {
  setisOpen: () => {};
  isOpen: boolean;
  item: itemProp;
}

export const SidebarMenu: React.FC<MenuProp> = ({
  setisOpen,
  isOpen,
  item,
}) => {
  return (
    <>
      {item &&
        item?.subRoutes &&
        item?.subRoutes?.map((subRoute: any, index: any) => (
          <SidebarItem
            {...subRoute}
            key={index}
            isOpen={isOpen}
            style={{
              display: isOpen ? "block" : "none",
            }}
          />
        ))}
    </>
  );
};

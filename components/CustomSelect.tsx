import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { CatItem } from "../pages/admin/post/postCreate.interface";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CreateList } from "./LayoutList.tsx/CreateList";
import Createnewlist from "./LayoutList.tsx/Createnewlist";
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
interface CustomProp {
  categoryItem: CatItem[];
  setCategoryItem: (categoryItem: any) => void;
  selectedItem: CatItem | undefined;
  setSelectedItem: (selectedItem: CatItem) => void;
}

export const CustomSelect = ({
  categoryItem,
  setCategoryItem,
  setSelectedItem,
  selectedItem,
}: CustomProp): JSX.Element => {
  // const [selectItem, setSelectItem] = useState<CatItem>();

  const [showPopup, setShowPopup] = useState<boolean>(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  console.log("select", selectedItem);
  console.log("cat", categoryItem);

  return (
    <>
      <Listbox
        value={selectedItem}
        onChange={(event) => {
          console.log("enfant", event);
          setSelectedItem(event!);
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-gray-700">
              categrory
            </Listbox.Label>
            <Container className="relative mt-1 ">
              <Listbox.Button
                style={{ border: "1px solid rgb(204,204,204) " }}
                className="relative w-1/2 cursor-pointer  rounded-md border border-gray-400 bg-white py-2 pl-3 pr-10 text-left sm:text-sm"
              >
                <span className="flex items-center">
                  <img
                    src={selectedItem?.image}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                  <span className="ml-3 block truncate">
                    {selectedItem?.name}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <MdOutlineKeyboardArrowDown
                    className="h-5 w-5 text-gray-600"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  style={{ border: "1px solid rgb(204,204,204) " }}
                  className="absolute z-10  mt-1 p-0 max-h-56 w-1/2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {categoryItem &&
                    categoryItem?.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          classNames(
                            active ? " bg-gray-50" : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={item}
                        onClick={() => setSelectedItem(item)}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {item.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <BsCheck2
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  <div
                    className=" pl-4 pt-1 pb-1 w-full items-center	cursor-pointer text-lg	justify-start flex border-t-2  border-dashed border-0  border-gray-100"
                    onClick={() => setShowPopup(true)}
                  >
                    <FiPlusCircle />

                    <span className="pl-2">.....</span>
                  </div>
                </Listbox.Options>
              </Transition>
            </Container>
          </>
        )}
      </Listbox>
      {showPopup && (
        <Createnewlist showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </>
  );

  {
    /* <Container className="w-full cursor-pointer">  */
  }

  //   {/* <SelectStyle className="items-center	justify-between w-1/2">
  //     <span>Category</span>
  //     <IoIosArrowDown
  //       style={{ right: "20px", top: "10px" }}
  //       onClick={() => setShowInput(!showInput)}
  //     />
  //   </SelectStyle> */

  //  {showInput && (
  //     <Category className="border-1 border-solid border-gray-300 p-2 mt-2.5 bg-white	absolute rounded-2xl  w-1/2	">
  //       {categoryItem.map((item, index) => (
  //         <option
  //           key={item.name}
  //           className="p-2 hover:bg-slate-100 hover:shadow-md hover:cursor-pointer"
  //         >
  //           {item.name}
  //         </option>
  //       ))}
  //       <AddItem className="pt-1	pl-1 cursor-pointer">
  //         <FiPlusCircle fontSize="18px" />
  //       </AddItem>
  //     </Category>
  //   )}
  // </Container> */}
  // );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Category = styled.select`
  z-index: 1 !important;
  appearance: none;
`;

const AddItem = styled.div`
  width: 100%;
  border-top: 1px dashed lightgray;
  padding-top: 5px;
  padding-left: 5px;
`;

const SelectStyle = styled.div`
  border-radius: 10px;
  border: 1px solid rgb(204, 204, 204);
  height: 35px;
  /* width: 100%; */
  /* max-width: 330px; */
  padding: 0px 13px;
  appearance: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

import { useState } from "react";
import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import { CatItem } from "./types/postCreate.interface";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
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
  const [showPopup, setShowPopup] = useState<boolean>(false);

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

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
            <Listbox.Label className="block text-base font-normal pl-1 text-slate-400">
              Categrory
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

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice, { setBoardActive } from "../redux/boardsSlice";
import { RootState } from "../redux/store";

function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }: any) {
  const dispatch = useDispatch();

  const { boards } = useSelector((state: RootState) => state.boards);

  return (
    <div
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => (
            <div
              className={` flex items-baseline space-x-2 px-5 py-4  ${
                board.isActive &&
                " bg-[#635fc7] rounded-r-full text-white mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4  "
          >
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-bold  ">Create New Board </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;

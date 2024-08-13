import React, { useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md";
import { Button } from "./ui/button";
// interface AddWidgetFormProps {
//   onAddWidget: (widget: WidgetData) => void;
// }

export default function WidgetCard({ heading, description, onRemoveWidget }) {
  return (
    <div className="w-[300px] h-[160px] flex flex-col bg-[white] gap-3 rounded-xl shadow-sm group p-2 shrink-0">
      <div className="flex flex-row justify-between">
        <div className="font-semibold text-sm">{heading}</div>
        <MdCancel
          className="text-transparent text-[20px] cursor-pointer group-hover:text-[#697684] group-hover:hover:text-[red] transition-all"
          onClick={() => {
            onRemoveWidget();
          }}
        />
      </div>
      <div className="font-medium text-xs">{description}</div>
    </div>
  );
}

export function AddWidgetCard({ onClick }) {
  return (
    <div className="w-[300px] h-[160px] flex flex-col bg-[white] gap-3 rounded-xl shadow-sm group p-2 shrink-0 justify-center items-center">
      <Button
        onClick={onClick}
        size="sm"
        className="h-[30px] text-sm shrink-0 font-medium tracking-normal flex flex-row gap-2 items-center border rounded text-[#697684] border-[#a9aeb5] bg-[white] px-2 py-1 group hover:bg-[#14147D] hover:text-[white] hover:border-[#14147D] transition-all"
      >
        Add Widget
        <MdAdd />
      </Button>
    </div>
  );
}
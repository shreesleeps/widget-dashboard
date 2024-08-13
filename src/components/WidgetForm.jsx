import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

export default function WidgetForm({
  dashboardData,
  setDashboardData,
  page,
  setPage,
  rightSheetOpen,
  setRightSheetOpen,
}) {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [addMode, setAddMode] = useState(false);

  return (
    <Sheet open={rightSheetOpen} onOpenChange={setRightSheetOpen}>
      <SheetTrigger className="text-sm shrink-0 font-medium tracking-normal flex flex-row gap-2 items-center border rounded text-[#697684] border-[#a9aeb5] bg-[white] px-2 py-1 group hover:bg-[#14147D] hover:text-[white] hover:border-[#14147D] transition-all">
        Add Widget
        <MdAdd />
      </SheetTrigger>
      <SheetContent className="h-full flex flex-col min-w-[50vw] p-0 border-none outline-none">
        <SheetHeader className="text-sm text-[white] shrink-0 px-4 font-normal bg-[#14147D] flex flex-row items-center h-12">
          Personalize your dashbaord by adding the following widget
        </SheetHeader>
        <div className="flex-grow overflow-auto flex flex-col pb-2">
          <div className="flex flex-row gap-2 px-4 ">
            {dashboardData.categories.map((category, catecgoryIndex) => (
              <Button
                variant="primary"
                size="sm"
                key={category.category}
                onClick={() => setPage(catecgoryIndex)}
                className={`border-b-2 min-w-16 ${
                  page === catecgoryIndex
                    ? "border-[#1C294E] text-[#1C294E]"
                    : "text-[#7C7C7C] hover:text-[#1C294E]"
                } transition-all rounded-none`}
              >
                {category.categoryShort}
              </Button>
            ))}
          </div>
          <div className="flex flex-col flex-grow overflow-auto gap-2 px-4 pt-4 outline-none border-none">
            {!addMode ? (
              <>
                {dashboardData.categories[page].widgets.map(
                  (widget, widgetIndex) => (
                    <div
                      key={widget.heading}
                      className="w-full flex flex-row border border-[#a9aeb5] rounded px-2 py-1 items-center gap-2 justify-between"
                    >
                      <span className="w-max flex flex-row items-center gap-2">
                        <Checkbox
                          role="button"
                          type="checkbox"
                          checked={widget.selected}
                          onClick={() => {
                            setDashboardData({
                              ...dashboardData,
                              categories: dashboardData.categories.map(
                                (category, cI) => {
                                  if (cI === page) {
                                    return {
                                      ...category,
                                      widgets: category.widgets.map((w, wI) => {
                                        if (wI === widgetIndex) {
                                          return {
                                            ...w,
                                            selected: !w.selected,
                                          };
                                        }
                                        return w;
                                      }),
                                    };
                                  }
                                  return category;
                                }
                              ),
                            });
                          }}
                          className="accent-[#1C294E]"
                        />
                        <p className="text-sm font-medium">{widget.heading}</p>
                      </span>
                      <MdDelete
                        className="text-[20px] text-[#7C7C7C] hover:text-[red] transition-all"
                        onClick={() => {
                          setDashboardData((prev) => ({
                            ...prev,
                            categories: prev.categories.map((category, i) => {
                              if (i === page) {
                                return {
                                  ...category,
                                  widgets: category.widgets.filter(
                                    (w, j) => j !== widgetIndex
                                  ),
                                };
                              }
                              return category;
                            }),
                          }));
                        }}
                      />
                    </div>
                  )
                )}
                <button
                  className="h-[30px] shrink-0 font-medium text-center items-center justify-center w-full flex flex-row border border-[#a9aeb5] rounded px-2 py-1 gap-2 hover:bg-[#14147D] hover:text-[white] hover:border-[#14147D] transition-all"
                  onClick={() => setAddMode(true)}
                >
                  <MdAdd className="text-[20px]" />
                </button>
              </>
            ) : (
              <div className="w-full h-full shrink-0 justify-between flex flex-col gap-2">
                <span className="w-full flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Heading"
                    onChange={(e) => setHeading(e.target.value)}
                    value={heading}
                  />
                  <Input
                    type="description"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </span>

                <div className="flex flex-row gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setAddMode(false);
                      setHeading("");
                      setDescription("");
                    }}
                    className="min-w-[80px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      setDashboardData({
                        ...dashboardData,
                        categories: dashboardData.categories.map(
                          (category, cI) => {
                            if (cI === page) {
                              return {
                                ...category,
                                widgets: [
                                  ...category.widgets,
                                  {
                                    heading,
                                    description,
                                    selected: true,
                                  },
                                ],
                              };
                            }
                            return category;
                          }
                        ),
                      });
                      setAddMode(false);
                      setHeading("");
                      setDescription("");
                    }}
                    className="bg-[#14147D] min-w-[80px] text-[white] border-[#14147D] hover:bg-[#14147D] hover:text-[white] hover:border-[#14147D] transition-all"
                  >
                    Add
                  </Button>
                </div>
              </div>
            )}
            <div className="h-screen w-4 shrink-0"></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
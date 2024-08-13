"use client";
import Header from "@/components/header";
import WidgetCard, { AddWidgetCard } from "@/components/WidgetCard";
import WidgetForm from "@/components/WidgetForm";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [rightSheetOpen, setRightSheetOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [dashboardData, setDashboardData] = useState(
    JSON.parse(localStorage.getItem("dashboardData")) || {
      categories: [
        {
          category: "CSPM Executive Dashboard",
          categoryShort: "CSPM",
          widgets: [
            {
              heading: "Widget 1",
              description: "Text for Widget 1",
              selected: true,
            },
            {
              heading: "Widget 2",
              description: "Text for Widget 2",
              selected: true,
            },
          ],
        },
        {
          category: "Security Overview",
          categoryShort: "SOW",
          widgets: [
            {
              heading: "Widget 1",
              description: "Text for Widget 1",
              selected: true,
            },
            {
              heading: "Widget 2",
              description: "Text for Widget 2",
              selected: true,
            },
          ],
        },
        {
          category: "Registery Scan",
          categoryShort: "RS",
          widgets: [
            {
              heading: "Widget 1",
              description: "Text for Widget 1",
              selected: true,
            },
            {
              heading: "Widget 2",
              description: "Text for Widget 2",
              selected: true,
            },
          ],
        },
        {
          category: "Tickets",
          categoryShort: "T",
          widgets: [
            {
              heading: "Widget 1",
              description: "Text for Widget 1",
              selected: true,
            },
            {
              heading: "Widget 2",
              description: "Text for Widget 2",
              selected: true,
            },
          ],
        },
      ],
    }
  );

  // store dashboardData in local storage and retrieve if exists at startup
  useEffect(() => {
    localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
  }, [dashboardData]);
  return (
    <div className="flex flex-col w-screen h-[100dvh] bg-[#F0F5F9]">
      <Header search={search} setSearch={setSearch} />
      <div className="w-full flex-grow overflow-auto flex flex-col gap-3 items-start justify-start py-6">
        <div className="shrink-0 flex flex-row w-full justify-between px-8">
          <div className="text-base font-bold">CNAPP Dashboard</div>
          <div className="tracking-tighter flex flex-row gap-4">
            <WidgetForm
              dashboardData={dashboardData}
              setDashboardData={setDashboardData}
              page={category}
              setPage={setCategory}
              setRightSheetOpen={setRightSheetOpen}
              rightSheetOpen={rightSheetOpen}
            />
            {/* <button>refresh</button> */}
            {/* <button>options</button> */}
            {/* <button>last 2 days</button> */}
          </div>
        </div>
        <div className="w-full flex-grow overflow-auto flex flex-col gap-2 items-start justify-start px-8">
          {dashboardData.categories
            .filter((category) => {
              if (search === "") {
                return category;
              }
              return category.widgets.some((widget) =>
                widget.heading.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((category, parentindex) => (
              <div
                key={category.category}
                className="flex w-full max-w-full flex-col gap-1"
              >
                <div className="text-sm font-bold">{category.category}</div>
                <div className="flex flex-row gap-4 w-full max-w-full overflow-x-auto pb-4">
                  {category.widgets
                    .filter((widget) => {
                      if (!widget.selected) return false;
                      if (search === "") {
                        return widget;
                      }
                      return widget.heading
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    })
                    .map((widget, index) => (
                      <WidgetCard
                        key={widget.heading}
                        heading={widget.heading}
                        description={widget.description}
                        onRemoveWidget={() => {
                          setDashboardData((prev) => ({
                            ...prev,
                            categories: prev.categories.map((category, i) => {
                              if (i === parentindex) {
                                return {
                                  ...category,
                                  widgets: category.widgets.filter(
                                    (w, j) => j !== index
                                  ),
                                };
                              }
                              return category;
                            }),
                          }));
                        }}
                      />
                    ))}
                  <AddWidgetCard
                    onClick={() => {
                      setCategory(parentindex);
                      setRightSheetOpen(true);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
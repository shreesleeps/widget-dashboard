"use client";
import Header from "@/components/header";
import WidgetCard from "@/components/WidgetCard";
import WidgetForm from "@/components/WidgetForm";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [dashboardData, setDashboardData] = useState({
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
  });
  return (
    <div className="flex flex-col w-full bg-[#f6f8fe]">
      <Header search={search} setSearch={setSearch} />
      <div className="flex flex-row w-full justify-between">
        <div className="">CNAPP Dashboard</div>
        <div className=" flex flex-row gap-4">
          <WidgetForm
            dashboardData={dashboardData}
            setDashboardData={setDashboardData}
          />

          <button>refresh</button>
          <button>options</button>
          <button>last 2 days</button>
        </div>
      </div>

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
          <div key={category.category}>
            <div>{category.category}</div>
            <div className="flex flex-row gap-7">
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
                  <div key={widget.heading}>
                    <WidgetCard
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
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}

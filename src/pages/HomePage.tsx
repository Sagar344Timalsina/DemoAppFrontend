import React from 'react'
import { AppSidebar } from "@/components/Dashboard/App-Sidebar"
import { SiteHeader } from "@/components/SiteHeader"
import { Outlet } from "react-router-dom";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"



// const data=[
//   {
//     "id": 1,
//     "header": "Cover page",
//     "type": "Cover page",
//     "status": "In Process",
//     "target": "18",
//     "limit": "5",
//     "reviewer": "Eddie Lake"
//   },
//   {
//     "id": 2,
//     "header": "Table of contents",
//     "type": "Table of contents",
//     "status": "Done",
//     "target": "29",
//     "limit": "24",
//     "reviewer": "Eddie Lake"
//   },
//   {
//     "id": 3,
//     "header": "Executive summary",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "10",
//     "limit": "13",
//     "reviewer": "Eddie Lake"
//   },
//   {
//     "id": 4,
//     "header": "Technical approach",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "27",
//     "limit": "23",
//     "reviewer": "Jamik Tashpulatov"
//   },
//   {
//     "id": 5,
//     "header": "Design",
//     "type": "Narrative",
//     "status": "In Process",
//     "target": "2",
//     "limit": "16",
//     "reviewer": "Jamik Tashpulatov"
//   },
//   {
//     "id": 6,
//     "header": "Capabilities",
//     "type": "Narrative",
//     "status": "In Process",
//     "target": "20",
//     "limit": "8",
//     "reviewer": "Jamik Tashpulatov"
//   },
//   {
//     "id": 7,
//     "header": "Integration with existing systems",
//     "type": "Narrative",
//     "status": "In Process",
//     "target": "19",
//     "limit": "21",
//     "reviewer": "Jamik Tashpulatov"
//   },
//   {
//     "id": 8,
//     "header": "Innovation and Advantages",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "25",
//     "limit": "26",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 9,
//     "header": "Overview of EMR's Innovative Solutions",
//     "type": "Technical content",
//     "status": "Done",
//     "target": "7",
//     "limit": "23",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 10,
//     "header": "Advanced Algorithms and Machine Learning",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "30",
//     "limit": "28",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 11,
//     "header": "Adaptive Communication Protocols",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "9",
//     "limit": "31",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 12,
//     "header": "Advantages Over Current Technologies",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "12",
//     "limit": "0",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 13,
//     "header": "Past Performance",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "22",
//     "limit": "33",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 14,
//     "header": "Customer Feedback and Satisfaction Levels",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "15",
//     "limit": "34",
//     "reviewer": "Assign reviewer"
//   },
//   {
//     "id": 15,
//     "header": "Implementation Challenges and Solutions",
//     "type": "Narrative",
//     "status": "Done",
//     "target": "3",
//     "limit": "35",
//     "reviewer": "Assign reviewer"
//   }];

const HomePage = () => {
  return (
     <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards />
              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
              {/*</div>
              <DataTable data={data} /> */}
              <Outlet/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  
  )
}

export default HomePage
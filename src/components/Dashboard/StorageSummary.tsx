// components/dashboard/StorageSummary.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FolderDetail, StorageSummary } from "@/services/dashboardService";
import { useEffect, useState } from "react";

interface StorageSummaryProps {
  storageSummaryData?: StorageSummary;
  folderDetails?: FolderDetail[]; // optional if you want to show folder list too
}

export function StorageSummary({ storageSummaryData, folderDetails }: StorageSummaryProps) {
  if (!storageSummaryData) return null; // nothing to render if undefined
  const [usedPercentage, setUsedPercentage] = useState(0);


  useEffect(() => {
    const percentage = ((storageSummaryData.totalUsedGB) / storageSummaryData.maxStorageGB) * 100;
    // Animate after mount
    const timeout = setTimeout(() => setUsedPercentage(percentage), 100);
    return () => clearTimeout(timeout);
  }, [storageSummaryData]);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Storage Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm text-gray-500">Used: {storageSummaryData.totalUsedGB} GB / {storageSummaryData.maxStorageGB} GB</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${usedPercentage}%` }}
            />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th>Name</th>
              <th>Size</th>
              <th>Date Modified</th>
            </tr>
          </thead>
          <tbody>
            {folderDetails?.map((item) => {
              // Format date
              const formattedDate = new Date(item.lastModified).toLocaleDateString(); // e.g., 9/30/2025

              // Convert bytes to human-readable format
              const formatBytes = (bytes: number) => {
                if (bytes >= 1024 ** 3) return (bytes / 1024 ** 3).toFixed(2) + " GB";
                if (bytes >= 1024 ** 2) return (bytes / 1024 ** 2).toFixed(2) + " MB";
                if (bytes >= 1024) return (bytes / 1024).toFixed(2) + " KB";
                return bytes + " B";
              };

              return (
                <tr key={item.folderName}>
                  <td className="text-gray-800 font-medium">{item.folderName}</td>
                  <td className="text-gray-600 font-semibold">{formatBytes(item.totalSize)}</td>
                  <td className="text-gray-500 italic">{formattedDate}</td>
                </tr>

              );
            })}


          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

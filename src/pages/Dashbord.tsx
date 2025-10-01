import { DashboardActions } from "@/components/Dashboard/DashboardActions"
import { RecentFolders } from "@/components/Dashboard/RecentFolders"
import { StorageSummary } from "@/components/Dashboard/StorageSummary"
import { getDashboardData, type StorageData } from "@/services/dashboardService";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const Dashbord = () => {
  const [data, setData] = useState<StorageData>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      var res = await getDashboardData();
      if (res.isSuccess) {
        setData(res.value);
      }
    }
    catch (err: any) {
      toast.error(err.Error.description);
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardActions />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          {
            loading ? "" : (<StorageSummary storageSummaryData={data?.storageSummary} folderDetails={data?.folderDetails} />)
          }

        </div>
        {
          loading?"":(<RecentFolders FolderDetails={data?.latestFolders}/>)
        }
        
      </div>
    </div>
  )
}

export default Dashbord
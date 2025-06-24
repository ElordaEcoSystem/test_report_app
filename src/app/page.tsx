import { Button } from "@/components/ui/button";
import WorkOrdersTable from "@/components/WorkOrdersTable";
import { fetchUsers } from "@/lib/api";

export default function HomePage() {
  return (
    <div className="no-scroll flex flex-col">
      <WorkOrdersTable/>
      
    </div>
  )
}


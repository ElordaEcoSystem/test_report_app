import { Button } from "@/components/ui/button";
import WorkOrdersTable from "@/components/WorkOrdersTable";

export default function HomePage() {
  return (
    <div className="no-scroll">
      <WorkOrdersTable  />
    </div>
  )
}


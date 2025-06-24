  export type WorkOrderResponse = {
    id: string
    object: string
    photoUrl: string | null
    completedWorkText: string | null
    createdAt: Date
    createdBy: {
      name: string
    },
    createdById : string
  }
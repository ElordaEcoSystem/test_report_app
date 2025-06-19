'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExecutorForm } from "@/components/forms/ExecutorForm"
import { handleCreate } from "@/lib/actions/workOrderActions"

export function CreateWorkOrderDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Создать заявку</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Новая заявка</DialogTitle>
        </DialogHeader>

          <ExecutorForm
            onSubmit={async (data) => {
              await handleCreate(data, () => {
                alert("Заявка создана")
                // close modal, refresh table etc.
              })
            }}
          />
      </DialogContent>
    </Dialog>
  )
}
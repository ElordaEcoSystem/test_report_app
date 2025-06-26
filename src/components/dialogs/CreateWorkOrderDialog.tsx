// 'use client'

// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { ExecutorForm } from "@/components/forms/ExecutorForm"
// import { handleCreate } from "@/lib/actions/workOrderActions"

// export function CreateWorkOrderDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="w-full md:w-auto">Создать заявку</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Новая заявка</DialogTitle>
//         </DialogHeader>
//           <ExecutorForm
//             onSubmit={async (data) => {
//               await handleCreate(data, () => {
//                 alert("Заявка создана")
//                 // close modal, refresh table etc.
//               })
//             }}
//           />
//       </DialogContent>
//     </Dialog>
//   )
// }

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExecutorForm } from "@/components/forms/ExecutorForm"
import { handleCreate } from "@/lib/actions/workOrderActions"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function CreateWorkOrderDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:w-auto">Зафиксировать работу</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Проделанная работа</DialogTitle>
        </DialogHeader>
        <ExecutorForm
          onSubmit={async (data) => {
            await handleCreate(data, () => {
              // alert("Заявка создана")
              setOpen(false) // Закрываем модалку
              // можно добавить refresh(), если нужен рефетч таблицы
              toast.success('Работа зафиксирована')
              router.refresh()  
            })
            
          }}
        />
      </DialogContent>
    </Dialog>
  )
}




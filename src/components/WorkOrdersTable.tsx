// 'use client'

// import { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// import { fetchWorkOrders } from '@/lib/api'
// import { Badge } from '@/components/ui/badge'
// import { handleDelete, handleStatusChange } from '@/lib/actions/workOrderActions'
// import { CreateWorkOrderDialog } from './dialogs/CreateWorkOrderDialog'

// export default function WorkOrdersTable() {
//   const [orders, setOrders] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   const refresh = () => {
//     fetchWorkOrders().then(setOrders)
//   }

//   useEffect(() => {
//     refresh()
//     setLoading(false)
//   }, [])

//   if (loading) return <div className="p-4">Загрузка...</div>

//   return (
//     <div className="flex flex-col h-[100dvh]">

//       {/* Верхняя панель с заголовком и кнопкой */}
//       <div className="sticky top-0 z-10 bg-white dark:bg-background px-4 py-3 border-b flex justify-between items-center mb-3">
//         <h1 className="text-2xl font-semibold">Заявки</h1>
//         {/* <Button className="hidden md:inline-block">Создать заявку</Button> */}
//       </div>

//       {/* Основной прокручиваемый контент */}
//       <div className="flex-1 overflow-y-auto px-4 pb-20 md:pb-4 w-full ">
//         {/* Desktop: Таблица */}
//         <div className="hidden md:block ]">
//           <Card>
//             <CardContent className="overflow-x-auto p-4">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Дата</TableHead>
//                     <TableHead>Автор</TableHead>
//                     <TableHead>Объект</TableHead>
//                     {/* <TableHead>Необходимые работы</TableHead> */}
//                     <TableHead>Выполненные работы</TableHead>
//                     <TableHead>Фото</TableHead>
//                     {/* <TableHead>Выполнил</TableHead> */}
//                     {/* <TableHead>Подтвердил</TableHead> */}
//                     {/* <TableHead>Статус</TableHead> */}
//                     {/* <TableHead>Действия</TableHead> */}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {orders.map((order) => (
//                     <TableRow key={order.id}>
//                       <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell>{order.createdBy?.name ?? '—'}</TableCell>
//                       <TableCell>{order.object}</TableCell>
//                       {/* <TableCell>{order.needWorkText ?? '—'}</TableCell> */}
//                       <TableCell>{order.completedWorkText ?? '—'}</TableCell>
//                       {/* <TableCell>{order.completedBy?.name ?? '—'}</TableCell> */}
//                       {/* <TableCell>{order.confirmedBy?.name ?? '—'}</TableCell> */}
//                       {/* <TableCell><Badge>{order.status}</Badge></TableCell> */}
//                       {/* <TableCell className="space-y-1 md:space-x-2 md:space-y-0">
//                         <Button variant="outline" size="sm" onClick={() => alert('Открыть форму редактирования')}>Изменить</Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(order.id, () => setOrders(prev => prev.filter(o => o.id !== order.id)))}
//                         >
//                           Удалить
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleStatusChange(order.id, 'COMPLETED', refresh)}
//                         >
//                           Подтвердить
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleStatusChange(order.id, 'CANCELED', refresh)}
//                         >
//                           Отказать
//                         </Button>
//                       </TableCell> */}
//                       <TableCell>
//                         {order.photoUrl ? (
//                           <img
//                             src={order.photoUrl}
//                             alt="Фото"
//                             className="w-24 h-24 object-cover rounded-md border"
//                           />
//                         ) : (
//                           <div className="w-24 h-24 rounded-md bg-gray-200 flex items-center justify-center text-xs text-muted-foreground border">
//                             —
//                           </div>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Mobile: Карточки */}
//         <div className="md:hidden flex flex-col gap-2 mt-2">
//           {orders.map((order) => (
//             <Card key={order.id} className="p-4">
//               {/* Фото, если есть */}
//               {order.photoUrl && (
//                 <div className="mb-3">
//                   <img
//                     src={order.photoUrl}
//                     alt="Фото выполненных работ"
//                     className="w-full max-h-60 object-cover rounded-md border"
//                   />
//                 </div>
//               )}

//               <div className="text-sm text-muted-foreground mb-1">
//                 {new Date(order.createdAt).toLocaleDateString()}
//               </div>
//               <div className="font-medium text-lg">{order.object}</div>
//               <div className="text-sm mt-1"><strong>Автор:</strong> {order.createdBy?.name ?? '—'}</div>
//               {/* <div className="text-sm"><strong>Необходимые работы:</strong> {order.needWorkText ?? '—'}</div> */}
//               <div className="text-sm"><strong>Выполненные работы:</strong> {order.completedWorkText ?? '—'}</div>
//               {/* <div className="text-sm"><strong>Подтвердил:</strong> {order.confirmedBy?.name ?? '—'}</div> */}
//               {/* <div className="text-sm"><strong>Выполнил:</strong> {order.completedBy?.name ?? '—'}</div> */}
//               {/* <div className="text-sm mb-2"><strong>Статус:</strong> <Badge>{order.status}</Badge></div> */}
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Фиксированная кнопка снизу на мобилке */}
//         {/* <div className="fixed bottom-0 left-0 right-0 md:hidden z-20 p-4 bg-white border-t">
//           <Button className="w-full h-12">Создать заявку</Button>
//         </div> */}
//         <div className="fixed bottom-0 left-0 right-0 md:hidden z-20 p-4 bg-white border-t">
//           <CreateWorkOrderDialog />
//         </div>
//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchWorkOrders } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import {
  handleDelete,
  handleStatusChange,
} from "@/lib/actions/workOrderActions";
import { CreateWorkOrderDialog } from "./dialogs/CreateWorkOrderDialog";
import Image from "next/image";

export default function WorkOrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const refresh = () => {
    fetchWorkOrders().then(setOrders);
  };

  useEffect(() => {
    refresh();
    setLoading(false);
  }, []);

  if (loading) return <div className="p-4">Загрузка...</div>;

  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden">
      {/* Верхняя панель */}
      <div className="sticky top-0 z-10 bg-white dark:bg-background px-4 py-3 border-b flex justify-between items-center mb-3">
        <h1 className="text-2xl font-semibold">Заявки</h1>
      </div>

      <div className="flex-1 overflow-y-auto  pb-24 md:pb-4 w-full">
        {/* Desktop: Таблица */}
        <div className="hidden md:block px-4">
          <Card>
            <CardContent className="overflow-x-auto p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Автор</TableHead>
                    <TableHead>Объект</TableHead>
                    <TableHead>Выполненные работы</TableHead>
                    <TableHead>Фото</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.createdBy?.name ?? "—"}</TableCell>
                      <TableCell>{order.object}</TableCell>
                      <TableCell>{order.completedWorkText ?? "—"}</TableCell>
                      <TableCell>
                        {order.photoUrl ? (
                          <img
                            src={order.photoUrl}
                            alt="Фото"
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-muted-foreground border">
                            —
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile: Переключатель режима */}
        <div className="md:hidden mb-3 flex justify-end px-4">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as "card" | "table")}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="card">Карточки</option>
            <option value="table">Таблица</option>
          </select>
        </div>

        {/* Mobile: Карточки */}
        {viewMode === "card" && (
          <div className="md:hidden flex flex-col gap-2 mt-2 px-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4 max-w-full overflow-hidden">
                {order.photoUrl && (
                  <div className="mb-3">
                    <Image
                      src={order.photoUrl}
                      alt="Фото выполненных работ"
                      width={600}
                      height={400}
                      className="w-full max-h-60 object-cover rounded-md border"
                    />
                    {/* {console.log("test", order.photoUrl)} */}
                  </div>
                )}
                <div className="text-sm text-muted-foreground mb-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className="font-medium text-lg break-words">
                  {order.object}
                </div>
                <div className="text-sm mt-1 break-words">
                  <strong>Автор:</strong> {order.createdBy?.name ?? "—"}
                </div>
                <div className="text-sm break-words">
                  <strong>Выполненные работы:</strong>{" "}
                  {order.completedWorkText ?? "—"}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Mobile: Таблица */}
        {viewMode === "table" && (
          <div
            className="md:hidden px-2 w-[100vw]"
            // style={{ width: "calc(100vw - 20px)" }}
          >
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-[700px] w-full text-sm text-left bg-white">
                <thead className="bg-gray-100 text-gray-700 font-medium">
                  <tr>
                    <th className="px-4 py-2 border-b">Дата</th>
                    <th className="px-4 py-2 border-b">Автор</th>
                    <th className="px-4 py-2 border-b">Объект</th>
                    <th className="px-4 py-2 border-b">Выполненные работы</th>
                    <th className="px-4 py-2 border-b">Фото</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b whitespace-nowrap">
                        {order.createdBy?.name ?? "—"}
                      </td>
                      <td className="px-4 py-2 border-b whitespace-nowrap">
                        {order.object}
                      </td>
                      <td className="px-4 py-2 border-b max-w-[200px] break-words">
                        {order.completedWorkText ?? "—"}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {order.photoUrl ? (
                          <img
                            src={order.photoUrl}
                            alt="Фото"
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-muted-foreground border">
                            —
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Кнопка создания заявки */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-20 p-4 bg-white border-t">
        <CreateWorkOrderDialog />
      </div>
    </div>
  );
}

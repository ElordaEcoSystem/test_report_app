"use client";
import { saveAs } from 'file-saver';
import {  useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { fetchUsers, fetchWorkOrders } from "@/lib/api";

import { CreateWorkOrderDialog } from "./dialogs/CreateWorkOrderDialog";
import Image from "next/image";
import { FilterPanel } from "./FilterForm";
import { InvoicePDF } from "./invoice/invoice";
import { pdf } from "@react-pdf/renderer";

export default function WorkOrdersTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
 

  const handleGeneratePDF = async (user: string, month: number) => {
    const blob = await pdf(<InvoicePDF orders={orders} user={user} monthIndex={month} />).toBlob();
    saveAs(blob, `Отчет_${user}_${month + 1}.pdf`);
  };

  useEffect(() => {
  const refresh = async () => {
    const [ordersData, usersData] = await Promise.all([fetchWorkOrders(), fetchUsers()]);
    setOrders(ordersData);
    setUsers(usersData);
    setLoading(false);
  };
  refresh();
}, []);
  if (loading) return <div className="p-4">Загрузка...</div>;
  console.log(users)


  return (
    <div className="flex flex-col h-[100dvh] overflow-hidden w-[100vw]">
      {/* Верхняя панель */}
      <div className="sticky top-0 z-10 bg-white dark:bg-background px-4 py-3 border-b flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Заявки</h1>
        <div className='hidden md:block'>
          <FilterPanel users={users} onGeneratePDF={handleGeneratePDF}/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 md:pb-4 w-full mt-4">
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

                          <Image
                            src={`/uploads/report_photo${order.photoUrl}`}
                            alt="Фото выполненных работ"
                            width={600}
                            height={400}
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
          <Select value={viewMode} onValueChange={(value) => setViewMode(value as 'card' | 'table')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите вид" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Режим отображения</SelectLabel>
                <SelectItem value="card">Карточки</SelectItem>
                <SelectItem value="table">Таблица</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>


        {/* Mobile: Карточки */}
        {viewMode === "card" && (
          <div className="md:hidden flex flex-col gap-2 mt-2 px-4 w-[100vw]">
            {orders.map((order) => (
              <Card key={order.id} className="p-4  overflow-hidden">
                {order.photoUrl && (
                  <div className="mb-3">
                    <Image
                      src={`/uploads/report_photo${order.photoUrl}`}
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
                          <Image
                            src={`/uploads/report_photo${order.photoUrl}`}
                            alt="Фото выполненных работ"
                            width={600}
                            height={400}
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

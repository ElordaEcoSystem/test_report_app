// 'use client';

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { monthNames } from '../lib/data';

// interface FilterPanelProps {
//   users: { name: string; id: string }[];
//   onGeneratePDF: (user: string, month: number) => void;
// }

// export function FilterPanel({ users, onGeneratePDF }: FilterPanelProps) {
//   const [selectedUser, setSelectedUser] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');

//   const handleClick = () => {
//     if (!selectedUser || selectedMonth === '') {
//       alert("Выберите пользователя и месяц");
//       return;
//     }
//     console.log(selectedUser, selectedMonth)
//     onGeneratePDF(selectedUser, parseInt(selectedMonth));
//   };

//   return (
//     <div className="flex gap-3 items-center">
//       <Select onValueChange={setSelectedUser}>
//         <SelectTrigger className="w-[400px]">
//           <SelectValue placeholder="Выберите пользователя" />
//         </SelectTrigger>
//         <SelectContent>
//           {users.map((user, idx) => (
//             <SelectItem key={idx} value={user.name}>
//               {user.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select onValueChange={setSelectedMonth}>
//         <SelectTrigger className="w-[140px]">
//           <SelectValue placeholder="Выберите месяц" />
//         </SelectTrigger>
//         <SelectContent>
//           {monthNames.nominative.map((month, index) => (
//             <SelectItem key={month} value={String(index)}>
//               {month}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Button onClick={handleClick}>Скачать PDF</Button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { monthNames } from '../lib/data';

interface FilterPanelProps {
  users: { name: string; id: string }[];
  onGeneratePDF: (user: string, month: number) => void;
  onFilter?: (user: string, month: number) => void;
  onReset?: () => void;
}

export function FilterPanel({
  users,
  onGeneratePDF,
  onFilter,
  onReset
}: FilterPanelProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleGeneratePDF = () => {
    if (!selectedUser || selectedMonth === '') {
      alert("Выберите пользователя и месяц");
      return;
    }
    onGeneratePDF(selectedUser, parseInt(selectedMonth));
  };

  const handleFilter = () => {
    if (!selectedUser || selectedMonth === '') {
      alert("Выберите пользователя и месяц");
      return;
    }
    onFilter?.(selectedUser, parseInt(selectedMonth));
    console.log(selectedUser,selectedMonth)
  };

  const handleReset = () => {
    setSelectedUser('');
    setSelectedMonth('');
    onReset?.();
  };

  return (
    <div className="flex gap-3 items-center flex-wrap">
      {/* Пользователь */}
      <Select value={selectedUser} onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Выберите пользователя" />
        </SelectTrigger>
        <SelectContent>
          {users.map((user, idx) => (
            <SelectItem key={idx} value={user.name}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Месяц */}
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Выберите месяц" />
        </SelectTrigger>
        <SelectContent>
          {monthNames.nominative.map((month, index) => (
            <SelectItem key={month} value={String(index)}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Кнопки действий */}
      <div className="flex gap-2">
        <Button variant="default" onClick={handleGeneratePDF}>
          Скачать PDF
        </Button>
        <Button variant="destructive" onClick={handleFilter}>
          Фильтровать
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Сброс
        </Button>
      </div>
    </div>
  );
}
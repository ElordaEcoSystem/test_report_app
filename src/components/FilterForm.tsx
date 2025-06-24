// 'use client';

// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { monthNames } from '../lib/data';

// interface User {
//   name: string;
// }


// export function FilterPanel({ users,handleClick }:any) {
//   const [selectedUser, setSelectedUser] = useState<string>('');
//   const [selectedMonth, setSelectedMonth] = useState<string>('');
  
//   return (
//     <div className="flex gap-3 items-center">
//       <Select onValueChange={setSelectedUser}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Выберите пользователя" />
//         </SelectTrigger>
//         <SelectContent>
//           {users.map((user:any, idx:any) => (
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
//           {monthNames.nominative.map((month,index) => (
//             <SelectItem key={month} value={String(index)}>
//               {month}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Button onClick={handleClick}>Применить</Button>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { monthNames } from '../lib/data';

interface FilterPanelProps {
  users: { name: string; id: string }[];
  onGeneratePDF: (user: string, month: number) => void;
}

export function FilterPanel({ users, onGeneratePDF }: FilterPanelProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleClick = () => {
    if (!selectedUser || selectedMonth === '') {
      alert("Выберите пользователя и месяц");
      return;
    }
    console.log(selectedUser, selectedMonth)
    onGeneratePDF(selectedUser, parseInt(selectedMonth));
  };

  return (
    <div className="flex gap-3 items-center">
      <Select onValueChange={setSelectedUser}>
        <SelectTrigger className="w-[400px]">
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

      <Select onValueChange={setSelectedMonth}>
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

      <Button onClick={handleClick}>Скачать PDF</Button>
    </div>
  );
}
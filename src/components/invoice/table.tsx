import {
  Text,
  View,
} from '@react-pdf/renderer';
import { styles } from './style';
import { WorkOrderResponse } from './type';





type TableRowProps = {
  index: number
  object: string
  completedWorkText: string | null
  createdBy: {
    name: string
  }
  createdAt: Date
}

const TableRow = ({ index, object, completedWorkText, createdBy, createdAt }: TableRowProps) => (
  <View style={[styles.tableRow]}>
    <Text style={[styles.cell, styles.indexCell]}>{index + 1}</Text>
    <Text style={styles.cell}>{new Date(createdAt).toLocaleDateString()}</Text>
    <Text style={styles.cell}>{createdBy.name}</Text>
    <Text style={styles.cell}>{object}</Text>
    <Text style={[styles.cell, styles.lastCell]}>{completedWorkText ?? '—'}</Text>
  </View>
)

type TableProps = {
  data: WorkOrderResponse[],
  userName: string
  monthIndex: number
}

export const Table = ({ data,userName,monthIndex  }: TableProps) => {
  // const filtered = data.filter(order => order.createdBy.name === userName)
  console.log("From table monthIndex = ",monthIndex )
  // const monthIndex = 5;
  const filtered = data.filter(order => {
    const created = new Date(order.createdAt);
    console.log("From table created.getMonth()",created.getMonth())
    console.log("From table created.getFullYear()",created.getFullYear())
    return (
      order.createdBy.name === userName &&
      created.getMonth() === monthIndex &&
      created.getFullYear() === 2025 // опционально, если хочешь отфильтровать по году
    );
  });
  console.log("From table filtered = ",filtered)
  return (
    <View style={[styles.table, styles.text, { marginTop: 28 }]}>
      {/* Заголовок */}
      <View style={[styles.tableRow, styles.header_table]}>
        <Text style={[styles.cell, styles.indexCell]}>№</Text>
        <Text style={styles.cell}>Дата</Text>
        <Text style={styles.cell}>Сотрудники (ФИО)</Text>
        <Text style={styles.cell}>Объект</Text>
        <Text style={[styles.cell, styles.lastCell]}>Работы</Text>
      </View>

      {/* Строки таблицы */}
      {filtered.map((item, idx) => (
        <TableRow
          key={item.id}
          index={idx}
          object={item.object}
          completedWorkText={item.completedWorkText}
          createdBy={item.createdBy}
          createdAt={item.createdAt}
        />
      ))}
    </View>
  )
}
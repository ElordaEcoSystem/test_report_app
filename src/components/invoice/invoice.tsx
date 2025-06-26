// "use client"
// import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
// import { styles} from './style'
// import { Table } from './table';
// import { getDaysInMonth } from 'date-fns';
// import { useEffect, useState } from 'react';
// import { monthNames } from '../../lib/data';
// import { WorkOrderResponse } from './type';




// export const  Invoice = () => {
//   const [orders, setOrders] = useState<WorkOrderResponse[]>([])
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const res = await fetch('/api/work-orders')
//         if (!res.ok) throw new Error('Ошибка при загрузке')
//         const data : WorkOrderResponse[] = await res.json()
//         setOrders(data)
//       } catch (err) {
//         setError('Не удалось загрузить заявки')
//         console.error(err)
//       }
//     }
    
//     fetchOrders()
//   }, [])



//   const monthIndex = 5; // Июнь (0 — январь)
  
//   const date = new Date(2025, monthIndex); // Февраль 2025 (месяцы с 0)
//   const numberOfDays = getDaysInMonth(date);

//   // const monthName = format(date, 'LLLL', { locale: ru });


//   const InvoicePDF = () => (
//     <Document>
//       <Page size="A4" style={[styles.page,styles.text]}>
//         <View style={styles.headerWrapper}>
//           <View style={styles.header}>
//             <Image
//               src = "logo.jpg"
//               style={styles.img}
//             />
//             <View >
//               <Text style={[styles.text_bold]}>ГКП на ПХВ «Elorda Eco System» акимата города Астана</Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.mainWrapper}>
//           <View style={[{textAlign:"center"},styles.text_bold]}>
//             <Text >АКТ </Text>
//             <Text >выполненных работ Службы информационных технологий{'\n'} 
//               и автоматизированных систем</Text>
//           </View>
//           <View style={[styles.main_date,styles.text_bold]}>          
//             <Text>г. Астана</Text>
//             <Text>«{numberOfDays}» {monthNames.genitive[monthIndex]} 2025 г.</Text>
//           </View>
//           <Text style={styles.main_text}>
//               В период с 1 по {numberOfDays} {monthNames.genitive[monthIndex]} 2025 года инженерами КИП Әрміс А.Б., и Абенов Ж.Ж. на базе Предприятия успешно проведено плановое ремонтное обслуживание оборудования и систем, что позволило обеспечить бесперебойную работу насосных агрегатов и других технических устройств. В рамках проведения работ был выполнен ряд задач, связанных с диагностикой, сборкой, подключением и настройкой различных элементов насосных установок.
//           </Text>
//         </View>
        
//       <Table data={orders} userId='d7e26613-1ed6-4f8e-aa2b-99f5f07eb519'/>
//       </Page>
//     </Document>
//     )
//   return (
//     <div>
//       <div className='w-[100vw] h-[750px]'>
//         <PDFViewer width="100%" height="100%">
//           <InvoicePDF/>
//         </PDFViewer>
//       </div>
//     </div>
//   )
//   }
  
  
import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { Table } from './table';
import { getDaysInMonth } from 'date-fns';
import { monthNames } from '../../lib/data';
import { WorkOrderResponse } from './type';
import { PhotoGrid } from './PhotoGrid';

interface InvoicePDFProps {
  orders: WorkOrderResponse[];
  user: string;
  monthIndex: number;
}

// export const InvoicePDF = ({ orders, user, monthIndex }: InvoicePDFProps) => {
export const InvoicePDF = ({ orders,user,monthIndex }: InvoicePDFProps) => {
  // const monthIndex  = 5;
  // const user = "executor_name";
  const date = new Date(2025, monthIndex);
  const numberOfDays = getDaysInMonth(date);

  const allPhotos = orders
  .filter(order => order.createdBy.name === user && new Date(order.createdAt).getMonth() === monthIndex)
  .flatMap(order => order.photoUrl || []);
  console.log("fromInvoice",orders, user, monthIndex)
  return (
    <Document>
      <Page size="A4" style={[styles.page, styles.text]}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <Image src="logo.jpg" style={styles.img} />
            <View>
              <Text style={[styles.text_bold]}>
                ГКП на ПХВ «Elorda Eco System» акимата города Астана
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.mainWrapper}>
          <View style={[{ textAlign: 'center' }, styles.text_bold]}>
            <Text>АКТ</Text>
            <Text>
              выполненных работ Службы информационных технологий{'\n'}
              и автоматизированных систем
            </Text>
          </View>

          <View style={[styles.main_date, styles.text_bold]}>
            <Text>г. Астана</Text>
            <Text>
              «{numberOfDays}» {monthNames.genitive[monthIndex]} 2025 г.
            </Text>
          </View>

          <Text style={styles.main_text}>
            В период с 1 по {numberOfDays} {monthNames.genitive[monthIndex]} 2025 года инженерами КИП {user} на базе Предприятия успешно проведено плановое ремонтное обслуживание оборудования и систем, что позволило обеспечить бесперебойную работу насосных агрегатов и других технических устройств. В рамках проведения работ был выполнен ряд задач, связанных с диагностикой, сборкой, подключением и настройкой различных элементов насосных установок.
           </Text>
        </View>

        <Table data={orders} userName={user} monthIndex={monthIndex}/>
        <PhotoGrid photoURLs={allPhotos} />
      </Page>
    </Document>
  );
};





// // import { prisma } from '@/lib/prisma'
// // import { NextResponse } from 'next/server'

// // export async function GET() {
// //   try {
// //     const workOrders = await prisma.workOrder.findMany({
// //       include: {
// //         createdBy: true,
// //         customer: true,
// //         completedWorks: true,
// //       },
// //     })
// //     return NextResponse.json(workOrders)
// //   } catch (error) {
// //     console.error('API error:', error)
// //     return new NextResponse('Internal Server Error', { status: 500 })
// //   }
// // }

// // app/api/work-orders/route.ts
// // app/api/work-orders/route.ts
// import { prisma } from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   try {
//     const workOrders = await prisma.workOrder.findMany({
//       include: {
//         createdBy: true,
//         completedBy: true,
//         confirmedBy:true
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     })

//     // Можно обработать или отфильтровать перед отправкой
//     return NextResponse.json(workOrders)
//   } catch (error) {
//     console.error('Ошибка при загрузке заявок:', error)
//     return new NextResponse('Internal Server Error', { status: 500 })
//   }
// }

import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const orders = await prisma.workOrder.findMany({
      include: {
        createdBy: { select: { name: true } },
        completedBy: { select: { name: true } },
        confirmedBy: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка получения заявок' }, { status: 500 })
  }
}

const DEFAULT_USER_ID = 'd7e26613-1ed6-4f8e-aa2b-99f5f07eb519'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { object, needWorkText, completedWorkText, photoUrl } = body

    if (!object) {
      return NextResponse.json({ error: 'Поле "object" обязательно' }, { status: 400 })
    }

    const workOrder = await prisma.workOrder.create({
      data: {
        object,
        needWorkText,
        completedWorkText,
        photoUrl,
        createdById: DEFAULT_USER_ID, // ← сюда подставь id авторизованного пользователя
      },
    })

    return NextResponse.json(workOrder, { status: 201 })
  } catch (error) {
    console.error('Ошибка при создании заявки:', error)
    return NextResponse.json({ error: 'Ошибка при создании заявки' }, { status: 500 })
  }
}



// export async function POST(req: NextRequest) {
//   try {
//     const session = await getServerSession(authOptions)
//     const userId = session?.user?.id

//     if (!userId) {
//       return NextResponse.json({ error: 'Не авторизован' }, { status: 401 })
//     }

//     const body = await req.json()
//     const { object, needWorkText, completedWorkText, photoUrl } = body

//     if (!object) {
//       return NextResponse.json({ error: 'Поле "object" обязательно' }, { status: 400 })
//     }

//     const newOrder = await prisma.workOrder.create({
//       data: {
//         object,
//         needWorkText,
//         completedWorkText,
//         photoUrl,
//         createdById: userId,
//       },
//     })

//     return NextResponse.json(newOrder, { status: 201 })
//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: 'Ошибка при создании заявки' }, { status: 500 })
//   }
// }
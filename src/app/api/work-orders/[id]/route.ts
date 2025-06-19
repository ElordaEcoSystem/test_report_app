import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.workOrder.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка удаления' }, { status: 500 })
  }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const order = await prisma.workOrder.findUnique({
      where: { id: params.id },
      include: {
        createdBy: true,
        completedBy: true,
        confirmedBy: true,
      },
    })
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка получения' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const updated = await prisma.workOrder.update({
      where: { id: params.id },
      data,
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка обновления' }, { status: 500 })
  }
}
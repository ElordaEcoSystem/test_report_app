import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    const updated = await prisma.workOrder.update({
      where: { id: params.id },
      data: { status },
    })
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка обновления статуса' }, { status: 500 })
  }
}
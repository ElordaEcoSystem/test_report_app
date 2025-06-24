export async function fetchWorkOrders() {
  const res = await fetch('/api/work-orders')
  if (!res.ok) throw new Error('Ошибка при загрузке заявок')
  return res.json()
}

export async function deleteWorkOrder(id: string) {
  const res = await fetch(`/api/work-orders/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Не удалось удалить заявку')
}

export async function updateWorkOrderStatus(id: string, status: string) {
  const res = await fetch(`/api/work-orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Не удалось обновить статус')
}

export async function createWorkOrder(data: {
  object: string
  needWorkText?: string
  completedWorkText?: string
  photoUrl?: string
}) {
  const res = await fetch('/api/work-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Ошибка при создании заявки')
  }
  return res.json()
}

export async function updateWorkOrder(id: string, data: any) {
  const res = await fetch(`/api/work-orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Ошибка при обновлении заявки')
}


export async function fetchUsers() {
  const res = await fetch('/api/users')
  if (!res.ok) throw new Error('Ошибка при загрузке заявок')
  return res.json()
}

import {
  deleteWorkOrder,
  updateWorkOrderStatus,
  createWorkOrder,
  updateWorkOrder
} from '@/lib/api'

// Удаление
export async function handleDelete(id: string, onSuccess: () => void) {
  try {
    await deleteWorkOrder(id)
    onSuccess()
  } catch (e) {
    alert('Ошибка при удалении')
  }
}

// Обновление статуса
export async function handleStatusChange(id: string, status: string, onSuccess: () => void) {
  try {
    await updateWorkOrderStatus(id, status)
    onSuccess()
  } catch (e) {
    alert(`Ошибка при обновлении статуса: ${status}`)
  }
}

// Создание заявки
export async function handleCreate(
  data: {
    object: string
    needWorkText?: string
    completedWorkText?: string
    photoUrl?: string
  },
  onSuccess: () => void
) {
  try {
    await createWorkOrder(data)
    onSuccess()
  } catch (e) {
    alert('Ошибка при создании заявки')
  }
}

// Обновление заявки
export async function handleUpdate(id: string, data: any, onSuccess: () => void) {
  try {
    await updateWorkOrder(id, data)
    onSuccess()
  } catch (e) {
    alert('Ошибка при обновлении заявки')
  }
}
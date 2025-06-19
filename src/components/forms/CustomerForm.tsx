'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const schema = z.object({
  object: z.string().min(1, "Объект обязателен"),
  needWorkText: z.string().min(1, "Опишите необходимые работы"),
})

type FormData = z.infer<typeof schema>

export function CustomerForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input {...register("object")} placeholder="Объект" />
      {errors.object && <p className="text-sm text-red-600">{errors.object.message}</p>}

      <Textarea {...register("needWorkText")} placeholder="Необходимые работы" />
      {errors.needWorkText && <p className="text-sm text-red-600">{errors.needWorkText.message}</p>}

      <Button type="submit" className="w-full">Отправить</Button>
    </form>
  )
}
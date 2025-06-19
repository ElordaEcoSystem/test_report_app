'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const schema = z.object({
  object: z.string().min(1, "Объект обязателен"),
  completedWorkText: z.string().optional(),
  photoUrl: z.string().url("Введите корректную ссылку на фото").optional(),
})

type FormData = z.infer<typeof schema>

interface ExecutorFormProps {
  onSubmit: (data: FormData) => void
}

export function ExecutorForm({ onSubmit }: ExecutorFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      object: "",
      completedWorkText: "",
      photoUrl: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="object"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Объект</FormLabel>
              <FormControl>
                <Input placeholder="Например, ОС-1.2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="completedWorkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выполненные работы</FormLabel>
              <FormControl>
                <Input placeholder="Описание работ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото (ссылка)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Отправить</Button>
      </form>
    </Form>
  )
}
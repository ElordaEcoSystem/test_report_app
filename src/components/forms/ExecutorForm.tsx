// 'use client'

// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// const schema = z.object({
//   object: z.string().min(1, "Объект обязателен"),
//   completedWorkText: z.string().optional(),
//   photoUrl: z.string().url("Введите корректную ссылку на фото").optional(),
// })

// type FormData = z.infer<typeof schema>

// interface ExecutorFormProps {
//   onSubmit: (data: FormData) => void
// }

// export function ExecutorForm({ onSubmit }: ExecutorFormProps) {
//   const form = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       object: "",
//       completedWorkText: "",
//       photoUrl: "",
//     },
//   })

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="object"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Объект</FormLabel>
//               <FormControl>
//                 <Input placeholder="Например, ОС-1.2" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="completedWorkText"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Выполненные работы</FormLabel>
//               <FormControl>
//                 <Input placeholder="Описание работ" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="photoUrl"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Фото (ссылка)</FormLabel>
//               <FormControl>
//                 <Input placeholder="https://example.com/photo.jpg" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">Отправить</Button>
//       </form>
//     </Form>
//   )
// }

// components/forms/ExecutorForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { annotateImage } from "@/lib/annotateImage";


const schema = z.object({
  object: z.string().min(1),
  completedWorkText: z.string(),
  photo: z.any(), // file
});

export function ExecutorForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [uploading, setUploading] = useState(false);

  // const handleFormSubmit = async (data: any) => {
  //   if (!data.photo[0]) return alert("Выберите фото");

  //   setUploading(true);
  //   const formData = new FormData();
  //   formData.append("file", data.photo[0]);

  //   const res = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const json = await res.json();
  //   setUploading(false);

  //   if (!res.ok) return alert("Ошибка при загрузке фото");

  //   const photoUrl = json.url;

  //   onSubmit({
  //     object: data.object,
  //     completedWorkText: data.completedWorkText,
  //     photoUrl,
  //   });
  // };
  const handleFormSubmit = async (data: any) => {
    if (!data.photo[0]) return alert("Выберите фото");

    setUploading(true);

    // Аннотируем изображение
    const processedImage = await annotateImage({
      file: data.photo[0],
      object: data.object,
      logoSrc:  "/logo.jpg"
    });

    const formData = new FormData();
    formData.append("file", processedImage, "photo.jpg");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    setUploading(false);

    if (!res.ok) return alert("Ошибка при загрузке фото");

    const photoUrl = json.url;

    onSubmit({
      object: data.object,
      completedWorkText: data.completedWorkText,
      photoUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input {...register("object")} placeholder="Объект" />
      <Textarea
        {...register("completedWorkText")}
        placeholder="Выполненные работы"
      />

      <Input
        {...register("photo")}
        type="file"
        accept="image/*"
        capture="environment"
      />

      <Button type="submit" disabled={uploading}>
        {uploading ? "Загрузка..." : "Отправить"}
      </Button>
    </form>
  );
}

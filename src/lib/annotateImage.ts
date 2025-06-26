export async function annotateImage({
  file,
  object,
  logoSrc
}: {
  file: File;
  object: string;
  logoSrc: string;
}): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      img.src = reader.result;
    };

    img.onload = async () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.width;
      canvas.height = img.height;

      // 1. Рисуем исходное изображение
      ctx.drawImage(img, 0, 0);

      // 2. Добавляем логотип (пропорционально ширине)
      const logo = new Image();
      logo.src = logoSrc;

      await new Promise((res) => {
        logo.onload = () => {
          const maxLogoWidth = canvas.width * 0.15;
          const aspectRatio = logo.width / logo.height;
          const logoWidth = maxLogoWidth;
          const logoHeight = logoWidth / aspectRatio;

          ctx.drawImage(logo, 20, 20, logoWidth, logoHeight);
          res(null);
        };
        logo.onerror = res;
      });

      // 3. Расчёт пропорциональных размеров текста и отступов
      const fontSize = Math.round(canvas.height * 0.025); // 2.5% от высоты
      const lineHeight = fontSize + 10;
      const bottomPadding = lineHeight * 3 + 20;

      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      // 4. Затемнённый фон под текст
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, canvas.height - bottomPadding, canvas.width, bottomPadding);

      // 5. Рисуем текст
      ctx.fillStyle = "#fff";
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textBaseline = "top";

      ctx.fillText(`Дата: ${dateStr}`, 20, canvas.height - bottomPadding + 10);
      ctx.fillText(`Время: ${timeStr}`, 20, canvas.height - bottomPadding + 10 + lineHeight);
      ctx.fillText(`Объект: ${object}`, 20, canvas.height - bottomPadding + 10 + lineHeight * 2);

      // 6. Сохраняем изображение
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject("Не удалось получить изображение");
      }, "image/jpeg", 0.95);
    };

    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export const BLOG_POSTS = [
  {
    slug: "costo-seguro-gastos-medicos-hermosillo",
    title: "¿Cuánto cuesta un Seguro de Gastos Médicos Mayores en Hermosillo en 2026?",
    excerpt: "Descubre los factores que determinan el costo de tu póliza y cómo elegir la mejor opción para tu presupuesto y necesidades médicas.",
    content: `
El costo de un Seguro de Gastos Médicos Mayores (SGMM) en Hermosillo varía dependiendo de varios factores. A diferencia de un seguro de auto, no hay un "precio fijo" para todos.

### Factores que determinan el costo:
1. **Edad:** A mayor edad, mayor riesgo de enfermedades, por lo que la prima aumenta.
2. **Género:** Históricamente, en ciertas edades reproductivas, el seguro para mujeres puede variar de costo.
3. **Nivel Hospitalario:** Si quieres acceso exclusivo a los hospitales más caros de la ciudad (ej. Hospital CIMA), el plan costará más que uno con acceso a hospitales de nivel medio.
4. **Deducible y Coaseguro:** Entre más alto sea el deducible (lo que pagas tú de tu bolsillo antes de que el seguro entre), más baja será la prima anual.

Acércate a nosotros en O Sanchez Seguros para hacerte una cotización a la medida. Trabajamos con AXA, GNP, Monterrey y más aseguradoras.
    `,
    date: "10 de Mayo, 2026",
    category: "Gastos Médicos",
    image: "/images/blog_gmm.png",
  },
  {
    slug: "seguro-de-vida-ahorro-vs-afore",
    title: "Diferencias clave entre Seguro de Vida con Ahorro y AFORE",
    excerpt: "Analizamos los pros y contras de cada instrumento financiero para que tomes la mejor decisión sobre tu fondo de retiro.",
    content: `
Elegir entre un Seguro de Vida con Ahorro (o PPR) y aportar a tu AFORE es una de las decisiones financieras más importantes que tomarás.

### ¿Qué es una AFORE?
Es la Administradora de Fondos para el Retiro. Invierte tu dinero en las SIEFORES.
- **Ventaja:** Comisiones reguladas.
- **Desventaja:** Tus rendimientos dependen del mercado y no incluye protección por fallecimiento.

### ¿Qué es un Seguro de Vida con Ahorro?
Es un instrumento privado donde aportas una cantidad fija.
- **Ventaja:** Garantiza un rendimiento mínimo (protegido contra inflación si es en UDIS) y **protege a tu familia** con una suma asegurada desde el día uno si llegas a faltar.
- **Desventaja:** Requiere compromiso de pago a largo plazo.

Si eres el pilar de tu familia, el Seguro de Vida con Ahorro es indispensable porque blindas tu patrimonio pase lo que pase.
    `,
    date: "15 de Mayo, 2026",
    category: "Ahorro y Vida",
    image: "/images/blog_vida_ahorro.png",
  },
  {
    slug: "guia-seguro-auto-fronterizo-arizona",
    title: "Guía para cruzar a Arizona: Qué seguro de auto fronterizo necesitas",
    excerpt: "Todo lo que debes saber antes de cruzar la frontera en auto. Evita multas y viaja tranquilo con la cobertura adecuada.",
    content: `
Si vives en Sonora, cruzar a Arizona es algo común para compras o vacaciones. Sin embargo, muchos cometen el error de cruzar sin seguro o pensar que su póliza mexicana los cubre.

### La Ley en Arizona
El estado de Arizona exige como mínimo un seguro de Responsabilidad Civil (Liability Insurance) para cualquier vehículo que circule por sus carreteras.

### ¿Tu seguro mexicano te cubre?
La mayoría de los seguros de auto cobertura amplia en México **sí incluyen Responsabilidad Civil en el extranjero**, pero OJO: esta cobertura suele ser muy básica ($50,000 a $100,000 USD), y en EE.UU. un accidente con lesionados puede superar fácilmente ese monto.

### Nuestra Recomendación
Para estar verdaderamente tranquilo, te sugerimos tramitar un **Seguro de Auto Fronterizo (Turista)**. En O Sanchez Seguros podemos emitirlo en minutos para que viajes protegido.
    `,
    date: "20 de Mayo, 2026",
    category: "Fronterizos",
    image: "/images/blog_fronterizo.png",
  }
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find(post => post.slug === slug);
}

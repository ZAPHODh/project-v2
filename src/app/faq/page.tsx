import FAQ from "@/components/FAQ";
const faqs = [
  {
    question: "O que é Tailwind CSS?",
    answer:
      "Tailwind é um framework CSS baseado em utilitários para construção rápida de interfaces.",
  },
  {
    question: "Como posso aprender Next.js?",
    answer:
      "Você pode começar com a documentação oficial do Next.js, que oferece tutoriais e exemplos práticos.",
  },
  {
    question: "O que é React?",
    answer:
      "React é uma biblioteca JavaScript para construção de interfaces de usuário, especialmente para SPAs.",
  },
  {
    question:
      "Qual a diferença entre componentes de classe e componentes funcionais no React?",
    answer:
      "Componentes funcionais são funções simples que recebem props e retornam JSX, enquanto os de classe são mais complexos e têm estado interno.",
  },
  {
    question: "Como faço animações no Tailwind?",
    answer:
      "Você pode usar as classes de animação do Tailwind ou integrar com bibliotecas como Animate.css.",
  },
];
export default function FAQPage() {
  return <FAQ faqs={faqs} />;
}

import Header from "@/components/landing-page/header";
import TheProblem from "@/components/landing-page/the-problem";
import TheSolution from "@/components/landing-page/the-solution";
import SubscriptionCards from "@/components/subscription-cards";

import getPlans from "@/lib/stripe/getPlans";

const solutions = [
  {
    img: "https://res.cloudinary.com/dji3kuzho/image/upload/v1739146336/conceito-do-negocio-e-do-risco-e-da-gerencia-na-opiniao-lateral-da-parede-cinzenta-e-branca-dedo-empurrando-a-torre-do-bloco-de-madeira_176474-6560_ojkzjc.jpg",
    title: "Gestão Financeira Simplificada",
    subtitle: "Controle de Receitas e Despesas",
    description:
      "Nossa plataforma oferece uma interface intuitiva para registrar entradas e saídas de forma rápida e eficiente, ajudando a manter o controle financeiro do seu salão em dia.",
    button: "Acesse agora!",
    href: "/calc",
    importantTopics: [
      {
        title: "Registro de Entradas e Saídas",
        description:
          "Registre facilmente todas as transações financeiras do seu salão, desde pagamentos de clientes até despesas operacionais diárias.",
      },
      {
        title: "Cálculo Automático de Comissões",
        description:
          "Calcule comissões de profissionais automaticamente, levando em consideração taxas, promoções e outros fatores.",
      },
      {
        title: "Gestão de Despesas Fixas e Variáveis",
        description:
          "Controle todas as despesas do salão, incluindo custos fixos mensais e variáveis, para otimizar sua lucratividade.",
      },
    ],
  },
  {
    img: "https://res.cloudinary.com/dji3kuzho/image/upload/v1739146345/grafico-de-barras-digital-crescente-com-sobreposicao-de-mao-de-empresario_53876-97640_ioyshn.avif",
    title: "Insights de Lucratividade",
    subtitle: "Avalie seus Serviços com Precisão",
    description:
      "Acompanhe o desempenho de cada serviço oferecido no seu salão. Descubra quais serviços geram mais lucro e onde é possível otimizar valores.",
    button: "Ver Relatório",
    href: "/salon",
    importantTopics: [
      {
        title: "Análise de Lucratividade por Serviço",
        description:
          "Obtenha relatórios detalhados sobre a rentabilidade de cada serviço, ajudando a tomar decisões mais estratégicas.",
      },
      {
        title: "Indicadores de Performance",
        description:
          "Visualize métricas importantes como taxa de crescimento, margem de lucro e volume de serviços realizados.",
      },
      {
        title: "Ajustes Personalizados de Preços",
        description:
          "Ajuste os preços dos serviços de forma inteligente, com base nas análises de lucratividade e tendências do mercado.",
      },
    ],
  },
];

export default async function Home() {
  const plans = await getPlans();

  return (
    <div className="flex flex-col items-center justify-center max-w-screen">
      <Header />
      <TheProblem />
      <TheSolution solutions={solutions} />
      <SubscriptionCards plans={plans} />
    </div>
  );
}

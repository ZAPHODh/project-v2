import VideoShowcase from "./video-showcase";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col items-center w-full py-12">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Transforme seu salão de beleza
        </h2>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-40">
          Nossa plataforma foi criada para facilitar a gestão financeira do seu
          salão. Controle receitas e despesas, calcule comissões, acompanhe a
          lucratividade de cada serviço e melhore a experiência dos seus
          clientes com prompts personalizados.
        </p>
        <VideoShowcase />
      </div>
    </header>
  );
}

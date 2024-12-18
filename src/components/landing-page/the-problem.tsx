export default function TheProblem() {
  return (
    <section className="py-[100px] w-full ">
      <div className="container mx-auto text-left w-full">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-600">
          O PROBLEMA
        </h3>
        <h2 className="mb-6 text-3xl font-extrabold  md:text-5xl">
          Gerenciar seu salão de beleza não precisa ser difícil
        </h2>
        <p className="mb-12 text-lg text-gray-500 dark:text-gray-400">
          Muitos salões ainda enfrentam dificuldades com a gestão financeira e a
          experiência dos clientes.
        </p>
        <div className="flex flex-col lg:flex-row w-full gap-8 ">
          <div className="flex flex-col items-center  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-12 w-12  text-purple-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <h4 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              Falta de controle financeiro...
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Dificuldade para registrar entradas, saídas e calcular comissões
              de forma prática e eficiente.
            </p>
          </div>

          <div className="flex flex-col items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-12 w-12  text-purple-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>

            <h4 className="mb-2 text-lg font-bold ">
              Falta de insights sobre lucratividade...
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Sem dados claros, é difícil avaliar quais serviços geram mais
              lucro e onde ajustar valores.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-12 w-12  text-purple-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>

            <h4 className="mb-2 text-lg font-bold ">
              Falta de personalização...
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Pouca ou nenhuma interação personalizada para os clientes,
              impactando sua fidelização.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

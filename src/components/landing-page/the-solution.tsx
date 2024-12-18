import Image from "next/image";
import { Button } from "../ui/button";

type ImportantTopic = {
  title: string;
  description: string;
};
type Solution = {
  img: string;
  title: string;
  subtitle: string;
  description: string;
  button: string;
  importantTopics: ImportantTopic[];
};

type Solutions = {
  solutions: Solution[];
};

export default function TheSolution({ solutions }: Solutions) {
  return (
    <section className="flex flex-col gap-16 items-center py-[100px]">
      {solutions.map((solution, index) => (
        <div key={index} className="flex flex-col gap-8 p-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
            <div className="lg:w-1/2 flex flex-col justify-center w-full h-full">
              {index === 0 && (
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-purple-600">
                  A SOLUÇÃO
                </h2>
              )}
              <p className="text-sm font-semibold mb-2">{solution.subtitle}</p>
              <h3 className="text-4xl font-bold mb-4">{solution.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-6">
                {solution.description}
              </p>
              <Button className="px-6 py-2 rounded-md transition duration-300 w-32">
                {solution.button}
              </Button>
            </div>

            <div className="relative lg:w-1/2 w-full h-[350px]">
              <Image
                src={solution.img}
                alt={solution.title}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            {solution.importantTopics.map((topic, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start text-center md:text-left"
              >
                <h4 className="font-semibold text-lg mb-2 ">{topic.title}</h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

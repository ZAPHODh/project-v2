"use client";

import getStripe from "@/lib/stripe/getStripe";
import { Button } from "./ui/button";

type SubscriptionCardstype = {
  plans: SubscriptionPlan[];
};

export default function SubscriptionCards({
  plans = [],
}: SubscriptionCardstype) {
  if (plans.length === 0) return <>no subscrpitons</>;
  const handleSubscribe = async (priceId: string) => {
    const stripe = await getStripe();

    const { sessionId } = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    }).then((res) => res.json());

    const result = await stripe?.redirectToCheckout({ sessionId });

    if (result?.error) {
      console.error(result.error);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-4">Escolha um Plano</h2>
      <div className="flex flex-col lg:flex-row gap-3 my-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <h2 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              {plan.name}
            </h2>

            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">R$</span>
              <span className="text-5xl font-extrabold tracking-tight">
                {((plan.price as number) / 100).toFixed(2)}
              </span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /mês
              </span>
            </div>
            <p className=" text-sl font-normal text-gray-500 dark:text-gray-400 justify">
              {plan.description}
            </p>
            <ul className="space-y-5 my-7">
              {Object.keys(plan.metadata).map((key) => (
                <li
                  key={key}
                  className={`flex items-center ${
                    JSON.parse(plan.metadata[key])
                      ? ""
                      : "line-through decoration-gray-500"
                  }`}
                >
                  {plan.metadata[key] && (
                    <svg
                      className={`${
                        JSON.parse(plan.metadata[key])
                          ? "flex-shrink-0 w-4 h-4 "
                          : "flex-shrink-0 w-4 h-4 opacity-25 "
                      }`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/200/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                  )}

                  <span
                    className={`${
                      JSON.parse(plan.metadata[key])
                        ? "text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3"
                        : "text-base font-normal leading-tight text-gray-500 ms-3"
                    }`}
                  >
                    {key}
                  </span>
                </li>
              ))}
            </ul>

            <Button onClick={() => handleSubscribe(plan.price_id)}>
              Inscrever
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

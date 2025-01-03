"use client"; // Garante que o componente é renderizado apenas no cliente

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent =
      localStorage.getItem("cookie_consent") === "true" ||
      document.cookie.includes("cookie_consent=true");
    if (!consent) setIsVisible(true);
  }, []);

  const handleConsent = () => {
    localStorage.setItem("cookie_consent", "true");
    document.cookie = "cookie_consent=true; path=/; max-age=31536000";

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      tabIndex={-1}
      className="fixed bottom-0 start-0 z-50 flex justify-between w-full p-4 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
          <span>
            Este site utiliza cookies para melhorar sua experiência,
            personalizar conteúdo e analisar nosso tráfego.
            <button
              onClick={handleConsent}
              className="ms-2 text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Eu concordo
            </button>
          </span>
        </p>
      </div>
    </div>
  );
}

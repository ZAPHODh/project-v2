import SubscriptionCards from "@/components/subscription-cards";
import getPlans from "@/lib/stripe/getPlans";

export default async function Subscriptions() {
  const plans = await getPlans();

  return <SubscriptionCards plans={plans} />;
}

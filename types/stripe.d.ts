interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  interval: ServerStripe.Price.Recurring.Interval | undefined;
  price_id: string;
  metadata: Stripe.Metadata;
}

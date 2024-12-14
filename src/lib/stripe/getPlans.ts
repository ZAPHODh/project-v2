import { metadata } from "@/app/layout";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
});

export default async function getPlans() {
  try {
    const prices = await stripe.prices.list({
      expand: ["data.product"],
      active: true,
      type: "recurring",
    });

    const plans = prices.data.map((price) => {
      const product = price.product;
      if (
        typeof product === "object" &&
        product !== null &&
        "name" in product
      ) {
        return {
          id: price.id,
          name: product.name,
          description: product.description,
          price: price.unit_amount,
          interval: price.recurring?.interval,
          price_id: price.id,
          metadata: product.metadata,
        };
      } else {
        return {
          id: price.id,
          name: "Unknown Product",
          description: "No description available",
          price: price.unit_amount,
          interval: price.recurring?.interval,
          price_id: price.id,
          metadata: price.metadata,
        };
      }
    });

    return plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
}

import Stripe from "stripe";
import { prisma } from "../../../prisma/prisma";

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const userId = subscription.metadata.userId;

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionRole: subscription.items.data[0].price.nickname || null,
    },
  });
  console.log("Subscription updated:", subscription.id);
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const userId = subscription.metadata.userId;

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStatus: "canceled",
      subscriptionRole: null,
    },
  });
  console.log("Subscription deleted:", subscription.id);
}

export async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscription = invoice.subscription;

  if (
    subscription &&
    typeof subscription !== "string" &&
    subscription.metadata
  ) {
    const userId = subscription.metadata.userId;

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: "active",
      },
    });
    console.log("Invoice paid:", invoice.id);
  } else {
    console.log("No valid subscription or metadata available");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

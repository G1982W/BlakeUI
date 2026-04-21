import { CheckoutButton } from "@/components/payment/checkout-button";

export default async function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Payment</h1>
      <CheckoutButton />
    </div>
  );
}

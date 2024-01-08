import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";

import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  paymentIntentId: string;
  hotelId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const { hotelId } = useParams();

  const search = useSearchContext();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
        console.log("error", error);
        showToast({ message: "Error Saving booking", type: "ERROR" });
      },
    }
  );

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result?.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result?.paymentIntent?.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label htmlFor="" className="text-gray-700 text-sm fobt-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label htmlFor="" className="text-gray-700 text-sm fobt-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm fobt-bold flex-1">
        Email
        <input
          className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
          type="email"
          readOnly
          disabled
          {...register("email")}
        />
      </label>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
      </div>

      <div className="bg-blue-200 p-4 rounded-md">
        <div className="font-semibold text-lg">
          Total Cost : ${paymentIntent.totalCost.toFixed(2)}
        </div>

        <div className="text-xs">Includes taxes and charges</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          options={{
            hidePostalCode: true,
          }}
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 p-2 rounded-md text-white font-bold h-full disabled:bg-gray-300"
        >
          {isLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;

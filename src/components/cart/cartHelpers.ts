// src/utils/cartHelpers.ts

import type { CartItem, Course, Event } from "../../ult/types/types";

export const createCartItemFromEvent = (
  event: Event
): Omit<CartItem, "quantity"> => {
  // Safely convert price to number and handle formatting
  const priceValue =
    typeof event.price === "number"
      ? event.price
      : parseFloat(event.price.toString()) || 0;
  const originalPrice =
    typeof event.price === "number"
      ? `$${event.price.toFixed(2)}`
      : event.price;

  return {
    _id: event._id,
    productId: event._id,
    name: event.title || event.name,
    price: priceValue,
    originalPrice: originalPrice,
    type: "event",
    image: event.image,
    date: event.date,
    time: event.time,
    location: event.location,
  };
};

export const createCartItemFromCourse = (
  course: Course
): Omit<CartItem, "quantity"> => {
  const priceString = course.price.replace("$", "").replace(",", "");
  const priceValue = parseFloat(priceString) || 0;

  return {
    _id: course._id,
    productId: course._id,
    name: course.name,
    price: priceValue,
    originalPrice: course.price,
    type: "course",
    image: course.image,
    teacher: course.teacher,
    ratings: course.ratings,
    duration: course.time,
  };
};

export const isFreeEvent = (event: Event): boolean => {
  const price = event.price;

  if (typeof price === "number") {
    return price === 0;
  }

  if (typeof price === "string") {
    return (
      price === "0" ||
      price === "0.00" ||
      price === "0.0" ||
      price === "" ||
      parseFloat(price) === 0
    );
  }

  return false;
};

export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export const getCartItemCount = (cartItems: CartItem[]): number => {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

import type { CartItem, Course, Event } from "../../ult/types/types";

export const createCartItemFromEvent = (
  event: Event
): Omit<CartItem, "quantity" | "userEmail"> => {
  // Safely convert price to number and handle formatting
  const priceValue =
    typeof event.price === "number"
      ? event.price
      : parseFloat(event.price.toString()) || 0;
  const originalPrice =
    typeof event.price === "number"
      ? `$${event.price.toFixed(2)}`
      : `$${parseFloat(event.price as string).toFixed(2)}`;

  return {
    _id: undefined,
    productId: event._id,
    name: event.title || event.name,
    price: priceValue,
    originalPrice: originalPrice,
    type: "event",
    image: event.image,
    date: event.date,
    time: event.time,
    location: event.location,
    teacher: event.speaker || "Event Speaker",
    ratings: "0"
  };
};

export const createCartItemFromCourse = (
  course: Course
): Omit<CartItem, "quantity" | "userEmail"> => {

  const price = course.price as number;
  const ratings = course.ratings as number;

  return {
    _id: undefined,
    productId: course._id,
    name: course.name,
    price: price,
    originalPrice: `$${price.toFixed(2)}`,
    type: "course",
    image: course.image,
    teacher: course.teacher.name,
    ratings: ratings.toString(),
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


// Duplicate booking check function
export const checkIfAlreadyBooked = async (
  userEmail: string,
  productId: string,
  type: "event" | "course"
): Promise<{ isDuplicate: boolean; existingBooking?: any }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/bookings/check-duplicate?userEmail=${userEmail}&productId=${productId}&type=${type}`
    );

    if (!response.ok) {
      throw new Error('Failed to check duplicate booking');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking duplicate booking:', error);
    return { isDuplicate: false };
  }
};

// Check if event is already in cart
export const checkIfEventInCart = async (
  userEmail: string,
  eventId: string
): Promise<boolean> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cart?userEmail=${userEmail}`, {
      credentials: "include",
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const cartItems = await response.json();
    return cartItems.some((item: CartItem) =>
      item.productId === eventId && item.type === "event"
    );
  } catch (error) {
    console.error('Error checking cart:', error);
    return false;
  }
};

// Check if event can be added to cart (for paid events)
export const canAddEventToCart = async (
  userEmail: string,
  event: Event
): Promise<{ canAdd: boolean; reason?: string }> => {
  // If free event, no need to check - free events are booked directly
  if (isFreeEvent(event)) {
    return { canAdd: true };
  }

  // For paid events, check if already booked
  try {
    const duplicateCheck = await checkIfAlreadyBooked(userEmail, event._id , "event");

    if (duplicateCheck.isDuplicate) {
      return {
        canAdd: false,
        reason: "You have already booked this event. You cannot book the same event twice."
      };
    }

    return { canAdd: true };
  } catch (error) {
    console.error('Error checking if event can be added to cart:', error);
    return {
      canAdd: false,
      reason: "Unable to verify booking status. Please try again."
    };
  }
};

// Check if course can be added to cart (for paid Course)
export const canAddCourseToCart = async (
  userEmail: string,
  course: Course
): Promise<{ canAdd: boolean; reason?: string }> => {
  // If free course, no need to check - free courses are enrolled directly
  if (course.price <= 0) {
    return { canAdd: true };
  }

  // For paid courses, check if already enrolled
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/enrollments/check-duplicate/${course._id}?userEmail=${userEmail}`
    );

    if (!response.ok) {
      throw new Error('Failed to check duplicate enrollment');
    }

    const duplicateCheck = await response.json();

    if (duplicateCheck.isEnrolled) {
      return {
        canAdd: false,
        reason: "You are already enrolled in this course."
      };
    }

    return { canAdd: true };
  } catch (error) {
    console.error('Error checking if course can be added to cart:', error);
    return {
      canAdd: false,
      reason: "Unable to verify enrollment status. Please try again."
    };
  }
};


// Validate cart items for duplicates before checkout
export const validateCartItemsBeforeCheckout = async (
  cartItems: CartItem[],
  userEmail: string
): Promise<{ isValid: boolean; invalidItems: CartItem[]; errors: string[] }> => {
  const invalidItems: CartItem[] = [];
  const errors: string[] = [];

  // Check each event item for duplicates
  const eventItems = cartItems.filter(item => item.type === "event");

  for (const item of eventItems) {
    try {
      const duplicateCheck = await checkIfAlreadyBooked(userEmail, item.productId, "event");

      if (duplicateCheck.isDuplicate) {
        invalidItems.push(item);
        errors.push(`You have already booked: ${item.name}`);
      }
    } catch (error) {
      console.error(`Error validating item ${item.productId}:`, error);
      invalidItems.push(item);
      errors.push(`Unable to verify booking status for: ${item.name}`);
    }
  }

  return {
    isValid: invalidItems.length === 0,
    invalidItems,
    errors
  };
};


// Get event booking status
export const getEventBookingStatus = async (
  userEmail: string,
  eventId: string
): Promise<"not_booked" | "booked" | "error"> => {
  try {
    const duplicateCheck = await checkIfAlreadyBooked(userEmail, eventId, "event");
    return duplicateCheck.isDuplicate ? "booked" : "not_booked";
  } catch (error) {
    console.error('Error getting event booking status:', error);
    return "error";
  }
};


// Create complete cart item with user email
export const createCompleteCartItem = (
  baseItem: Omit<CartItem, "quantity" | "userEmail">,
  quantity: number,
  userEmail: string
): CartItem => {
  return {
    ...baseItem,
    quantity,
    userEmail
  };
};


// Enhanced validation for cart items before payment
export const validateCartForCheckout = async (
  cartItems: CartItem[],
  userEmail: string
): Promise<{ isValid: boolean; errors: string[] }> => {
  const errors: string[] = [];

  for (const item of cartItems) {
    try {
      // Check for duplicate bookings
      const duplicateCheck = await checkIfAlreadyBooked(userEmail, item.productId, item.type);

      if (duplicateCheck.isDuplicate) {
        errors.push(`You have already booked: ${item.name}`);
        continue;
      }

      // For events, check seat availability
      if (item.type === "event") {
        const eventResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/events/${item.productId}`
        );

        if (eventResponse.ok) {
          const event = await eventResponse.json();
          if (event.seats < item.quantity) {
            errors.push(`Not enough seats available for: ${item.name}. Available: ${event.seats}, Requested: ${item.quantity}`);
          }
        } else {
          errors.push(`Unable to verify availability for: ${item.name}`);
        }
      }
    } catch (error) {
      console.error(`Error validating item ${item.productId}:`, error);
      errors.push(`Unable to verify booking status for: ${item.name}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
import { Enquiry, EnquiryFormData } from "@/types/enquiry";

// Initial realistic customer enquiries for the admin portal
const mockInitialEnquiries: Enquiry[] = [
  {
    id: "enq-101",
    fullName: "Aarav Sharma",
    mobileNumber: "+91 98201 44521",
    email: "aarav.sharma@example.com",
    productName: "Monolith Minimalist Runner",
    productBrand: "DORVEN Signature",
    productSku: "DVN-MNO-01-WHT",
    preferredSize: "UK 9",
    preferredColor: "Warm Ivory",
    message: "Is this size in stock at your Mumbai studio for physical trial this Saturday?",
    status: "New",
    createdAt: "2024-11-05T14:30:00.000Z",
    source: "product_modal",
    notes: "Customer interested in weekend private fitting.",
  },
  {
    id: "enq-102",
    fullName: "Pooja Mehta",
    mobileNumber: "+91 97112 88910",
    email: "pooja.mehta@example.com",
    productName: "Boston Clog 'Taupe Soft Footbed'",
    productBrand: "Birkenstock",
    productSku: "BK-BST-TP-SUE",
    preferredSize: "UK 7",
    preferredColor: "Taupe Suede",
    message: "Looking for regular width fitting in UK 7. Please confirm availability.",
    status: "Contacted",
    createdAt: "2024-11-04T10:15:00.000Z",
    source: "product_modal",
    notes: "Messaged on WhatsApp with stock confirmation.",
  },
  {
    id: "enq-103",
    fullName: "Rohan Kapoor",
    mobileNumber: "+91 99800 12345",
    email: "rohan.k@example.com",
    productName: "990v6 'Made in USA Heritage Grey'",
    productBrand: "New Balance",
    productSku: "NB-990V6-GRY",
    preferredSize: "UK 10",
    preferredColor: "Heritage Grey",
    message: "Do you offer doorstep trial or courier delivery to Bengaluru?",
    status: "Followed Up",
    createdAt: "2024-11-03T16:45:00.000Z",
    source: "availability_check",
    notes: "Courier options shared via concierge call.",
  },
];

const STORAGE_KEY = "dorven_customer_enquiries";

export function getEnquiries(): Enquiry[] {
  if (typeof window === "undefined") {
    return mockInitialEnquiries;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockInitialEnquiries));
      return mockInitialEnquiries;
    }
    return JSON.parse(raw);
  } catch {
    return mockInitialEnquiries;
  }
}

export function saveEnquiry(
  data: EnquiryFormData & {
    productBrand?: string;
    productSku?: string;
    productUrl?: string;
    source?: "product_modal" | "contact_page" | "availability_check";
  }
): Enquiry {
  const current = getEnquiries();
  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}`,
    fullName: data.fullName,
    mobileNumber: data.mobileNumber,
    email: data.email,
    productName: data.productName,
    productBrand: data.productBrand,
    productSku: data.productSku,
    productUrl: data.productUrl,
    preferredSize: data.preferredSize,
    preferredColor: data.preferredColor,
    message: data.message,
    status: "New",
    createdAt: new Date().toISOString(),
    source: data.source || "product_modal",
  };

  const updated = [newEnquiry, ...current];
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist enquiry in localStorage:", e);
    }
  }

  return newEnquiry;
}

export function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  notes?: string
): void {
  const current = getEnquiries();
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
        }
      : item
  );

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to persist updated enquiry:", e);
    }
  }
}

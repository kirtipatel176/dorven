export type EnquiryStatus = "New" | "Contacted" | "Followed Up" | "Closed";

export interface Enquiry {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  productName?: string;
  productBrand?: string;
  productSku?: string;
  productUrl?: string;
  preferredSize?: string;
  preferredColor?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  source: "product_modal" | "contact_page" | "availability_check";
  notes?: string;
}

export interface EnquiryFormData {
  fullName: string;
  mobileNumber: string;
  email?: string;
  productName?: string;
  preferredSize?: string;
  preferredColor?: string;
  message: string;
}

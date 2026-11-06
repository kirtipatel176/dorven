import { NextResponse } from "next/server";
import { z } from "zod";

const enquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long." })
    .max(80, { message: "Full Name cannot exceed 80 characters." }),
  mobileNumber: z
    .string()
    .min(10, { message: "Please enter a valid 10-digit mobile number." })
    .regex(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, {
      message: "Please enter a valid Indian mobile number (e.g. 9820123456 or +91 9820123456).",
    }),
  email: z.string().email({ message: "Invalid email address format." }).optional().or(z.literal("")),
  productName: z.string().optional(),
  productBrand: z.string().optional(),
  productSku: z.string().optional(),
  productUrl: z.string().optional(),
  preferredSize: z.string().optional(),
  preferredColor: z.string().optional(),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters long." })
    .max(1000, { message: "Message cannot exceed 1000 characters." }),
  source: z.enum(["product_modal", "contact_page", "availability_check"]).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = enquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = result.data;

    // Simulation of server-side database insertion & notification
    const enquiryRecord = {
      id: `enq_${Date.now()}`,
      ...validData,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    // Return sanitized acknowledgement. Note: Never imply order confirmation or payment!
    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received. Our concierge team will reach out via WhatsApp / phone shortly.",
        enquiry: enquiryRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error occurred while submitting your enquiry. Please try WhatsApp directly.",
      },
      { status: 500 }
    );
  }
}

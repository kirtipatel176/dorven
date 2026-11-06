"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  MessageSquare,
  Award,
  TrendingUp,
  ArrowRight,
  Clock,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { initialProducts } from "@/data/products";
import { brandsData } from "@/data/brands";
import { getEnquiries, updateEnquiryStatus } from "@/lib/enquiryStore";
import { Enquiry } from "@/types/enquiry";

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  useEffect(() => {
    setEnquiries(getEnquiries());
  }, []);

  const pendingEnquiries = enquiries.filter(
    (e) => e.status === "New" || e.status === "Contacted"
  );
  const ourLabelCount = initialProducts.filter((p) => p.isOurLabel).length;

  const handleStatusChange = (id: string, newStatus: Enquiry["status"]) => {
    updateEnquiryStatus(id, newStatus);
    setEnquiries(getEnquiries());
  };

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-luxury font-bold text-mutedGrey">
              Total Products
            </span>
            <div className="h-9 w-9 rounded-lg bg-warmIvory text-charcoal flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal">
            {initialProducts.length}
          </div>
          <p className="text-xs text-mutedGrey mt-1">
            Across {brandsData.length} partner & in-house brands
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-luxury font-bold text-mutedGrey">
              Pending Enquiries
            </span>
            <div className="h-9 w-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal">
            {pendingEnquiries.length}
          </div>
          <p className="text-xs text-amber-700 mt-1 font-medium">
            Awaiting concierge reply
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-luxury font-bold text-mutedGrey">
              DORVEN Signature
            </span>
            <div className="h-9 w-9 rounded-lg bg-warmIvory text-champagneDark flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal">
            {ourLabelCount}
          </div>
          <p className="text-xs text-mutedGrey mt-1">
            Exclusive in-house artisan silhouettes
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-luxury font-bold text-mutedGrey">
              Catalogue Value
            </span>
            <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-charcoal">
            ₹{initialProducts.reduce((acc, p) => acc + (p.price || 0), 0).toLocaleString("en-IN")}
          </div>
          <p className="text-xs text-mutedGrey mt-1">
            Average retail: ₹{(
              initialProducts.reduce((acc, p) => acc + (p.price || 0), 0) /
              initialProducts.length
            ).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-xl border border-charcoal/10 shadow-subtle overflow-hidden">
        <div className="p-6 border-b border-charcoal/10 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-charcoal">
              Customer Availability Enquiries
            </h2>
            <p className="text-xs text-mutedGrey mt-0.5">
              Live inquiries received via website forms and product pages
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-semibold text-champagneDark hover:underline inline-flex items-center gap-1"
          >
            <span>View All ({enquiries.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmIvory border-b border-charcoal/10 text-charcoal font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Product / Variant</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {enquiries.slice(0, 5).map((enq) => (
                <tr key={enq.id} className="hover:bg-softStone/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-charcoal">
                    {enq.fullName}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-charcoal font-medium">
                      <Phone className="h-3 w-3 text-mutedGrey" />
                      <span>{enq.mobileNumber}</span>
                    </div>
                    {enq.email && (
                      <span className="text-[10px] text-mutedGrey block mt-0.5">
                        {enq.email}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-charcoal block">
                      {enq.productName || "General Enquiry"}
                    </span>
                    <span className="text-[10px] text-mutedGrey block">
                      Size: {enq.preferredSize || "Any"} • Colour: {enq.preferredColor || "Any"}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        enq.status === "New"
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : enq.status === "Contacted"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleStatusChange(enq.id, e.target.value as Enquiry["status"])
                      }
                      className="px-2 py-1 rounded bg-white border border-charcoal/20 text-[11px] font-medium text-charcoal"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Followed Up">Followed Up</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

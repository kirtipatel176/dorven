"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, Mail, Clock, Filter, CheckCircle2 } from "lucide-react";
import { getEnquiries, updateEnquiryStatus } from "@/lib/enquiryStore";
import { Enquiry, EnquiryStatus } from "@/types/enquiry";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    setEnquiries(getEnquiries());
  }, []);

  const filtered = enquiries.filter(
    (e) => statusFilter === "all" || e.status === statusFilter
  );

  const handleStatusChange = (id: string, newStatus: EnquiryStatus) => {
    updateEnquiryStatus(id, newStatus);
    setEnquiries(getEnquiries());
  };

  const handleSaveNotes = (id: string) => {
    updateEnquiryStatus(id, undefined as unknown as EnquiryStatus, currentNote);
    // Reload
    setEnquiries(getEnquiries());
    setEditingNotesId(null);
  };

  const getDirectWhatsAppReplyUrl = (enq: Enquiry) => {
    // Strip non-digits from customer phone number
    const cleanNumber = enq.mobileNumber.replace(/\D/g, "");
    const formattedNumber = cleanNumber.startsWith("91")
      ? cleanNumber
      : `91${cleanNumber}`;
    const message = `Hello ${enq.fullName}, this is the DORVEN Footwear concierge. We received your enquiry regarding ${enq.productName || "our footwear collection"}.`;
    return `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            Customer Enquiries Desk
          </h1>
          <p className="text-xs text-mutedGrey mt-0.5">
            Manage customer stock availability inquiries and initiate concierge conversations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-charcoal/10 text-xs">
          {["all", "New", "Contacted", "Followed Up", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded font-medium transition-all ${
                statusFilter === st
                  ? "bg-charcoal text-white shadow-xs"
                  : "text-mutedGrey hover:text-charcoal"
              }`}
            >
              {st === "all" ? "All Enquiries" : st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Card Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((enq) => (
          <div
            key={enq.id}
            className="p-6 rounded-xl bg-white border border-charcoal/10 shadow-subtle flex flex-col lg:flex-row justify-between gap-6"
          >
            {/* Left: Customer Info & Product */}
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-charcoal">
                  {enq.fullName}
                </h3>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                    enq.status === "New"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : enq.status === "Contacted"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                >
                  {enq.status}
                </span>
                <span className="text-[11px] text-mutedGrey flex items-center gap-1 ml-auto lg:ml-0">
                  <Clock className="h-3 w-3" />
                  {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Product Badge */}
              <div className="p-3 bg-warmIvory rounded-lg border border-charcoal/5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-champagneDark block">
                    Product Requested
                  </span>
                  <span className="font-semibold text-charcoal">
                    {enq.productBrand ? `${enq.productBrand} — ` : ""}
                    {enq.productName || "General Footwear Enquiry"}
                  </span>
                  {enq.productSku && (
                    <span className="text-[10px] text-mutedGrey block">
                      SKU: {enq.productSku}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="px-2 py-1 rounded bg-white border border-charcoal/10">
                    <span className="text-mutedGrey text-[10px] block">Size</span>
                    <span className="font-bold text-charcoal">{enq.preferredSize || "Not set"}</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-white border border-charcoal/10">
                    <span className="text-mutedGrey text-[10px] block">Colour</span>
                    <span className="font-bold text-charcoal">{enq.preferredColor || "Not set"}</span>
                  </div>
                </div>
              </div>

              {/* Customer Message */}
              <div className="text-xs text-charcoal/90 italic bg-softStone/40 p-3 rounded border border-charcoal/5">
                &ldquo;{enq.message}&rdquo;
              </div>

              {/* Internal Notes */}
              {enq.notes && (
                <div className="text-xs text-mutedGrey">
                  <strong>Atelier Note:</strong> {enq.notes}
                </div>
              )}
            </div>

            {/* Right: Actions & WhatsApp Quick Reply */}
            <div className="lg:w-72 flex flex-col justify-between pt-4 lg:pt-0 lg:border-l lg:border-charcoal/10 lg:pl-6 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-charcoal font-medium">
                  <Phone className="h-4 w-4 text-mutedGrey" />
                  <span>{enq.mobileNumber}</span>
                </div>
                {enq.email && (
                  <div className="flex items-center gap-2 text-mutedGrey">
                    <Mail className="h-4 w-4" />
                    <span>{enq.email}</span>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-mutedGrey mb-1">
                  Update Lead Status
                </label>
                <select
                  value={enq.status}
                  onChange={(e) =>
                    handleStatusChange(enq.id, e.target.value as EnquiryStatus)
                  }
                  className="w-full px-3 py-2 rounded bg-warmIvory border border-charcoal/15 text-xs text-charcoal font-semibold focus:outline-none"
                >
                  <option value="New">New Lead</option>
                  <option value="Contacted">Contacted Customer</option>
                  <option value="Followed Up">Followed Up / Trial Arranged</option>
                  <option value="Closed">Closed / Completed</option>
                </select>
              </div>

              {/* Direct WhatsApp Response Button */}
              <a
                href={getDirectWhatsAppReplyUrl(enq)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="h-4 w-4 fill-white stroke-none" />
                <span>Reply on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-charcoal/10 p-8">
            <p className="text-xs text-mutedGrey">
              No enquiries found under the &ldquo;{statusFilter}&rdquo; status filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

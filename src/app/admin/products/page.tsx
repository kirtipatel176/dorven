"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Trash2, Edit2, CheckCircle2, AlertCircle } from "lucide-react";
import { initialProducts } from "@/data/products";
import { Product, StockStatus } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState("");
  const [newBrand, setNewBrand] = useState("Nike");
  const [newCategory, setNewCategory] = useState<Product["category"]>("Lifestyle");
  const [newPrice, setNewPrice] = useState("14999");
  const [newSku, setNewSku] = useState("");
  const [newImg, setNewImg] = useState("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop");
  const [newDesc, setNewDesc] = useState("");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchBrand = selectedBrand === "all" || p.brand === selectedBrand;
    return matchSearch && matchBrand;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the active catalogue?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleUpdateStock = (productId: string, variantIndex: number, newStatus: StockStatus) => {
    setProducts(
      products.map((p) => {
        if (p.id !== productId) return p;
        const newVariants = [...p.variants];
        if (newVariants[variantIndex]) {
          newVariants[variantIndex] = {
            ...newVariants[variantIndex],
            stockStatus: newStatus,
          };
        }
        return {
          ...p,
          variants: newVariants,
        };
      })
    );
  };

  const handleToggleFeatured = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProd: Product = {
      id: `prod_${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: newTitle,
      brand: newBrand,
      category: newCategory,
      gender: "Unisex",
      description: newDesc || "Curated footwear release with premium comfort and materials.",
      price: Number(newPrice) || 12999,
      formattedPrice: `₹${Number(newPrice || 12999).toLocaleString("en-IN")}`,
      sku: newSku || `DVN-${Date.now().toString().slice(-4)}`,
      primaryImage: newImg,
      galleryImages: [newImg],
      colors: ["Standard"],
      sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
      variants: [
        { id: "v1", size: "UK 7", color: "Standard", sku: `${newSku}-7`, stockStatus: "In Stock" },
        { id: "v2", size: "UK 8", color: "Standard", sku: `${newSku}-8`, stockStatus: "In Stock" },
        { id: "v3", size: "UK 9", color: "Standard", sku: `${newSku}-9`, stockStatus: "In Stock" },
        { id: "v4", size: "UK 10", color: "Standard", sku: `${newSku}-10`, stockStatus: "In Stock" },
      ],
      specifications: {
        upperMaterial: "Certified Leather & Synthetic",
        soleMaterial: "Cushioned EVA Midsole",
        closure: "Lace-up",
        origin: "Global Craft",
      },
      isFeatured: false,
      isRecentlyAdded: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setProducts([newProd, ...products]);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewSku("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-charcoal">
            Products & Stock Inventory
          </h1>
          <p className="text-xs text-mutedGrey mt-0.5">
            Manage catalogue items, variant sizes, and stock availability statuses
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-charcoal text-white text-xs font-semibold rounded hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Footwear</span>
        </button>
      </div>

      {/* Filter Strip */}
      <div className="p-4 bg-white rounded-xl border border-charcoal/10 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-subtle">
        <div className="relative w-full sm:w-80">
          <Search className="h-4 w-4 text-mutedGrey absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or SKU..."
            className="w-full pl-9 pr-3 py-2 bg-warmIvory/50 border border-charcoal/15 rounded text-xs text-charcoal focus:outline-none focus:border-charcoal"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-mutedGrey">Brand:</span>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-3 py-2 bg-warmIvory/50 border border-charcoal/15 rounded text-xs text-charcoal focus:outline-none"
          >
            <option value="all">All Brands ({products.length})</option>
            <option value="DORVEN Signature">DORVEN Signature</option>
            <option value="Nike">Nike</option>
            <option value="Adidas Originals">Adidas Originals</option>
            <option value="New Balance">New Balance</option>
            <option value="Asics">Asics</option>
            <option value="Birkenstock">Birkenstock</option>
            <option value="On Running">On Running</option>
            <option value="Puma">Puma</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-charcoal/10 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmIvory border-b border-charcoal/10 text-charcoal font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Brand & Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Variant Stock Availability</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal/5">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-softStone/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded bg-softStone overflow-hidden flex-shrink-0">
                        <Image
                          src={prod.primaryImage}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-charcoal block line-clamp-1">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-mutedGrey font-mono">
                          {prod.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-charcoal block">
                      {prod.brand}
                    </span>
                    <span className="text-[10px] text-mutedGrey">
                      {prod.category} • {prod.gender}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-charcoal">
                    {prod.formattedPrice || (prod.price ? `₹${prod.price.toLocaleString("en-IN")}` : "On Request")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {prod.variants.slice(0, 4).map((v, idx) => (
                        <div
                          key={v.id || idx}
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-warmIvory border border-charcoal/10 text-[10px]"
                        >
                          <span className="font-bold text-charcoal">{v.size}:</span>
                          <select
                            value={v.stockStatus}
                            onChange={(e) =>
                              handleUpdateStock(prod.id, idx, e.target.value as StockStatus)
                            }
                            className="bg-transparent text-[10px] text-charcoal font-medium border-0 focus:ring-0 p-0 cursor-pointer"
                          >
                            <option value="In Stock">In Stock</option>
                            <option value="Limited Stock">Limited</option>
                            <option value="Out of Stock">OOS</option>
                            <option value="Contact for Availability">On Request</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleFeatured(prod.id)}
                      className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
                        prod.isFeatured
                          ? "bg-amber-100 text-amber-800"
                          : "bg-softStone text-mutedGrey hover:bg-neutral-200"
                      }`}
                    >
                      {prod.isFeatured ? "Featured" : "Regular"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 text-mutedGrey hover:text-rose-600 transition-colors rounded"
                      aria-label="Delete product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Product Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-modal p-6">
            <h3 className="text-base font-bold text-charcoal uppercase tracking-wider mb-4">
              Add New Footwear Model
            </h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Model Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Asics Gel-NYC Cream"
                  className="w-full px-3 py-2 rounded border border-charcoal/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <select
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-charcoal/20"
                  >
                    <option value="DORVEN Signature">DORVEN Signature</option>
                    <option value="Nike">Nike</option>
                    <option value="Adidas Originals">Adidas Originals</option>
                    <option value="New Balance">New Balance</option>
                    <option value="Asics">Asics</option>
                    <option value="Birkenstock">Birkenstock</option>
                    <option value="On Running">On Running</option>
                    <option value="Puma">Puma</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as Product["category"])}
                    className="w-full px-3 py-2 rounded border border-charcoal/20"
                  >
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Sports Performance">Sports Performance</option>
                    <option value="Everyday Essentials">Everyday Essentials</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-charcoal/20"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">SKU</label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="e.g. AS-NYC-01"
                    className="w-full px-3 py-2 rounded border border-charcoal/20"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-charcoal/20"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Brief Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-charcoal/20"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="w-1/2 py-2.5 rounded bg-softStone text-charcoal font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded bg-charcoal text-white font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

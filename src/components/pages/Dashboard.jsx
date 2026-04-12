import { useState } from "react";
import StatCard from "../StatCard";
import OrdersTable from "../OrdersTable";
import DonutChart from "../DonutChart";
import CategoryLegend from "../CategoryLegend";
import TopProductsSection from "../TopProductsSection";
import TopCustomersSection from "../TopCustomersSection";
import {
  stats,
  orders,
  categories,
  topProducts,
  topCustomers,
} from "../../data/dashboardData";

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Dashboard
              </h1>
              <p className="text-slate-600">
                Welcome back! Here's what's happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-500">Today</p>
                <p className="text-lg font-semibold text-slate-900">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-sm cursor-pointer">
                + New Order
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Orders Table */}
          <div className="xl:col-span-2">
            <OrdersTable
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orders={orders}
            />
          </div>

          {/* Sales by Category Donut Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
              Sales by Category
            </h3>
            <div className="flex justify-center mb-6">
              <DonutChart data={categories} />
            </div>
            <CategoryLegend categories={categories} />
          </div>
        </div>

        {/* Bottom Top Products and Top Customers Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopProductsSection products={topProducts} />
          <TopCustomersSection customers={topCustomers} />
        </div>
      </div>
    </div>
  );
}

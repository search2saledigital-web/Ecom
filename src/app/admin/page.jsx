"use client";

import React, { useMemo, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import {
    IndianRupee,
    ShoppingBag,
    Package,
    MessageSquare,
    TrendingUp,
    CalendarDays,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronDown,
} from "lucide-react";

const orders = [
    {
        id: "#ORD-1024",
        customer: "Rahul Sharma",
        product: "Premium Gift Set",
        amount: 2499,
        status: "Delivered",
        date: "2026-10-04",
    },
    {
        id: "#ORD-1023",
        customer: "Priya Mehta",
        product: "Elegant Table Vase",
        amount: 1499,
        status: "Processing",
        date: "2026-10-03",
    },
    {
        id: "#ORD-1022",
        customer: "Amit Verma",
        product: "Office Organizer",
        amount: 1899,
        status: "Pending",
        date: "2026-10-02",
    },
    {
        id: "#ORD-1021",
        customer: "Sneha Kapoor",
        product: "Decorative Showpiece",
        amount: 2299,
        status: "Delivered",
        date: "2026-09-29",
    },
    {
        id: "#ORD-1020",
        customer: "Karan Malhotra",
        product: "Corporate Welcome Kit",
        amount: 3599,
        status: "Processing",
        date: "2026-09-25",
    },
    {
        id: "#ORD-1019",
        customer: "Neha Gupta",
        product: "Luxury Desk Set",
        amount: 1999,
        status: "Delivered",
        date: "2026-09-18",
    },
];

const stats = [
    {
        title: "Total Revenue",
        value: "₹1,24,500",
        change: "+12.5%",
        icon: IndianRupee,
        positive: true,
    },
    {
        title: "Total Orders",
        value: "248",
        change: "+8.2%",
        icon: ShoppingBag,
        positive: true,
    },
    {
        title: "Total Products",
        value: "86",
        change: "+4.3%",
        icon: Package,
        positive: true,
    },
    {
        title: "Total Inquiries",
        value: "42",
        change: "-2.4%",
        icon: MessageSquare,
        positive: false,
    },
];

export default function AdminDashboard() {
    const [filter, setFilter] = useState("monthly");
    const [selectedDate, setSelectedDate] = useState("2026-10-04");
    const [search, setSearch] = useState("");

    const filteredOrders = useMemo(() => {
        const selected = new Date(`${selectedDate}T12:00:00`);

        return orders.filter((order) => {
            const orderDate = new Date(`${order.date}T12:00:00`);

            let matchesDate = true;

            if (filter === "today") {
                matchesDate =
                    order.date === selectedDate;
            }

            if (filter === "week" || filter === "lastweek") {
                const day = selected.getDay();
                const mondayOffset = day === 0 ? 6 : day - 1;

                const thisMonday = new Date(selected);
                thisMonday.setDate(
                    selected.getDate() - mondayOffset
                );

                const start = new Date(thisMonday);
                const end = new Date(thisMonday);

                if (filter === "week") {
                    end.setDate(start.getDate() + 6);
                } else {
                    start.setDate(start.getDate() - 7);
                    end.setDate(end.getDate() - 1);
                }

                matchesDate =
                    orderDate >= start && orderDate <= end;
            }

            if (filter === "monthly") {
                matchesDate =
                    orderDate.getMonth() === selected.getMonth() &&
                    orderDate.getFullYear() === selected.getFullYear();
            }

            const matchesSearch =
                order.id.toLowerCase().includes(search.toLowerCase()) ||
                order.customer.toLowerCase().includes(search.toLowerCase()) ||
                order.product.toLowerCase().includes(search.toLowerCase());

            return matchesDate && matchesSearch;
        });
    }, [filter, selectedDate, search]);

    return (
        <div className="min-h-screen bg-[#F5F5F3]">
            <Sidebar />

            <main className="min-h-screen pt-16 lg:ml-[270px] lg:pt-0">
                <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A47D12]">
                                Overview
                            </p>
                            <h1 className="mt-2 font-serif text-3xl font-medium text-[#111111] sm:text-4xl">
                                Dashboard
                            </h1>
                            <p className="mt-2 text-xs text-gray-500">
                                Welcome back! Here's what's happening with your store.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3">
                            <CalendarDays
                                size={17}
                                className="text-[#A47D12]"
                            />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                                className="w-full bg-transparent text-xs font-medium text-[#111111] outline-none"
                                aria-label="Select dashboard date"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                        {[
                            { label: "Today", value: "today" },
                            { label: "This Week", value: "week" },
                            { label: "Last Week", value: "lastweek" },
                            { label: "Monthly", value: "monthly" },
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setFilter(item.value)}
                                className={`rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${
                                    filter === item.value
                                        ? "bg-[#111111] text-white"
                                        : "border border-black/10 bg-white text-gray-500 hover:border-[#C9A227] hover:text-[#111111]"
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.title}
                                    className="rounded-2xl border border-black/[0.04] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A227]/10 text-[#A47D12]">
                                            <Icon size={20} />
                                        </div>

                                        <span
                                            className={`flex items-center gap-1 text-[10px] font-semibold ${
                                                stat.positive
                                                    ? "text-emerald-600"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {stat.positive ? (
                                                <ArrowUpRight size={14} />
                                            ) : (
                                                <ArrowDownRight size={14} />
                                            )}
                                            {stat.change}
                                        </span>
                                    </div>

                                    <p className="mt-5 text-xs text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-2 text-[10px] text-gray-400">
                                        Compared to previous period
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Lower Dashboard */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_300px]">
                        {/* Orders Table */}
                        <div className="min-w-0 overflow-hidden rounded-2xl border border-black/[0.04] bg-white shadow-sm">
                            <div className="flex flex-col justify-between gap-4 border-b border-black/[0.06] p-5 sm:flex-row sm:items-center sm:p-6">
                                <div>
                                    <h2 className="font-serif text-xl font-medium text-[#111111]">
                                        Recent Orders
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Your latest customer orders
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 rounded-lg border border-black/10 px-3 py-2">
                                    <Search
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    <input
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search orders..."
                                        className="w-full min-w-0 bg-transparent text-xs outline-none sm:w-36"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[650px] text-left">
                                    <thead className="bg-[#FAFAF8]">
                                        <tr className="text-[9px] uppercase tracking-[0.15em] text-gray-500">
                                            <th className="px-5 py-4 font-semibold">
                                                Order ID
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Customer
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Product
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Amount
                                            </th>
                                            <th className="px-5 py-4 font-semibold">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredOrders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="border-t border-black/[0.05] text-xs transition-colors hover:bg-[#FAFAF8]"
                                            >
                                                <td className="px-5 py-4 font-semibold text-[#A47D12]">
                                                    {order.id}
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4 font-medium text-[#111111]">
                                                    {order.customer}
                                                </td>
                                                <td className="px-5 py-4 text-gray-500">
                                                    {order.product}
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#111111]">
                                                    ₹{order.amount.toLocaleString("en-IN")}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${
                                                            order.status === "Delivered"
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : order.status === "Processing"
                                                                ? "bg-blue-50 text-blue-600"
                                                                : "bg-amber-50 text-amber-600"
                                                        }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}

                                        {filteredOrders.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={5}
                                                    className="px-5 py-12 text-center text-sm text-gray-400"
                                                >
                                                    No orders found for this filter.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Summary */}
                        <div className="space-y-5">
                            <div className="rounded-2xl bg-[#111111] p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                                        Store Performance
                                    </p>
                                    <TrendingUp
                                        size={18}
                                        className="text-[#C9A227]"
                                    />
                                </div>

                                <h3 className="mt-5 font-serif text-3xl text-[#C9A227]">
                                    82.5%
                                </h3>

                                <p className="mt-2 text-xs text-white/50">
                                    Overall store growth
                                </p>

                                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-[82.5%] rounded-full bg-[#C9A227]" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-black/[0.04] bg-white p-6 shadow-sm">
                                <h3 className="font-serif text-xl text-[#111111]">
                                    Quick Overview
                                </h3>

                                <div className="mt-5 space-y-5">
                                    {[
                                        {
                                            label: "Pending Orders",
                                            value: "12",
                                            color: "bg-amber-500",
                                        },
                                        {
                                            label: "Active Products",
                                            value: "86",
                                            color: "bg-emerald-500",
                                        },
                                        {
                                            label: "New Inquiries",
                                            value: "08",
                                            color: "bg-blue-500",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`h-2 w-2 rounded-full ${item.color}`}
                                                />
                                                <span className="text-xs text-gray-500">
                                                    {item.label}
                                                </span>
                                            </div>

                                            <span className="text-sm font-semibold text-[#111111]">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
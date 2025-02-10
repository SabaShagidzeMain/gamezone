"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";
import Image from "next/image";

interface Order {
  id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  created_at: string;
  user_id: string;
}

const OrderInfo: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }
      setUserId(user?.id ?? null);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="w-full md:w-[30rem] h-[15rem] md:h-[30rem] rounded-[5px] bg-[var(--background-color)] shadow-[var(--box-shadow)] p-8 flex flex-col gap-4 text-[var(--text-color)]">
      <h2 className="font-bold">Your Orders</h2>
      <div className="flex flex-col overflow-y-auto max-h-full shaow-[var(--box-shadow)]">
        <ul className="flex flex-col gap-2">
          {orders.map((order) => (
            <li key={order.id} className="flex gap-2">
              <div className="">
                <Image
                  src={order.product_image}
                  alt={order.product_name}
                  width={60}
                  height={60}
                />
              </div>
              <div className="text-[0.8rem] flex flex-col justify-center items-start">
                <p>Product: {order.product_name}</p>
                <p>Price: {order.product_price / 100} GEL</p>
                <p>
                  Purchase Date: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderInfo;

"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/utilities/supabase/supabase";
import styles from "./orderinfo.module.css";
import Image from "next/image";

const OrderInfo = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
      setUserId(user?.id);
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
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className={styles.orderWrapper}>
      <h2>Your Orders</h2>
      <div className={styles.orderContainer}>
        <ul>
          {orders.map((order) => (
            <li key={order.id} className={styles.orderItem}>
              <div className={styles.orderItemLeft}>
                <Image
                  src={order.product_image}
                  alt={order.product_name}
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.orderItemRight}>
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

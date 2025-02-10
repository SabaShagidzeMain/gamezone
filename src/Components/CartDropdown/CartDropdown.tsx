import Image from "next/image";
import { CartProvider } from "@/utilities/CartContext/CartContext";
import { Game } from "@/utilities/NavbarTypes/NavbarTypes";

interface CartDropdownProps {
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cart: Game[];
  removeFromCart: (id: string) => void;
  locale: string;
}

const CartDropdown = ({
  isCartOpen,
  setIsCartOpen,
  cart,
  removeFromCart,
  locale,
}: CartDropdownProps) => {
  return (
    isCartOpen && (
      <div className="cart-dropdown">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <Image
                    src={item.main_images.disc}
                    alt={item.name}
                    width={40}
                    height={40}
                  />
                  <div>{item.name}</div>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button>Go to Checkout</button>
          </>
        )}
      </div>
    )
  );
};

export default CartDropdown;

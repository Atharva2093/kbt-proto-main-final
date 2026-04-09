import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CartProvider, useCart } from "@/contexts/cart-context"

function CartConsumer() {
  const { items, addItem, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart()

  return (
    <div>
      <p data-testid="count">{items.length}</p>
      <p data-testid="total">{getTotalPrice()}</p>
      <button
        onClick={() =>
          addItem({
            material: "Insulation Panel",
            supplier: "ACME",
            quantity: 2,
            unitPrice: 100,
            availability: "in-stock",
          })
        }
      >
        add
      </button>
      <button onClick={() => updateQuantity("Insulation Panel", 4)}>update</button>
      <button onClick={() => removeItem("Insulation Panel")}>remove</button>
      <button onClick={clearCart}>clear</button>
    </div>
  )
}

describe("CartProvider", () => {
  test("adds items and calculates totals", async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    )

    await user.click(screen.getByRole("button", { name: "add" }))

    expect(screen.getByTestId("count")).toHaveTextContent("1")
    expect(screen.getByTestId("total")).toHaveTextContent("200")
  })

  test("updates quantity for existing item", async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    )

    await user.click(screen.getByRole("button", { name: "add" }))
    await user.click(screen.getByRole("button", { name: "update" }))

    expect(screen.getByTestId("total")).toHaveTextContent("400")
  })

  test("removes and clears items", async () => {
    const user = userEvent.setup()
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    )

    await user.click(screen.getByRole("button", { name: "add" }))
    await user.click(screen.getByRole("button", { name: "remove" }))

    expect(screen.getByTestId("count")).toHaveTextContent("0")

    await user.click(screen.getByRole("button", { name: "add" }))
    await user.click(screen.getByRole("button", { name: "clear" }))

    expect(screen.getByTestId("count")).toHaveTextContent("0")
  })
})

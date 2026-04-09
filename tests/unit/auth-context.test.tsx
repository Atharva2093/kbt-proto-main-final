import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuth } from "@/contexts/auth-context"

function AuthConsumer() {
  const { user, isAuthenticated, login, logout, signup } = useAuth()

  return (
    <div>
      <p data-testid="auth-state">{isAuthenticated ? "authenticated" : "anonymous"}</p>
      <p data-testid="user-email">{user?.email ?? "none"}</p>
      <button onClick={() => login("demo@example.com", "password")}>login</button>
      <button onClick={() => signup("new@example.com", "password123", "New", "User", "Thermo Labs")}>
        signup
      </button>
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

describe("AuthProvider", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  test("logs in and persists user", async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await user.click(screen.getByRole("button", { name: "login" }))

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated")
    })

    expect(screen.getByTestId("user-email")).toHaveTextContent("demo@example.com")
    expect(window.localStorage.getItem("user")).toContain("demo@example.com")
  })

  test("signup creates a new authenticated user", async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await user.click(screen.getByRole("button", { name: "signup" }))

    await waitFor(() => {
      expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated")
    })

    expect(screen.getByTestId("user-email")).toHaveTextContent("new@example.com")
  })

  test("logout clears auth state", async () => {
    const user = userEvent.setup()
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    )

    await user.click(screen.getByRole("button", { name: "login" }))
    await waitFor(() => expect(screen.getByTestId("auth-state")).toHaveTextContent("authenticated"))

    await user.click(screen.getByRole("button", { name: "logout" }))

    await waitFor(() => expect(screen.getByTestId("auth-state")).toHaveTextContent("anonymous"))
    expect(window.localStorage.getItem("user")).toBeNull()
  })
})

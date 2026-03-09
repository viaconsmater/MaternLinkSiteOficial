import { render, screen } from "@testing-library/react";

import Login from "../new";

test("renders login page", () => {
  render(<Login />);
  const pageTitle = screen.getByText(/Entre na sua conta/i);
  expect(pageTitle).toBeInTheDocument();
});

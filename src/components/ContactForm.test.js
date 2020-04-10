import React from "react";
import { render, fireEvent, waitForDomChange } from "@testing-library/react";
import ContactForm from "./ContactForm";

//test if titles are correct
test("First Name, Last Name and Email are appearing", () => {
  //Arrange
  const { getByText } = render(<ContactForm />);
  //Act
  //Assert
  const firstName = getByText(/First Name/i);
  const lastName = getByText(/Last Name/i);
  const Email = getByText(/Email/i);
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
  expect(Email).toBeInTheDocument();
});

test("test to sure that the inputs can be filled in",() => {
  async () => {
    const { getByLabelText, findByTestId } = render(<ContactForm />);
    const firstNameInput = getByLabelText(/First/i);
    const lastNameInput = getByLabelText(/Last/i);
    const emailInput = getByLabelText(/Email/i);
    const messageInput = getByLabelText(/Message/i);
    const checkBoxInput = getByLabelText(/Agreement/i);
    fireEvent.change(firstNameInput, { target: { value: "hue" } });
    fireEvent.change(lastNameInput, { target: { value: "will" } });
    fireEvent.change(emailInput, { target: { value: "email@mail.com" } });
    fireEvent.change(messageInput, { target: { value: "greeting" } });
    fireEvent.click(checkBoxInput);
    expect(checkBoxInput).toBeTruthy();
    expect(firstNameInput.value).toBe("hue");
    expect(lastNameInput.value).toBe("will");
    expect(emailInput.value).toBe("email@mail.com");
    expect(messageInput.value).toBe("greeting");
    fireEvent.click(getByText(/submit/i));
    const formData = await findByTestId("information");
    expect(formData).toBeInTheDocument();
  };
});

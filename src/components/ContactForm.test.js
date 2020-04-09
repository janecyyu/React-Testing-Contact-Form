import React from "react";
import { render, fireEvent } from "@testing-library/react";
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

test("form submit adds new data to the list", async () => {
  const { getByLabelText, getByText, findByTestId } = render(<ContactForm />);
  const fistNameInput = getByLabelText(/First Name/i);
  const LastNameInput = getByLabelText(/Last Name/i);
  const EmailInput = getByLabelText(/Email/i);
  const MessageInput = getByLabelText(/Message/i);
  //Act
  fireEvent.change(fistNameInput, { target: { value: "Jo" } });
  fireEvent.change(LastNameInput, { target: { value: "Ch" } });
  fireEvent.change(EmailInput, { target: { value: "John@gmail.com" } });
  fireEvent.change(MessageInput, { target: { value: "John loves dogs" } });
  //Assert
  expect(fistNameInput.value).toBe("Jo");
  expect(LastNameInput.value).toBe("Ch");
  expect(EmailInput.value).toBe("John@gmail.com");
  expect(MessageInput.value).toBe("John loves dogs");
  //click submit
  fireEvent.click(getByText(/submit/i));
  const formData = await findByTestId("information");
  expect(formData).toBeInTheDocument();
});



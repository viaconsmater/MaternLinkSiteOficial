import { render, screen } from "@testing-library/react";
import React from "react";

import StepFour from "../stepFour";
import StepOne from "../stepOne";
import StepThree from "../stepThree";
import StepTwo from "../stepTwo";

describe("Reset Password Pages", () => {
  it("should be able to render first step", () => {
    render(<StepOne />);

    expect(screen.getByText("Esqueceu sua senha?")).toBeInTheDocument();
    expect(screen.getByText("Qual é o seu")).toBeInTheDocument();
    expect(screen.getByText("email?")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Enviaremos um código para o seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Continuar")).toBeInTheDocument();
  });

  it("should be able to render second step", () => {
    const sid = "osidehumastringmuitograndepraautenticaroresetdesenha";
    render(<StepTwo sid={sid} />);

    expect(screen.getByText("Esqueceu sua senha?")).toBeInTheDocument();
    expect(screen.getByText("Insira o")).toBeInTheDocument();
    expect(screen.getByText("código")).toBeInTheDocument();
    expect(screen.getByText("Digite o código de 6 dígitos enviado para")).toBeInTheDocument();
    expect(screen.getByText("Continuar")).toBeInTheDocument();
  });

  it("should be able to render second step", () => {
    const sid = "osidehumastringmuitograndepraautenticaroresetdesenha";
    const code = "123456";
    render(<StepThree sid={sid} code={code} />);

    expect(screen.getByText("Esqueceu sua senha?")).toBeInTheDocument();
    expect(screen.getByText("Crie uma")).toBeInTheDocument();
    expect(screen.getByText("nova senha")).toBeInTheDocument();
    expect(screen.getByText("Nova senha")).toBeInTheDocument();
    expect(screen.getByText("Confirme sua nova senha")).toBeInTheDocument();
    expect(screen.getByText("Trocar senha")).toBeInTheDocument();
  });

  it("should be able to render second step", () => {
    render(<StepFour />);

    expect(screen.getByText("Sucesso!")).toBeInTheDocument();
    expect(screen.getByText("Você trocou sua senha com êxito.")).toBeInTheDocument();
  });
});

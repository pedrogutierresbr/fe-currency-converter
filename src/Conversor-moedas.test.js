import React from "react";
import ReactDOM from "react-dom";
import ConversorMoedas from "./Conversor-moedas";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

describe("teste do componente de conversao de moedas", () => {
    it("deve renderizar o componente sem erros", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ConversorMoedas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("deve simular uma conversao de moedas", async () => {
        const { findByTestId, getByTestId } = render(<ConversorMoedas />);
        axiosMock.get.mockResolvedValueOnce({
            data: { success: true, rates: { USD: 1.181215, BRL: 6.037902 } },
        });
        fireEvent.click(getByTestId("btn-converter"));
        const modal = await findByTestId("modal");
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(modal).toHaveTextContent("1 BRL = 0.20 USD");
    });
});

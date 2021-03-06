import React, { useState } from "react";
import "./Conversor-moedas.css";
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListarMoedas from "./components/Listar-moedas";
import axios from "axios";

function ConversorMoedas() {
    const FIXER_URL =
        "http://data.fixer.io/api/latest?access_key=decfec54a4fe3f6b5302ac8d40cb2132";

    const [valor, setValor] = useState("1");
    const [moedaDe, setMoedaDe] = useState("BRL");
    const [moedaPara, setMoedaPara] = useState("USD");
    const [exibirSpinner, setExibirSpinner] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);
    const [resultadoConversao, setResultadoConversao] = useState("");
    const [exibirMsgErro, setExibirMsgErro] = useState(false);

    function handleValor(event) {
        setValor(event.target.value.replace(/\D/g, ""));
    }

    function handleMoedaDe(event) {
        setMoedaDe(event.target.value);
    }

    function handleMoedaPara(event) {
        setMoedaPara(event.target.value);
    }

    function handleFecharModal(event) {
        setValor("1");
        setMoedaDe("BRL");
        setMoedaPara("USD");
        setFormValidado(false);
        setExibirModal(false);
    }

    function converter(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            setExibirSpinner(true);
            axios
                .get(FIXER_URL)
                .then((res) => {
                    const cotacao = obterCotacao(res.data);
                    if (cotacao) {
                        setResultadoConversao(
                            `${valor} ${moedaDe} = ${cotacao} ${moedaPara}`
                        );
                        setExibirModal(true);
                        setExibirSpinner(false);
                        setExibirMsgErro(false);
                    } else {
                        exibirErro();
                    }
                })
                .catch((err) => exibirErro());
        }
    }

    function obterCotacao(dadosCotacao) {
        if (!dadosCotacao || dadosCotacao.success !== true) {
            return false;
        }

        const cotacaoDe = dadosCotacao.rates[moedaDe];
        const cotacaoPara = dadosCotacao.rates[moedaPara];
        const calculoCotacao = (cotacaoPara / cotacaoDe) * valor; //formula para obter cotacao usando EURO como base
        return calculoCotacao.toFixed(2);
    }

    function exibirErro() {
        setExibirMsgErro(true);
        setExibirSpinner(false);
    }

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-5">Conversor de moedas</h1>
            <Alert variant="danger" show={exibirMsgErro}>
                Erro obtendo dados de convers??o, <strong>tente novamente!</strong>
            </Alert>
            <Jumbotron className="p-5">
                <Form onSubmit={converter} noValidate validated={formValidado}>
                    <Form.Row>
                        <Col sm="3">
                            <Form.Control
                                className="text-center"
                                placeholder="0"
                                value={valor}
                                onChange={handleValor}
                                required
                            />
                        </Col>
                        <Col sm="3">
                            <Form.Control
                                as="select"
                                value={moedaDe}
                                onChange={handleMoedaDe}
                            >
                                <ListarMoedas />
                            </Form.Control>
                        </Col>
                        <Col
                            sm="1"
                            className="d-flex justify-content-center align-items-center"
                        >
                            <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </Col>
                        <Col sm="3">
                            <Form.Control
                                as="select"
                                value={moedaPara}
                                onChange={handleMoedaPara}
                            >
                                <ListarMoedas />
                            </Form.Control>
                        </Col>
                        <Col sm="2">
                            <Button
                                variant="success"
                                type="submit"
                                data-testid="btn-converter"
                            >
                                <span className={exibirSpinner ? "" : "hidden"}>
                                    <Spinner animation="border" size="sm" />
                                </span>
                                <span className={exibirSpinner ? "hidden" : ""}>
                                    Converter
                                </span>
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>

                <Modal
                    show={exibirModal}
                    onHide={handleFecharModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Convers??o</Modal.Title>
                    </Modal.Header>
                    <Modal.Body data-testid="modal">{resultadoConversao}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Nova Convers??o
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}

export default ConversorMoedas;

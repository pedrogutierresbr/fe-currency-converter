import React, { useState } from "react";
import "./Conversor-moedas.css";
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListarMoedas from "./components/Listar-moedas";

function ConversorMoedas() {
    const [valor, setValor] = useState("1");
    const [moedaDe, setMoedaDe] = useState("BRL");
    const [moedaPara, setMoedaPara] = useState("USD");
    const [exibirSpinner, setExibirSpinner] = useState(false);
    const [formValidado, setFormValidado] = useState(false);

    function handleValor(event) {
        setValor(event.target.value.replace(/\D/g, ""));
    }

    function handleMoedaDe(event) {
        setMoedaDe(event.target.value);
    }

    function handleMoedaPara(event) {
        setMoedaPara(event.target.value);
    }

    function converter(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            //TODO implementar a chamada ao Fixer.io
        }
    }

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-5">Conversor de moedas</h1>
            <Alert variant="danger" show={false}>
                Erro obtendo dados de conversão, <strong>tente novamente!</strong>
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
                            <Button variant="success" type="submit">
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

                <Modal show={false} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Conversão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Resultado da conversão aqui.....</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success">Nova Conversão</Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </div>
    );
}

export default ConversorMoedas;

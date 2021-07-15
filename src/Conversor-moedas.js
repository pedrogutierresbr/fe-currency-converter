import React from "react";
import "./Conversor-moedas.css";
import { Jumbotron, Button, Form, Col, Spinner, Alert, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListarMoedas from "./components/Listar-moedas";

function ConversorMoedas() {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-5">Conversor de moedas</h1>
            <Alert variant="danger" show={false}>
                Erro obtendo dados de conversão, <strong>tente novamente!</strong>
            </Alert>
            <Jumbotron className="p-5">
                <Form>
                    <Form.Row>
                        <Col sm="3">
                            <Form.Control
                                className="text-center"
                                placeholder="0"
                                value={1}
                                required
                            />
                        </Col>
                        <Col sm="3">
                            <Form.Control as="select">
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
                            <Form.Control as="select">
                                <ListarMoedas />
                            </Form.Control>
                        </Col>
                        <Col sm="2">
                            <Button variant="success">
                                <Spinner animation="border" size="sm" />
                                Converter
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

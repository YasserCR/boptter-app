import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpform from "../../components/SignUpform";
import SignInForm from "../../components/SingInForm";
import Logo from "../../assets/png/logo.png";
import LogoWhite from "../../assets/png/logo-white.png";

import "./SignInSignUp.scss";

export default function SignInUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showmodal, setShowmodal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowmodal(true);
    setContentModal(content);
  };

  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowmodal={setShowmodal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showmodal} setShow={setShowmodal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

function LeftComponent() {
  return (
    <Col className="signin-signup__left" xs={6}>
      <img src={Logo} alt="Clontter" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Enterate de que está hablando la gente
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Unete a la conversación
        </h2>
      </div>
    </Col>
  );
}
function RightComponent(props) {
  const { openModal, setShowmodal, setRefreshCheckLogin } = props;

  return (
    <Col className="signin-signup__right" xs={6}>
      <div>
        <img src={LogoWhite} alt="C" />
        <h2>Mira lo que está pasando en el mundo</h2>
        <h3>Unete hoy mismo</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpform setShowmodal={setShowmodal} />)}
        >
          Registrate
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Iniciar sesión
        </Button>
      </div>
    </Col>
  );
}

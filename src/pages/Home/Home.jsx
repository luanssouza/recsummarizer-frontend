import React, { Component } from "react";

// Bootstrap imports
import { Button, Container, Form } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { accept: false };
  }

  handleChangeAccept = () => {
    this.setState({ accept: !this.state.accept });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.history.push("/demographic");
  };

  render() {
    return (
      <Container>
        <h1 className="text-center">
          TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO
        </h1>
        <hr />
        <p>
          Você está sendo convidado(a) como voluntário(a) a participar da
          pesquisa: “Personalização de Explicações em Recomendação com
          Diferentes Níveis de Detalhamento Usando Revisões de Usuários”.
        </p>

        <p>
          A presente pesquisa visa estudar como as explicações podem contribuir
          para a transparência e experiência do usuário em sistemas de
          recomendação. A justificativa da pesquisa é a busca por explicações
          persuasivas e efetivas, dando ao usuário a chance de tomar melhores
          decisões frente a uma lista de recomendações. O objetivo deste
          trabalho é desenvolver um algoritmo capaz de gerar explicações
          personalizadas com diferentes níveis de detalhamento para
          recomendações.
        </p>

        <p>
          Sua participação é voluntária e em qualquer fase da pesquisa você
          poderá interromper o experimento, recusar-se a participar ou retirar
          seu consentimento, sem penalização alguma. Você será esclarecido(a)
          sobre a pesquisa em qualquer aspecto que desejar. Seus dados serão
          tratados de maneira anônima e confidêncial, deste modo, você não será
          identificado(a) em nenhuma publicação resultante deste estudo.
        </p>

        <p>
          A coleta de dados ocorrerá de maneira online nas próximas páginas, na
          seguinte ordem:
        </p>

        <ul>
          <li>
            Formulário para coleta de informações demográficas (faixa-etária,
            gênero e nível de escolaridade);
          </li>
          <li>
            Modelagem do perfil do usuário (pesquisa e avaliação de itens de sua
            preferência);
          </li>
          <li>
            Apresentação da recomendação junto a uma explicação e a um
            questionário para avaliação;
          </li>
          <li>
            Apresentação da recomendação junto a duas explicações e um
            questionário de avaliação das explicações;
          </li>
          <li>Encerramento do experimento.</li>
        </ul>

        <p>
          O tempo estimado para o experimento é de aproximadamente 15 (quinze)
          minutos. Não há benefícios diretos aos participantes. Existe um
          desconforto e risco mínimo na participação da coleta de dados, pois os
          itens e suas explicações podem gerar pensamentos e sensações
          negativas. Nesse sentido, é importante destacar que a qualquer momento
          você poderá interromper o preenchimento dos formulários.
        </p>

        <p>
          Você receberá uma via do Termo de Consentimento Livre e Esclarecido
          assinada pelo pesquisador por meio do e-mail informado ao final deste
          termo.
        </p>

        <p>
          É garantida indenização em casos de danos, comprovadamente,
          decorrentes da participação na pesquisa, por meio de decisão judicial
          ou extrajudicial. Não há qualquer valor econômico, a receber ou a
          pagar, pela participação. No entanto, caso haja qualquer despesa
          decorrente da participação na pesquisa, haverá ressarcimento na forma
          de compensação material, exclusivamente de despesas do participante e
          seus acompanhantes, quando necessário, tais como despesas
          hospitalares, consulta médica no hospital, transporte e alimentação,
          entre outras.
        </p>

        <p>
          Projeto Aprovado pelo Comitê de Ética em Pesquisa com Seres Humanos da   
          {" " + process.env.REACT_APP_COMMITTEE_NAME}.
          <br />
          Endereço: {process.env.REACT_APP_COMMITTEE_ADDRESS}
          <br />
          E-mail: {process.env.REACT_APP_COMMITTEE_MAIL}
          <br />
          Fone: {process.env.REACT_APP_COMMITTEE_PHONE}
          <br />
          Número CAAE: {process.env.REACT_APP_COMMITTEE_CAAE}
          <br />
          Número do Parecer de Aprovação da pesquisa pelo CEPH/FZEA:
          {process.env.REACT_APP_COMMITTEE_NUM}
          <br />
          Data de Aprovação: {process.env.REACT_APP_COMMITTEE_APPROVAL}
        </p>

        <p>
          Durante todo o período da pesquisa você poderá entrar em contato e
          sanar dúvidas com o pesquisador responsável:
          <br /> {process.env.REACT_APP_RESEACHER_NAME}
          <br /> E-mail: {process.env.REACT_APP_RESEACHER_MAIL}
          <br /> Fone: {process.env.REACT_APP_RESEACHER_PHONE}
        </p>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="userAccept">
            <Form.Check
              type="checkbox"
              label="Declaro que li e estou ciente das informações acima e concordo em participar da pesquisa diante dos procedimentos informados."
              value={this.state.accept}
              onChange={this.handleChangeAccept}
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={!this.state.accept}>
            Próximo
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Home;

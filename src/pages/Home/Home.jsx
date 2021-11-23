import React, { Component } from "react";

// Bootstrap imports
import { Button, Container, Form } from "react-bootstrap";

// Services
import {
  getTcleUrl
} from "../../services/recommender";

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

        <h2>Justificativa e Objetivos</h2>
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

        <h2>
          Garantia de Esclarecimento, Liberdade de Recusa e Garantia de Sigilo
        </h2>
        <p>
          Sua participação é voluntária e em qualquer fase da pesquisa você
          poderá interromper o experimento, recusar-se a participar ou retirar
          seu consentimento, sem penalização alguma. Você será esclarecido(a)
          sobre a pesquisa em qualquer aspecto que desejar. Seus dados serão
          tratados de maneira anônima e confidencial, deste modo, você não será
          identificado(a) em nenhuma publicação resultante deste estudo.
        </p>

        <h2>Abordagem e Procedimentos</h2>

        <p>
          A abordagem será feita de maneira online, por meio de redes sociais e
          e-mail, e os experimentos serão feitos através deste site. O tempo
          estimado para o experimento é de aproximadamente 15 (quinze) minutos.
          A coleta de dados será feita em inglês, na seguinte ordem:
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

        <h2>Riscos e Benefícios</h2>
        <p>
          Não há benefícios diretos aos participantes. Existe o risco do
          participante se sentir constrangido em relação aos itens e
          explicações, pois estes podem gerar algum pensamento ou sensação
          negativa, ou em responder alguma pergunta que não se sinta à vontade.
          Existe um desconforto em relação ao tempo gasto para responder o
          questionário. Nesse sentido, é importante destacar que a qualquer
          momento você poderá interromper sua participação.
        </p>

        <h2>Garantia de Ressarcimento e Indenização</h2>
        <p>
          É garantida a indenização em casos de danos, comprovadamente,
          decorrentes da participação na pesquisa, por meio de decisão judicial
          ou extrajudicial. Não há qualquer valor econômico, a receber ou a
          pagar, pela participação. No entanto, caso haja qualquer despesa
          decorrente da participação na pesquisa, haverá ressarcimento na forma
          de compensação material, exclusivamente de despesas do participante e
          seus acompanhantes, quando necessário, tais como despesas
          hospitalares, consulta médica no hospital, transporte e alimentação,
          entre outras.
        </p>

        <h2>Informações Adicionais</h2>

        <h3>Comitê de Ética</h3>
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
          Número do Parecer de Aprovação da pesquisa pelo CEPH/FZEA: {process.env.REACT_APP_COMMITTEE_NUM}
          <br />
          Data de Aprovação: {process.env.REACT_APP_COMMITTEE_APPROVAL}
        </p>

        <h3>Pesquisador Responsável</h3>
        <p>
          {process.env.REACT_APP_RESEACHER_NAME}
          <br /> E-mail: {process.env.REACT_APP_RESEACHER_MAIL}
          <br /> Fone: {process.env.REACT_APP_RESEACHER_PHONE}
        </p>

        <p>
          <a href={getTcleUrl()} target="_blank" rel="noreferrer">Clique aqui para baixar uma cópia deste TCLE.</a>
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

          <Button
            variant="primary"
            type="submit"
            disabled={!this.state.accept}
            className="float-right"
          >
            Próximo
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Home;

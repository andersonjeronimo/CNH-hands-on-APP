import { useState, useEffect } from 'react';
import axios from 'axios';

import priceModel from '../../assets/utils/price-model.json';

function RegisterExplanation() {

    const [priceData, setPriceData] = useState(priceModel);

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_PRICE_API_URL)
            .then((response) => {
                setPriceData(response.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (

        <div className="container mt-lg-5 mb-lg-5">
            <div className="accordion" id="accordionPanelsStayOpen">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse1" aria-expanded="true" aria-controls="panelsStayOpen-collapse1">
                            <strong>Como funciona a plataforma:</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse1" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    Você instrutor se cadastra inserindo nome, e-mail, contato whatsapp, Estado e Cidade que deseja ministrar suas aulas, categorias que ensina e se usa carro próprio ou carro do aluno.
                                </p>
                                <p>
                                    Com base nessas informações, o aluno filtra o profissional de acordo com a necessidade e realiza contato com aquele que escolher. A partir de então, a negociação quanto a valores e execução das aulas é com você, sem qualquer interferência da plataforma.
                                </p>
                                <p>
                                    Isso traz liberdade para o profissional, que não ficará engessado em agendas pré-definidas, além de permitir negociação dos valores e até criação de pacotes com mais aulas.
                                </p>
                                <p>
                                    <strong>
                                        <i>
                                            Tudo muito simples, prático e objetivo.
                                        </i>
                                    </strong>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse2"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapse2">
                            <strong>O que a plataforma oferece:</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse2" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    <ul>
                                        <li>Divulgação do seu serviço para novos alunos (que o encontrarão com base na região, categoria de ensino (A/B) e se usa veículo próprio ou veículo do aluno)</li>
                                        <li>Perfil profissional online (exposição automática após o filtro realizado pelo aluno)</li>
                                        <li>Maior alcance regional (o aluno poderá pesquisar baseado na cidade, o que traz proximidade e facilidade para aplicação das aulas, além de reconhecimento local)</li>
                                        <li>Contato direto via WhatsApp (o contato é realizado inteireamente entre aluno x instrutor, sem qualquer intermediação da plataforma)</li>
                                        <li>Autonomia total nas negociações (agende horários e locais, negocie valores, ajuste necessidades específicas de seus alunos. Ganhe seu mercado de trabalho com liberdade)</li>
                                        <li>Sem vínculo empregatício ou intermediação (você instrutor só paga para a plataforma pelo anúncio, não pagará nenhum valor extra em decorrência das aulas negociadas)</li>
                                    </ul>
                                </p>
                                <p>
                                    <strong>
                                        Importante:
                                    </strong>
                                    <p>
                                        <u>
                                            A plataforma CNH na Mão atua exclusivamente como plataforma de divulgação de alcance nacional, não sendo autoescola, não intermediando pagamentos alunos/instrutores e não participando da prestação das aulas.
                                        </u>
                                    </p>
                                    <ul>
                                        <li>Toda relação comercial ocorre diretamente entre instrutor e aluno.</li>
                                        <li>Você instrutor pagará apenas pela divulgação.</li>
                                    </ul>
                                </p>

                            </p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse3"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapse3">
                            <strong>E quanto PAGO por tudo isso?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse3" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    Você pode começar sem custo.
                                    A CNH na Mão oferece 30 dias grátis para que você teste a plataforma e comprove, na prática, o potencial de receber novos alunos.
                                </p>
                                Após esse período, o investimento é de apenas <strong>R$ {priceData.value} /mês</strong>
                                <ul>
                                    <li>Sem taxas escondidas.</li>
                                    <li>Sem comissão por aula.</li>
                                    <li>Sem porcentagem sobre seus ganhos.</li>
                                </ul>
                                <p>
                                    <strong>
                                        Você paga somente pela divulgação do seu perfil.
                                    </strong>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>


                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse4"
                            aria-expanded="false" aria-controls="panelsStayOpen-collapse4">
                            <strong>RESUMINDO:</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse4" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p className="fw-normal text-start">
                                <p>
                                    A CNH na Mão funciona como uma <strong>vitrine digital de instrutores</strong>, semelhante a <strong>"classificados online"</strong>.
                                </p>
                                <p>
                                    Ou seja:
                                    <ul>
                                        <li>você anuncia seu serviço;</li>
                                        <li>alunos encontram seu perfil;</li>
                                        <li>o contato é direto com você;</li>
                                        <li>toda a negociação e agendamentos é combinado diretamente entre aluno e instrutor.</li>
                                        <li>você mantém 100% do que ganha.</li>
                                    </ul>
                                </p>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default RegisterExplanation;
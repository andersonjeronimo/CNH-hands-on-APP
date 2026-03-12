import { useState, useEffect } from 'react';
import axios from 'axios';

import priceModel from '../../assets/utils/price-model.json';

function FAQInstrutores() {

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
            <div className="accordion" id="accordionPanelsStayOpenExample">

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse1" aria-expanded="true"
                            aria-controls="panelsStayOpen-collapse1">
                            <strong>1. O que é a plataforma CNH NA MÃO?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse1" className="accordion-collapse collapse show">
                        <div className="accordion-body">
                            <strong>O CNH na Mão é uma plataforma</strong> que conecta alunos que querem aprender
                            a dirigir ou tirar a carteira de motorista com instrutores de trânsito <a href="/register">cadastrados</a>.
                            <br />
                            Nosso objetivo é ajudar instrutores a divulgar suas aulas de direção na internet e conseguir mais alunos na sua região.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse2" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse2">
                            <strong>2. Existe uma plataforma para instrutores de direção divulgarem seus serviços?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse2" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Sim. </strong>
                            O CNH na Mão foi criado justamente para ajudar instrutores de trânsito a divulgar aulas de direção e serem encontrados
                            por alunos que estão procurando aprender a dirigir.
                            A plataforma facilita o contato direto entre aluno e instrutor.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse3" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse3">
                            <strong>3. Como conseguir mais alunos para aulas de direção?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse3" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Uma das formas mais eficientes hoje é divulgar suas aulas na internet.</strong>
                            <br />
                            Ao criar um perfil no CNH na Mão, seu nome pode aparecer para pessoas que pesquisam no Google ou na plataforma por:
                            <ul>
                                <li>aula de direção perto de mim</li>
                                <li>instrutor de direção particular</li>
                                <li>aula para perder medo de dirigir</li>
                                <li>preparação para habilitação</li>
                                <li>outras pesquisas relacionadas</li>
                                <li>além da divulgação organiza e patrocinada realizada pela plataforma</li>
                            </ul>
                            Isso aumenta suas chances de conseguir novos alunos.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse4" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse4">
                            <strong>4. Quem pode se cadastrar?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse4" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Podem se cadastrar: </strong>
                            <br />
                            Instrutores de trânsito credenciados junto ao DETRAN do respectivo Estado.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse5" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse5">
                            <strong>5. Como divulgar aulas de direção na internet?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse5" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>No CNH na Mão você pode divulgar diferentes tipos de aula, como: </strong>
                            <ul>
                                <li>aulas para iniciantes</li>
                                <li>aulas para perder medo de dirigir</li>
                                <li>aulas particulares de direção</li>
                                <li>aulas de preparação para habilitação</li>
                            </ul>
                            Seu perfil ficará disponível para alunos que procuram instrutores na sua região.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse6" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse6">
                            <strong>6. Como os alunos entram em contato comigo?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse6" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Quando um aluno encontra seu perfil na plataforma, <strong>ele poderá entrar em contato diretamente com você via WhatsApp.</strong>
                            <br />
                            Assim ele poderá:
                            <ul>
                                <li>solicitar informações</li>
                                <li>tirar dúvidas</li>
                                <li>combinar valores das aulas</li>
                                <li>agendar horários e lcoais</li>
                            </ul>
                            O CNH na Mão não interfere na negociação entre aluno e instrutor.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse7" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse7">
                            <strong>7. O CNH na Mão cobra comissão pelas aulas?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse7" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Não. </strong> O CNH na Mão funciona apenas como plataforma de divulgação de serviços.
                            O instrutor paga apenas pela divulgação do perfil, e todo o valor das aulas fica com o próprio instrutor.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse8" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse8">
                            <strong>8. Quanto custa anunciar no CNH na Mão?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse8" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <p>Após realizar o cadastro, você será direcionado para a tela de pagamento e receberá 30 dias gratuitos de teste na plataforma.
                                Após esse período, será cobrado um valor de <strong>R$ {priceData.value}</strong> por mês para manter seu perfil ativo e divulgado na plataforma.</p>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse9" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse9">
                            <strong>9. Posso cancelar minha assinatura quando quiser?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse9" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Sim. </strong>O instrutor pode cancelar sua participação na plataforma a qualquer momento.
                            <br />
                            Lembrando que:
                            <ul>
                                <li>Se o pagamento for via cartão de crédito, deve-se respeitar o período mínimo antes da data de vencimento.</li>
                                <li>Se o pagamento for via Pix ou boleto, basta não pagar a nova mensalidade.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse10" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse10">
                            <strong>10. O CNH na Mão garante alunos?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse10" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            A plataforma trabalha para divulgar os instrutores e conectar alunos interessados,
                            mas a contratação das aulas <strong>depende da negociação direta entre aluno e instrutor.</strong>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse11" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse11">
                            <strong>11. Como aumentar minhas chances de conseguir alunos?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse11" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Algumas dicas importantes:</strong>
                            <ul>
                                <li>manter o perfil completo</li>
                                <li>responder rapidamente os alunos</li>
                                <li>divulgar seu perfil nas redes sociais</li>
                                <li>participar das campanhas do CNH na Mão</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse12" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse12">
                            <strong>12. Posso indicar outros instrutores?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse12" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>Sim. </strong> O CNH na Mão organizará campanhas periódicas e programas de indicação, onde instrutores
                            podem indicar colegas e ganhar benefícios a depender da proposta da campanha.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse13" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse13">
                            <strong>13. Como faço meu cadastro como instrutor?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse13" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>É simples:</strong>
                            <ul>
                                <li>Acesse o site do CNH na Mão</li>
                                <li>Clique em <a href="/register">Cadastrar Instrutor</a></li>
                                <li>Preencha seus dados</li>
                                <li>Realize o pagamento</li>
                            </ul>
                            Depois disso, seu perfil já poderá ser encontrado por alunos.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#panelsStayOpen-collapse14" aria-expanded="false"
                            aria-controls="panelsStayOpen-collapse14">
                            <strong>14. E se eu tiver alguma dúvida durante o uso da plataforma?</strong>
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapse14" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Disponibilizamos um canal de atendimento via 
                            <a href="https://api.whatsapp.com/send/?phone=5512988679768&text&type=phone_number&app_absent=0" target="_blank" aria-label="Whatsapp">
                                <strong> WhatsApp </strong>
                            </a> para auxiliar os instrutores e tirar eventuais dúvidas durante o uso da plataforma.
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )

}

export default FAQInstrutores
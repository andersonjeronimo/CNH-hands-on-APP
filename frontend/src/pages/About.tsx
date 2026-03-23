import utils from '../assets/utils/utils.json';
function About() {
    return (
        <div className="container mt-lg-5 mb-lg-5">
            <p className='text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
            </p>
            <p className="text-center"><h1>Sobre a Plataforma CNH Na Mão</h1></p>
            <p className="text-center">
                <h3><i>Fazendo match entre alunos e instrutores de todo o Brasil</i></h3>
            </p>
            <hr />
            <p>
                <strong>O CNH na Mão, CNPJ {utils.cnpj},</strong> é uma plataforma criada para aproximar alunos que querem aprender a dirigir de instrutores de trânsito credenciados.
                Nosso objetivo é tornar mais fácil encontrar aulas de direção, permitindo que alunos encontrem instrutores próximos e entrem em contato diretamente para combinar suas aulas.
                Ao mesmo tempo, a plataforma oferece aos instrutores uma forma simples e acessível de divulgar seus serviços na internet e alcançar novos alunos.</p>

            <p>
                <strong>Por que o CNH na Mão foi criado</strong>
                <br />
                Com as alterações na legislação, não é mais obrigatório realizar todo o processo de aprendizado de direção exclusivamente por meio de uma autoescola
                para obter a Carteira Nacional de Habilitação (CNH).
                Isso facilitou muito para os alunos, mas também criou uma nova necessidade: onde encontrar instrutores de direção?
                Foi nesse cenário que nasceu o CNH na Mão.
                <br />
                Todos os dias, muitas pessoas procuram na internet por:
                <ul>
                    <li>aula de direção perto de mim</li>
                    <li>instrutor de direção particular</li>
                    <li>aulas para perder medo de dirigir</li>
                    <li>preparação para habilitação</li>
                </ul>
                No entanto, nem sempre é fácil encontrar instrutores disponíveis na região.
                Por outro lado, muitos instrutores têm dificuldade em divulgar suas aulas online e alcançar novos alunos.
                O CNH na Mão foi criado justamente para resolver esse problema, facilitando a conexão entre quem quer aprender e quem pode ensinar.
            </p>

            <p>
                <strong>Como funciona</strong>
                <br />
                O CNH na Mão funciona como uma plataforma de divulgação de instrutores de trânsito.
                Instrutores credenciados podem criar um perfil na plataforma informando:
                <ul>
                    <li>cidade de atuação</li>
                    <li>categorias de aulas oferecidas</li>
                    <li>carro utilizado nas aulas e na prova</li>
                    <li>experiência profissional</li>
                    <li>formas de contato</li>
                </ul>
                Assim, quando um aluno procura por aulas de direção na sua região, ele pode encontrar instrutores disponíveis e
                entrar em contato diretamente com eles.
                <br />
                A negociação de valores, locais, horários e detalhes das aulas acontece diretamente entre aluno e instrutor,
                assim como orientações sobre procedimentos.


                <ul>
                    <li>
                        <strong>Para alunos</strong>
                        <p>Se você quer aprender a dirigir, tirar sua habilitação ou ganhar mais confiança no trânsito,
                            o CNH na Mão facilita sua busca por instrutores.
                            <br />
                            Na plataforma você pode encontrar profissionais que oferecem:

                            <ul>
                                <li>aulas para iniciantes</li>
                                <li>aulas para perder medo de dirigir</li>
                                <li>aulas particulares de direção</li>
                                <li>preparação para habilitação</li>
                            </ul>
                        </p>
                        <p>
                            Depois de escolher o instrutor, basta entrar em contato para combinar suas aulas diretamente com o profissional.
                        </p>

                    </li>
                    <li>
                        <strong>
                            Para instrutores
                        </strong>
                        <br />
                        Se você é instrutor de trânsito credenciado, o CNH na Mão oferece uma forma simples de divulgar suas aulas e ser encontrado por alunos que estão
                        procurando aprender a dirigir para obtenção da CNH.
                        Ao criar um perfil na plataforma, você aumenta sua visibilidade na internet e pode receber contatos de novos alunos interessados em aulas de direção.

                    </li>
                </ul>

            </p>

            <p>
                <strong>Nossa MISSÃO</strong>
                <br />
                Facilitar o acesso ao aprendizado da direção, conectando alunos e instrutores de forma simples, rápida e acessível.
            </p>

            <p>
                <strong>Nossa VISÃO</strong>
                <br />
                Ser uma das principais plataformas do Brasil na conexão entre alunos e instrutores de trânsito.
            </p>

            <p>
                <strong>Nossos VALORES</strong>
                <ul>
                    <li>Acesso: Facilitar o encontro entre alunos e instrutores.</li>
                    <li>Transparência: Permitir que aluno e instrutor negociem diretamente.</li>
                    <li>Simplicidade: Criar uma experiência fácil e prática para todos, com apenas alguns cliques.</li>
                    <li>Oportunidade: Ajudar instrutores a divulgarem seu trabalho e conquistarem novos alunos.</li>
                </ul>
            </p>



            <p>
                <strong>Comece agora</strong>
                <br />
                <p>O CNH na Mão foi criado para simplificar o processo de aprender a dirigir e encontrar instrutores.
                    <br />
                    Se você é aluno, encontre um instrutor na sua região: <a href="/search">Buscar Instrutor</a>
                    <br />
                    Se você é instrutor, cadastre seu perfil e comece a divulgar suas aulas: <a href="/register">Cadastrar instrutor</a>
                </p>
            </p>
        </div>
    )

}

export default About;
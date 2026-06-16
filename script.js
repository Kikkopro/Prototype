// Gerenciamento de dashboards
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const dashboardPanels = document.querySelectorAll('.dashboard-panel');
    const pageTitle = document.getElementById('page-title');

    const dashboardTitles = {
        glossario: 'Glossário dos Tribunais',
        quesitos: 'Gerador de Quesitos',
        prazos: 'Contador de Prazos',
        lexfinder: 'LexFinder - Busca Jurídica'
    };

    // Função para alternar dashboard
    function switchDashboard(dashboardId) {
        // Remove active de todos os painéis
        dashboardPanels.forEach(panel => panel.classList.remove('active'));
        
        // Remove active de todos os nav items
        navItems.forEach(item => item.classList.remove('active'));

        // Adiciona active ao painel selecionado
        const selectedPanel = document.getElementById(dashboardId);
        if (selectedPanel) {
            selectedPanel.classList.add('active');
            pageTitle.textContent = dashboardTitles[dashboardId];
        }

        // Adiciona active ao nav item clicado
        const clickedNav = document.querySelector(`[data-dashboard="${dashboardId}"]`);
        if (clickedNav) {
            clickedNav.classList.add('active');
        }
    }

    // Event listeners para os nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const dashboardId = item.getAttribute('data-dashboard');
            switchDashboard(dashboardId);
        });
    });

    // Funcionalidade de busca no Glossário
    const glossarioSearch = document.querySelector('#glossario .search-box input');
    if (glossarioSearch) {
        glossarioSearch.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('#glossario .data-table tbody tr');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Funcionalidade de geração de quesitos
    const gerarButton = document.querySelector('#quesitos .btn-primary');
    if (gerarButton) {
        gerarButton.addEventListener('click', () => {
            const tipoProcesso = document.querySelector('#quesitos select').value;
            const temaPrincipal = document.querySelector('#quesitos input').value;

            if (tipoProcesso !== 'Selecione um tipo...' && temaPrincipal.trim()) {
                const quesitosExemplo = [
                    `Qual é a natureza jurídica do ${temaPrincipal}?`,
                    `Quais são as implicações legais para processo ${tipoProcesso}?`,
                    `Qual legislação se aplica neste caso de ${temaPrincipal}?`,
                    `Quais são as consequências jurídicas relevantes?`,
                    `Existe jurisprudência similar para este tipo de ${temaPrincipal}?`
                ];

                const quesitosContainer = document.querySelector('#quesitos .quesitos-list');
                quesitosContainer.innerHTML = '';

                quesitosExemplo.forEach((quesito, index) => {
                    const questoItem = document.createElement('div');
                    questoItem.className = 'quesito-item';
                    questoItem.innerHTML = `
                        <span class="quesito-number">${index + 1}.</span>
                        <p>${quesito}</p>
                    `;
                    quesitosContainer.appendChild(questoItem);
                });
            } else {
                alert('Por favor, preencha todos os campos');
            }
        });
    }

    // Funcionalidade de contador de prazos
    const calcularButton = document.querySelector('#prazos .btn-primary');
    if (calcularButton) {
        calcularButton.addEventListener('click', () => {
            const dataInicio = document.querySelector('#prazos input[type="date"]').value;
            const diasPrazo = document.querySelector('#prazos input[type="number"]').value;

            if (dataInicio && diasPrazo) {
                const data = new Date(dataInicio);
                data.setDate(data.getDate() + parseInt(diasPrazo));

                const resultDate = document.querySelector('#prazos .result-date');
                const resultDays = document.querySelector('#prazos .result-days');

                // Formatar data
                const dia = String(data.getDate()).padStart(2, '0');
                const mes = String(data.getMonth() + 1).padStart(2, '0');
                const ano = data.getFullYear();
                resultDate.textContent = `${dia}/${mes}/${ano}`;

                // Calcular dias restantes
                const hoje = new Date();
                const diasRestantes = Math.ceil((data - hoje) / (1000 * 60 * 60 * 24));
                resultDays.textContent = diasRestantes > 0 ? diasRestantes : '0';
            } else {
                alert('Por favor, preencha todos os campos');
            }
        });
    }

    // Funcionalidade de busca LexFinder
    const lexfinderSearch = document.querySelector('#lexfinder .search-box input');
    if (lexfinderSearch) {
        lexfinderSearch.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.trim();
            
            if (searchTerm.length > 2) {
                const resultsContainer = document.querySelector('#lexfinder .results-container');
                resultsContainer.innerHTML = `
                    <div class="result-item">
                        <h4>Artigo 5º - Constituição Federal</h4>
                        <p class="result-type">Tipo: Constituição</p>
                        <p class="result-excerpt">Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade...</p>
                    </div>
                    <div class="result-item">
                        <h4>Lei nº 8.078/1990 - Código de Defesa do Consumidor</h4>
                        <p class="result-type">Tipo: Lei Federal</p>
                        <p class="result-excerpt">O presente código estabelece normas de proteção e defesa do consumidor, de ordem pública e de interesse social, nos termos dos arts. 5º, inciso XXXII, 170, inciso V, da Constituição Federal...</p>
                    </div>
                    <div class="result-item">
                        <h4>Precedente Jurisprudencial</h4>
                        <p class="result-type">Tipo: Jurisprudência</p>
                        <p class="result-excerpt">Conforme entendimento consolidado nas cortes superiores, aplicam-se os princípios de proteção integral aos direitos fundamentais garantidos constitucionalmente...</p>
                    </div>
                `;
            }
        });
    }

    // Filtro no LexFinder
    const lexfinderFilter = document.querySelector('#lexfinder .filter-group select');
    if (lexfinderFilter) {
        lexfinderFilter.addEventListener('change', (e) => {
            const filterType = e.target.value;
            console.log('Filtro selecionado:', filterType);
            // Aqui você pode adicionar lógica de filtro
        });
    }
});

// Adicionar animação de scroll suave
document.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.scrollY > 0) {
        sidebar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        sidebar.style.boxShadow = 'inset 1px 1px 0 rgba(255, 255, 255, 0.05)';
    }
});
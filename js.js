; (function () {
    let data = [];
    let groups = [[], [], [], []];
    const maxQtd = 9;
    const minQtd = 8;
    const groupsQtd = 4;

    const sortByNota = (a, b) => a['nota prova técnica'] - b['nota prova técnica'];
    const sortByAnos = (a, b) => a['anos de experiência'] - b['anos de experiência'];
    const sortByRespeito = (a, b) => a['perfil - respeito'] - b['perfil - respeito'];
    const sortByProtagonismo = (a, b) => a['perfil - protagonismo de carreira'] - b['perfil - protagonismo de carreira'];
    const sortByMindset = (a, b) => a['perfil - growth mindset'] - b['perfil - growth mindset'];
    const sortByPaixao = (a, b) => a['perfil - paixão por tecnologia'] - b['perfil - paixão por tecnologia'];

    const fixJson = () => {
        data.forEach(doc => doc['nota prova técnica'] = Number(doc['nota prova técnica'].replace(",", ".")));
    }

    const distributeGenerico = predicate => {
        const docs = data.sort(predicate).reverse();
        for (let i = 0, ii = 4; i < ii; i++) {
            if (!docs.length) break;
            let doc = docs.shift();
            groups[i].push(doc);
        }
    }

    const distributeByNota = () => distributeGenerico(sortByNota);
    const distributeByAnos = () => distributeGenerico(sortByAnos);
    const distributeByRespeito = () => distributeGenerico(sortByRespeito);
    const distributeByProtagonismo = () => distributeGenerico(sortByProtagonismo);
    const distributeByMindset = () => distributeGenerico(sortByMindset);
    const distributeByPaixao = () => distributeGenerico(sortByPaixao);

    const distribute = () => {
        distributeByNota();
        distributeByAnos();
        distributeByRespeito();
        distributeByProtagonismo();
        distributeByMindset();
        distributeByPaixao();
    }
    const show = () => {
        groups = groups.map((group, i) => group.map(elem => ({ id: elem.id, group: i })));
    }

    const init = () => {
        data = JSON.parse(JSON.stringify(window.data));
        fixJson();
        while (data.length > 0)
            distribute();
        show();
    }

    window.module = { init, show, distribute, distributeByNota, groups };

})();

(function () {
    const selectors = {};
    selectors.table = 'table';
    selectors.tableBody = 'tbody';
    selectors.button = '#generate';
    const elements = {};


    const loadElements = () => {
        Object.keys(selectors)
            .forEach(key => {
                elements[key] = document.querySelector(selectors[key])
            });
    }

    const cleanTable = () => {
        elements.tableBody.innerHTML = "";
    }

    const createRows = () => {
        const tpl = `
            <tr>
                <th scope="row"></th>
                <td>Mark</td>
            </tr>
        `;
        let toAppend = '';
        window.module.groups.map((group, i) => group.map(elem => {
            toAppend += `
                <tr>
                    <th scope="row">${elem.id}</th>
                    <td>${i}</td>
                </tr>
            `;
        }));
        elements.tableBody.innerHTML = toAppend;
    }


    const onBtnClick = () => {
        cleanTable();
        window.module.init();
        createRows();
        // console.log('click!')
    }

    const setEvents = () => {
        elements.button.onclick = onBtnClick;
    }

    const init = () => {
        loadElements();
        setEvents();
    }

    window.ui = { init };
    init();
})();
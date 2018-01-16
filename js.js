; (function () {
    const groups = [[], [], [], []];
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
        window.data.forEach(doc => doc['nota prova técnica'] = Number(doc['nota prova técnica'].replace(",", ".")));
    }

    const distributeGenerico = predicate => {
        const data = window.data.sort(predicate).reverse();
        for (let i = 0, ii = 4; i < ii; i++) {
            if (!data.length) break;
            let doc = data.shift();
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
        let docs = groups.map((group, i) => group.map(elem => ({ id: elem.id, group: i })));
        console.log(docs);
    }

    const init = () => {
        fixJson();
        while (window.data.length > 0)
            distribute();
        show();
    }

    init();

    window.module = { init, show, distribute, distributeByNota, groups };

})();
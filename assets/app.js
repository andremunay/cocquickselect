(function () {
  const data = window.COC_CONTENT;
  if (!data) return;

  const $ = (sel) => document.querySelector(sel);
  const create = (tag, text) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    return el;
  };

  function optionFill(select, values) {
    if (!select) return;
    values.forEach((v) => {
      const opt = document.createElement('option');
      if (typeof v === 'string') {
        opt.value = v;
        opt.textContent = v;
      } else {
        opt.value = v.value;
        opt.textContent = v.label;
      }
      select.appendChild(opt);
    });
  }

  function token(value) {
    return (value || '').split(' — ')[0].trim();
  }

  function conciseLabel(value) {
    return typeof value === 'string' ? token(value) : value;
  }

  function renderAlternatives() {
    const ul = create('ul');
    data.contraindications.alternatives.forEach((a) => ul.appendChild(create('li', a)));
    return ul;
  }

  function renderResults(container, state) {
    container.innerHTML = '';
    if (state.cat4 === 'Yes') {
      container.appendChild(create('div', 'HARD STOP'));
      container.appendChild(create('p', data.contraindications.hardStopText));
      container.appendChild(renderAlternatives());
      return;
    }

    if (state.cat3 === 'Yes') {
      const caution = create('div', 'CAUTION: Category 3 condition present.');
      caution.className = 'banner warning';
      container.appendChild(caution);
      data.contraindications.cat3Counseling.forEach((t) => container.appendChild(create('p', t)));
      container.appendChild(renderAlternatives());
    }

    const eeToken = token(state.ee);
    const proToken = token(state.pro);
    const cycleToken = token(state.cycle);

    const list = data.medications.filter((m) => {
      const eeMatch = !eeToken || m.ee === eeToken || (eeToken === '30–35 mcg' && (m.ee === '30 mcg' || m.ee === '35 mcg'));
      const proMatch = !proToken || m.progestin === proToken;
      const cycMatch = !cycleToken || m.cycle.includes(cycleToken);
      return eeMatch && proMatch && cycMatch;
    });

    const h = create('h4', 'Suggested options');
    container.appendChild(h);
    if (!list.length) {
      container.appendChild(create('p', 'No matches for current filter.'));
    } else {
      const ul = create('ul');
      list.forEach((m) => {
        ul.appendChild(create('li', `${m.name} — ${m.detail} (${m.cycle})${m.note ? ` — ${m.note}` : ''}`));
      });
      container.appendChild(ul);
    }

    const miss = create('div');
    miss.appendChild(create('h4', 'Missed-pill instructions'));
    const missUl = create('ul');
    data.missedPill.forEach((line) => missUl.appendChild(create('li', line)));
    miss.appendChild(missUl);
    container.appendChild(miss);

    if (state.pro === '4th gen') {
      container.appendChild(create('p', data.progestin.drospirenoneNote));
    }
  }

  function initShared() {
    const sdm = $('#sdm-content');
    if (sdm) {
      const ul = create('ul');
      data.sdm.approach.forEach((x) => ul.appendChild(create('li', x)));
      sdm.appendChild(ul);
      sdm.appendChild(create('p', data.sdm.startingPoint));
      sdm.appendChild(create('p', data.sdm.contraindicationScreen));
    }

    const cat4 = $('#cat4-list');
    if (cat4) data.contraindications.category4.forEach((x) => cat4.appendChild(create('li', x)));
    const cat3 = $('#cat3-list');
    if (cat3) data.contraindications.category3.forEach((x) => cat3.appendChild(create('li', x)));
    const c3 = $('#cat3-counsel');
    if (c3) data.contraindications.cat3Counseling.forEach((x) => c3.appendChild(create('p', x)));
  }

  function initWizard() {
    if (document.body.dataset.page !== 'wizard') return;
    optionFill($('#wiz-ee'), data.estrogen.options.map((x) => ({value: x, label: conciseLabel(x)})));
    optionFill($('#wiz-progestin'), data.progestin.options.map((x) => ({value: x, label: conciseLabel(x)})));
    optionFill($('#wiz-cycle'), data.cyclePatterns.map((x) => ({value: x, label: conciseLabel(x)})));

    const wizCat4 = $('#wiz-step-cat4-guide');
    if (wizCat4) {
      const ul = create('ul');
      data.contraindications.category4.forEach((x) => ul.appendChild(create('li', x)));
      wizCat4.appendChild(ul);
    }

    const wizCat3 = $('#wiz-step-cat3-guide');
    if (wizCat3) {
      const ul = create('ul');
      data.contraindications.category3.forEach((x) => ul.appendChild(create('li', x)));
      wizCat3.appendChild(ul);
    }

    const eeTips = $('#wiz-ee-guide');
    if (eeTips) {
      const ul = create('ul');
      data.estrogen.options.forEach((x) => ul.appendChild(create('li', typeof x === 'string' ? x : x.label)));
      eeTips.appendChild(ul);
    }

    const proTips = $('#wiz-progestin-guide');
    if (proTips) {
      const ul = create('ul');
      data.progestin.options.forEach((x) => ul.appendChild(create('li', x)));
      proTips.appendChild(ul);
    }

    const cycleTips = $('#wiz-cycle-guide');
    if (cycleTips) {
      const ul = create('ul');
      data.cyclePatterns.forEach((x) => ul.appendChild(create('li', x)));
      cycleTips.appendChild(ul);
    }

    document.querySelectorAll('[data-next]').forEach((btn) => btn.addEventListener('click', () => {
      const next = btn.dataset.next;
      const cat4Value = $('#wiz-cat4')?.value || 'No';
      if (next === '2' && cat4Value === 'Yes') {
        document.querySelector('[data-step="2"]').classList.add('hidden');
        document.querySelector('[data-step="3"]').classList.remove('hidden');
      } else {
        document.querySelectorAll('.wizard-step').forEach((s) => s.classList.add('hidden'));
        document.querySelector(`[data-step="${next}"]`).classList.remove('hidden');
      }
      renderResults($('#wizard-results'), {
        cat4: $('#wiz-cat4')?.value || 'No',
        cat3: $('#wiz-cat3')?.value || 'No',
        ee: $('#wiz-ee').value,
        pro: $('#wiz-progestin').value,
        cycle: $('#wiz-cycle').value
      });
    }));

    document.querySelectorAll('[data-prev]').forEach((btn) => btn.addEventListener('click', () => {
      const prev = btn.dataset.prev;
      document.querySelectorAll('.wizard-step').forEach((s) => s.classList.add('hidden'));
      document.querySelector(`[data-step="${prev}"]`).classList.remove('hidden');
    }));
  }

  function initPicks() {
    if (document.body.dataset.page !== 'picks') return;
    const ees = [...new Set(data.medications.map((m) => m.ee))];
    const pros = [...new Set(data.medications.map((m) => m.progestin))];
    const cycles = [...new Set(data.medications.map((m) => m.cycle))];
    optionFill($('#pick-ee'), ees);
    optionFill($('#pick-progestin'), pros);
    optionFill($('#pick-cycle'), cycles);

    const render = () => {
      const ee = $('#pick-ee').value;
      const pro = $('#pick-progestin').value;
      const cyc = $('#pick-cycle').value;
      const rows = data.medications.filter((m) => (!ee || m.ee === ee) && (!pro || m.progestin === pro) && (!cyc || m.cycle === cyc));
      const box = $('#picks-results');
      box.innerHTML = '';
      if (!rows.length) {
        box.appendChild(create('p', 'No medications match these filters.'));
        return;
      }

      const table = create('table');
      table.className = 'results-table';
      const thead = create('thead');
      const headRow = create('tr');
      ['Medication', 'Estrogen', 'Progestin', 'Cycle', 'Details / Notes'].forEach((label) => headRow.appendChild(create('th', label)));
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = create('tbody');
      rows.forEach((m) => {
        const tr = create('tr');
        [m.name, m.ee, m.progestin, m.cycle, `${m.detail}${m.note ? ` — ${m.note}` : ''}`].forEach((text) => tr.appendChild(create('td', text)));
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      box.appendChild(table);
    };

    ['#pick-ee', '#pick-progestin', '#pick-cycle'].forEach((id) => $(id).addEventListener('change', render));
    render();
  }

  initShared();
  initWizard();
  initPicks();
})();

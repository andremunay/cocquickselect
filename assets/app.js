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
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
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

    const list = data.medications.filter((m) => {
      const eeMatch = !state.ee || m.ee.startsWith(state.ee.replace('30–35', '30')) || (state.ee === '30–35 mcg' && (m.ee === '30 mcg' || m.ee === '35 mcg'));
      const proMatch = !state.pro || m.progestin === state.pro;
      const cycMatch = !state.cycle || m.cycle.includes(state.cycle.split(' ')[0]);
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
    optionFill($('#wiz-ee'), data.estrogen.options);
    optionFill($('#wiz-progestin'), ['1st gen', '2nd gen', '3rd gen', '4th gen']);
    optionFill($('#wiz-cycle'), ['21/7', '24/4', '84/7', 'Continuous']);

    document.querySelectorAll('[data-next]').forEach((btn) => btn.addEventListener('click', () => {
      const next = btn.dataset.next;
      if (next === '2' && $('#wiz-cat4').value === 'Yes') {
        document.querySelector('[data-step="2"]').classList.add('hidden');
        document.querySelector('[data-step="3"]').classList.remove('hidden');
      } else {
        document.querySelectorAll('.wizard-step').forEach((s) => s.classList.add('hidden'));
        document.querySelector(`[data-step="${next}"]`).classList.remove('hidden');
      }
      renderResults($('#wizard-results'), {
        cat4: $('#wiz-cat4').value,
        cat3: $('#wiz-cat3').value,
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

  function initQuick() {
    if (document.body.dataset.page !== 'quick') return;
    optionFill($('#quick-ee'), data.estrogen.options);
    optionFill($('#quick-progestin'), ['1st gen', '2nd gen', '3rd gen', '4th gen']);
    optionFill($('#quick-cycle'), ['21/7', '24/4', '84/7', 'Continuous']);

    const update = () => renderResults($('#quick-results'), {
      cat4: $('#quick-cat4').value,
      cat3: $('#quick-cat3').value,
      ee: $('#quick-ee').value,
      pro: $('#quick-progestin').value,
      cycle: $('#quick-cycle').value
    });

    ['#quick-cat4', '#quick-cat3', '#quick-ee', '#quick-progestin', '#quick-cycle'].forEach((id) => $(id).addEventListener('change', update));
    update();
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
      const ul = create('ul');
      rows.forEach((m) => ul.appendChild(create('li', `${m.name} — ${m.detail} (${m.cycle})${m.note ? ` — ${m.note}` : ''}`)));
      box.appendChild(ul);
    };

    ['#pick-ee', '#pick-progestin', '#pick-cycle'].forEach((id) => $(id).addEventListener('change', render));
    render();
  }

  initShared();
  initWizard();
  initQuick();
  initPicks();
})();

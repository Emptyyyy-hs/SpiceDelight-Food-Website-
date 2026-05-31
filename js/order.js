// ===== ORDER.JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ── Qty controls ──
  window.changeQty = function(btn, delta) {
    const row = btn.closest('.order-item-row');
    const valEl = row.querySelector('.qty-val');
    let val = parseInt(valEl.textContent) || 1;
    val = Math.max(1, Math.min(20, val + delta));
    valEl.textContent = val;
    updateTotal();
  };

  // ── Remove item row ──
  window.removeItem = function(btn) {
    const rows = document.querySelectorAll('.order-item-row');
    if (rows.length <= 1) return; // keep at least one
    btn.closest('.order-item-row').remove();
    updateTotal();
  };

  // ── Add item row ──
  const addBtn = document.getElementById('addItemBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const existing = document.getElementById('defaultRow');
      const clone    = existing.cloneNode(true);
      clone.id       = '';
      // reset clone's select and qty
      clone.querySelector('.item-select').value = '';
      clone.querySelector('.qty-val').textContent = '1';
      document.getElementById('orderItems').appendChild(clone);
      updateTotal();
    });
  }

  // ── Calculate total ──
  window.updateTotal = function() {
    let total = 0;
    document.querySelectorAll('.order-item-row').forEach(row => {
      const sel = row.querySelector('.item-select');
      const qty = parseInt(row.querySelector('.qty-val').textContent) || 1;
      if (sel && sel.value) {
        const price = parseInt(sel.value.split('|')[1]) || 0;
        total += price * qty;
      }
    });
    const el = document.getElementById('totalAmount');
    if (el) el.textContent = 'Rs. ' + total.toLocaleString('en-IN');
  };

  // Update total when a select changes
  document.getElementById('orderItems').addEventListener('change', updateTotal);

  // ── Form validation & submission ──
  const form = document.getElementById('orderForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const required = [
        { id: 'fname',   pattern: null },
        { id: 'lname',   pattern: null },
        { id: 'phone',   pattern: /^[0-9+\s]{10,14}$/ },
        { id: 'address', pattern: null },
        { id: 'city',    pattern: null },
        { id: 'pin',     pattern: /^[0-9]{6}$/ },
      ];

      required.forEach(({ id, pattern }) => {
        const input = document.getElementById(id);
        const group = input.closest('.form-group');
        const value = input.value.trim();
        const bad   = !value || (pattern && !pattern.test(value));
        group.classList.toggle('has-error', bad);
        if (bad) valid = false;
      });

      if (!valid) {
        form.querySelector('.has-error input').focus();
        return;
      }

      // Show success modal
      const modal = document.getElementById('successModal');
      if (modal) modal.classList.add('visible');
    });

    // Clear errors on input
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.form-group').classList.remove('has-error');
      });
    });
  }

  // Close modal on overlay click
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('visible');
    });
  }

});

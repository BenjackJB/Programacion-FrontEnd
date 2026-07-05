$(function () {
  const form = $('#userForm')[0];

  function resetValidation() {
    $('#userForm .form-control').removeClass('is-invalid');
  }

  function formatDateToDDMMYYYY(isoDate) {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (isNaN(d)) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  function validEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validURL(url) {
    try { if (!url) return true; new URL(url); return true; } catch(e) { return false; }
  }

  $('#cancelBtn').on('click', function () {
    window.location.href = 'index.html';
  });

  $('#userForm').on('submit', function (e) {
    e.preventDefault();
    resetValidation();
    let ok = true;

    const nombre = $('#nombre').val().trim();
    const usuario = $('#usuario').val().trim();
    const fechaVal = $('#fecha').val();
    const email = $('#email').val().trim();
    const website = $('#website').val().trim();

    if (!nombre) { $('#nombre').addClass('is-invalid'); ok = false; }
    if (!usuario) { $('#usuario').addClass('is-invalid'); ok = false; }

    const fechaFormateada = formatDateToDDMMYYYY(fechaVal);
    if (!fechaFormateada) { $('#fecha').addClass('is-invalid'); ok = false; }

    if (!validEmail(email)) { $('#email').addClass('is-invalid'); ok = false; }
    if (!validURL(website)) { $('#website').addClass('is-invalid'); ok = false; }

    if (!ok) return;

    const stored = localStorage.getItem('users');
    let users = [];
    try { users = stored ? JSON.parse(stored) : []; } catch (e) { users = []; }

    const nextId = users && users.length ? (Math.max.apply(null, users.map(u => u.id || 0)) + 1) : 1;

    const newUser = {
      id: nextId,
      name: nombre,
      username: usuario,
      email: email,
      phone: '',
      website: website,
      company: { name: '' },
      fechaIngreso: fechaFormateada
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario creado correctamente. ID: ' + nextId);
    window.location.href = 'index.html';
  });
});

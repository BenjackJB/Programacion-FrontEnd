$(document).ready(function () {
  function initDataTable(rows) {
    $('#usersTable').DataTable({
      data: rows,
      columns: [
        { title: 'ID' },
        { title: 'Nombre' },
        { title: 'Usuario' },
        { title: 'Email' },
        { title: 'Teléfono' },
        { title: 'Sitio' },
        { title: 'Compañía' }
      ],
      pageLength: 5,
      language: {
        lengthMenu: 'Mostrar _MENU_ entradas',
        zeroRecords: 'No se encontraron registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ entradas',
        infoEmpty: 'Mostrando 0 a 0 de 0 entradas',
        infoFiltered: '(filtrado de _MAX_ entradas totales)',
        search: 'Buscar:',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
      }
    });
  }

  function loadUsers(users) {
    const rows = users.map(u => [u.id, u.name, u.username, u.email, u.phone || '', u.website || '', (u.company && u.company.name) || '']);
    initDataTable(rows);
  }

  const stored = localStorage.getItem('users');
  if (stored) {
    try {
      const users = JSON.parse(stored);
      loadUsers(users);
    } catch (e) {
      console.error('Error parseando users desde localStorage', e);
      localStorage.removeItem('users');
    }
  }

  if (!localStorage.getItem('users')) {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('users', JSON.stringify(data));
        loadUsers(data);
      })
      .catch(err => {
        console.error('Error cargando usuarios', err);
        $('#usersTable').html('<tr><td colspan="7">Error cargando datos.</td></tr>');
      });
  }
});

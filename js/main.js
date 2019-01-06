

Routes = [{from: 'Брянск', to: 'Орел', date: '12-12-2018', time: '09:00', company: 'ООО АК-1806', price: '1000 руб'},
        {from: 'Брянск', to: 'Орел', date: '01-01-2019', time: '11:00', company: 'ООО АК-1806', price: '1000 руб'},
        {from: 'Брянск', to: 'Орел', date: '01-01-2019', time: '15:00', company: 'ООО Галактика', price: '1200 руб'},
        {from: 'Брянск', to: 'Орел', date: '04-01-2019', time: '10:00', company: 'ООО Нептун', price: '950 руб'},
        {from: 'Брянск', to: 'Москва', date: '01-01-2019', time: '10:00', company: 'ООО Нептун', price: '2000 руб'},
        {from: 'Брянск', to: 'Москва', date: '02-01-2019', time: '08:30', company: 'ООО Созвездие', price: '2100 руб'},
        {from: 'Брянск', to: 'Москва', date: '03-01-2019', time: '09:00', company: 'ООО АС-1222', price: '1900 руб'}]

visually = (event) => {
    let body = document.querySelector('body')
    if(body.style.fontSize === '16px' || body.style.fontSize === ''){ 
        body.style.fontSize = '48px'
        event.target.innerText = 'Обычная версия'
    }
    else {
        event.target.innerText = 'Версия для слабовидящих'
        body.style.fontSize = '16px'
    }
}
document.getElementById('visually').addEventListener('click', visually)

searchRoute = () => {
    let from = document.getElementById('from');
    let to = document.getElementById('to');
    if (from.value.trim() == '') {
        alert('Пожалуйста, укажите место отправления');
        return;
    }
    else if (to.value.trim() == '') {
        alert('Пожалуйста, укажите место назначения');
        return;
    }
    
    let routes = document.querySelector('.routes');
    routes.innerHTML = '';
    isSuccess = false;
    for(i = 0; i < Routes.length; ++i) {
        if ((Routes[i].from == from.value) && (Routes[i].to == to.value)) {
            isSuccess = true;
            let route = document.createElement('div');
            route.classList.add('route');
            route.innerHTML = `<strong>Дата: </strong>${Routes[i].date} 
                <strong>Время: </strong>${Routes[i].time}<br>
                <strong>Перевозчик: </strong>${Routes[i].company}<br>
                <strong>Цена билета: </strong>${Routes[i].price}<hr>`
            routes.appendChild(route);
        }
    }
    if (!isSuccess) {
        let route = document.createElement('div');
        route.innerHTML = 'Маршрутов не найдено';
        routes.appendChild(route);
    }
}
document.getElementById('search').addEventListener('click', searchRoute)
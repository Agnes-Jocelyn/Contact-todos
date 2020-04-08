let data = [];
axios.get('http://localhost:3000/contacts-todos')
.then((response) => {
    console.log(response);
    const listHTML = document.querySelector("#list>div")
    data = response.data;

    response.data.forEach(item => {
        const {name, address, email, phone, company, id} = item;
        const itemHtml = `
        <div class="col-sm-4">
        <br>
        <br>
        Name : ${name}
        <br>
        Address : ${address}
        <br>
        Email : ${email}
        <br>
        Phone  : ${phone}
        <br>
        Company : ${company}
        <br><br>
            <button onclick="hapus(${id})" class="btn btn-dark">
                <i class="fas fa-trash"></i> Delete
            </button
            <br>
            <button onclick="edit(${id})" class="btn btn-dark">
                <i class="fas fa-edit"> </i> Edit
            </button
        </div>
        
        
        `;     
        listHTML.innerHTML += itemHtml;
    })
    
})
.catch((pesanError) => {
    console.error(pesanError);
})

document.getElementById('simpanData').addEventListener('click',function(event){
    event.preventDefault();

    const name = document.getElementsByName('name')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    const company = document.getElementsByName('company')[0].value;
    
    axios.post('http://localhost:3000/contacts-todos',{
    name,
    address,
    email,
    phone,
    company
    })    
})

const hapus = id => {
    axios.delete(`http://localhost:3000/contacts-todos/${id}`)
}

const edit = id => {
    const isilist = data.find(item => {
        return item.id === id
    })
    
    if (isilist){
        const name = window.prompt('Name',isilist.name);
        const address = window.prompt('Address', isilist.address);
        const email = window.prompt('Address', isilist.email);
        const phone = window.prompt('Address', isilist.phone);
        const company = window.prompt('Address', isilist.company);
        axios.put(`http://localhost:3000/contacts-todos/${id}`,{
            name,
            address,
            email,
            phone,
            company
        });
    }
}
const express = require('express');
const app = express();

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]


app.get('/', (request, response) => {
    response.send('<h2>Hola mundo</h2>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const TotalPersons = () => {
    return persons.length;
}
const TodayDate = () => {
    return Date();
}
app.get('/api/info', (request, response) => {
    response.send(
        `La agenda tiene informacion de ${TotalPersons()} personas 
         <br> ${TodayDate()}`
    );
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(p => p.id === id);
    console.log('Esta es la persona:', person);

    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
})


app.delete('/api/persons/:id', (request, response) =>{
    const id = Number(request.params.id);
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => p.id)) : 0;

    return maxId +1;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person);
    response.json(person);
})


const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
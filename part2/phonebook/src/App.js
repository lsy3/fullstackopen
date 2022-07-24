import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <>filter shown with
      <input value={value} onChange={onChange} /></>
  )
}

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addNumber}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit" onClick={addNumber}>add</button>
      </div>
    </form>
  )
}

const Person = ({ name, number }) => {
  return (
    <>{name} {number}<br/></>
  )
}

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((p, i) => <Person key={p.id} name={p.name} number={p.number} />)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    let idx = persons.findIndex((x) => x.name === newName)
    if (idx === -1) {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const filteredPersons = () => {
    let filterValue2 = filterValue.toLowerCase()
    return persons.filter(p => p.name.toLowerCase().includes(filterValue2) )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} addNumber={addNumber} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} />
    </div>
  )
}

export default App
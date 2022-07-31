import { useState, useEffect } from 'react'
import personsService from './services/persons'

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

const Person = ({ name, number, deleteOnClick }) => {
  return (
    <>{name} {number}
      <button onClick={deleteOnClick}>delete</button>
      <br />
    </>
  )
}

const Persons = ({ persons, setPersons }) => {
  return (
    <>
      {persons.map((p, i) =>
        <Person key={p.id} name={p.name} number={p.number}
          deleteOnClick={() => {
            if (window.confirm(`Delete ${p.name}?`)) {
              personsService.remove(p.id).then(data => {
                setPersons(persons.filter(p2 => p2.id !== p.id))
              })
            }
          }} />)}
    </>
  )
}

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={(isError) ? 'error' : 'success'}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notif, setNotif] = useState({message: null})

  useEffect(() => {
    personsService.getAll().then(ps => { setPersons(ps) })
  }, [])

  const addNumber = (event) => {
    event.preventDefault()

    let idx = persons.findIndex((x) => x.name === newName)
    if (idx === -1) {
      let newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
      personsService
        .create(newPerson)
        .then(np => {
          setPersons(persons.concat(np))
          setNotif({ message: `Added ${newName}`, isError: false })
          setTimeout(() => setNotif({ message: null}), 5000)
        })
    } else {
      // alert(`${newName} is already added to phonebook`)
      let newPerson = {...persons[idx], number: newNumber }
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(newPerson).then(data => {
          setPersons(persons.map(p => (p.id !== newPerson.id) ? p : newPerson))
          setNotif({ message: `Updated ${newName}`, isError: false })
          setTimeout(() => setNotif({ message: null }), 5000)
        })
        .catch(error => {
          setPersons(persons.filter(p => (p.id !== newPerson.id)))
          setNotif({ message: `Information of ${newName} has already been removed from server`, isError: true })
          setTimeout(() => setNotif({ message: null }), 5000)
        })
      }
    }
  }

  const filteredPersons = () => {
    let filterValue2 = filterValue.toLowerCase()
    return persons.filter(p => p.name.toLowerCase().includes(filterValue2) )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif.message} isError={notif.isError} />
      <Filter value={filterValue} onChange={(event) => setFilterValue(event.target.value)} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} addNumber={addNumber} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons()} setPersons={setPersons} />
    </div>
  )
}

export default App
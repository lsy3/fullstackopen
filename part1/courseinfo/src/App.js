const Header = (prop) => {
  return (
    <h1>{ prop.course }</h1>
  )
}

const Part = (prop) => {
  return (
    <p>
      {prop.part.name} {prop.part.exercises}
    </p>
  )
}

const Content = (prop) => {
  return (
    <div>
      {prop.parts.map(x => <Part part={x} />)}
    </div>
  )
}

const Total = (prop) => {
  return (
    <p>Number of exercises { prop.parts.map(x => x.exercises).reduce( (x, y) => x + y) }</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
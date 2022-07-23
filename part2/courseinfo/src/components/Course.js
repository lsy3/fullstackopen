const Header = ({ course }) => <h3>{course}</h3>

const Total = ({ sum }) => <p><b>total of {sum} exercises</b></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) =>
   <>
      {parts.map(p => <Part key={p.id} part={p} />)}
   </>

const Course = ({ course }) => {
   return (
      <div>
         <Header course={course.name} />
         <Content parts={course.parts} />
         <Total sum={course.parts.map(p => p.exercises).reduce((x, y) => x + y)} />
      </div>
   )
}

export default Course
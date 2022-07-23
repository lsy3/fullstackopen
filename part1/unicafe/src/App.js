import { useState } from 'react'

const StatisticLine = ({ text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0)
  {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else
  {
    return (
      <table><tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={100 * (good / total)} unit="%" />
      </tbody></table>
    )
  }
}

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>give feedback</h3>
      <Button label="good" onClick={() => setGood(good + 1)}/>
      <Button label="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button label="bad" onClick={() => setBad(bad + 1)} />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
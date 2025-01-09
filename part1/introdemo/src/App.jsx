import { useState } from "react"

const App = () => {

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [clickHistory, setClickHistory] = useState([])
  const [totalCLicks, setTotalClicks] = useState(0)

  const handleLeftClick = () => {
    setLeft(left + 1)
    setClickHistory(clickHistory.concat('L'))
    // Total will lag behind one value
    // Because the component will only rerendered after all code inside the handler executed
    // So left inside here will stay the same for each call
    setTotalClicks(left + right)
  }

  const handleRightClick = () => {
    setRight(right + 1)
    setClickHistory(clickHistory.concat('R'))
    // Total will lag behind one value
    // Because the component will only rerendered after all code inside the handler executed
    // So left inside here will stay the same for each call
    setTotalClicks(left + right)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='Left' />
      <Button onClick={handleRightClick} text='Right' />
      {right}
      <History clickHistory={clickHistory} />
      <p>Total clicks(lagging one): {totalCLicks}</p>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button type="button" onClick={onClick}>{text}</button>
)

const History = ({ clickHistory }) => {
  if (clickHistory.length === 0) {
    return (
      <div>
        The app is use by pressing the buttons
      </div>
    )
  } else {
    return (
      <div>
        Buttons press hitory: {clickHistory.join(' ')}
      </div>
    )
  }
}

export default App
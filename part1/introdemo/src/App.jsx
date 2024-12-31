const Hello = (props) => {
  console.log(props);
  return (
    <p>Hello World from {props.name}. I am {props.age} years old.</p>
  )
}

const App = () => {
  const name = "Lysa";
  const age = 0;
  const now = new Date();
  const friends = ["Sam", "Lysa"];
  return (
    <div>
      <Hello name="Lic" age={36} />
      <Hello name="Ly" age={36} />
      <Hello name="Sam" age={4} />
      <Hello name={name} age={age} />
      <p>Hello world. The time is {now.toString()}.</p>
      <p>{friends}</p>
    </div>
  )
}

export default App
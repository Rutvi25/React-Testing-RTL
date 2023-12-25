import { Counter } from '../components/Counter';

export default function Home() {
  return (
    <div>
      <h1>Learning React Testing</h1>
      <Counter description='My Counter' defaultCount={0} />
    </div>
  );
}

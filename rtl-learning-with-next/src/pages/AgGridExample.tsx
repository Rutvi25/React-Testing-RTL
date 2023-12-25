import { AgGrid } from '../components/mocking/AgGrid/AgGrid';

export default function AgGridExample() {
  return (
    <div>
      <h1>AgGrid Example!</h1>
      <AgGrid
        onMoney={(money) => {
          alert(money);
        }}
      />
    </div>
  );
}

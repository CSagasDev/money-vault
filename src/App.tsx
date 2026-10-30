import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db/index.ts'

async function agregarBanco(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim()
  if (name === '') return
  await db.banks.add({ id: crypto.randomUUID(), name })
}

function App() {
  const banks = useLiveQuery(async () => {
    const lista = await db.banks.toArray()
    return lista.sort((a, b) => a.name.localeCompare(b.name, 'es'))
  })

  return (
    <main>
      <h1>Bancos</h1>

      <form action={agregarBanco}>
        <input name="name" placeholder="Nombre del banco" required />
        <button type="submit">Agregar</button>
      </form>

      {banks === undefined ? (
        <p>Cargando…</p>
      ) : banks.length === 0 ? (
        <p>Todavía no hay bancos.</p>
      ) : (
        <ul>
          {banks.map((bank) => (
            <li key={bank.id}>{bank.name}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App

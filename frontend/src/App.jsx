import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import './App.css'

function App() {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['all-transactions'], queryFn: async ()=> {
    return fetch("http://localhost:3001/transactions").then(response => response.json())
  }})

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch("http://localhost:3001/transactions", {method: "POST",
        headers: {
          "content-type": "application/json; charset=utf-8"
        }, body: JSON.stringify({
        amount,
        description
      })})

      queryClient.invalidateQueries({
        queryKey: ['all-transactions']
      })
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <textarea type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type='submit'>
          Submit
        </button>
      </form>
      <div>
        <h2>
          All transactions
        </h2>
        {query.isPending && <div>
          Loading transactions...
          </div>}
          {
            query.data?.lenght > 0 && <div>
          {query.data.map(transaction => (
            <div key={transaction.amount}>
              <p>{transaction.amount}</p>
              <p>{transaction.description}</p>
            </div>
          ))}
        </div>
          }
      </div>
    </div>
  )
}

export default App

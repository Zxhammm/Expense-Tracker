import { useState, useEffect, useMemo } from "react";
import { nativeToScVal } from "@stellar/stellar-sdk";
import { useContract } from "./hooks/useContract";

const categories = ["Food", "Transport", "Shopping", "Salary", "Other"];

export default function App() {
  const {
    publicKey,
    isWalletConnected,
    connectWallet,
    disconnectWallet,
    readContract,
    writeContract,
    txLoading,
  } = useContract();

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    if (publicKey) loadExpenses();
  }, [publicKey]);

  async function loadExpenses() {
    try {
      const data = await readContract("get_expenses", [
        nativeToScVal(publicKey, { type: "address" }),
      ]);
      setExpenses(data || []);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  }

  async function handleCreate() {
    if (!title || !amount) return;

    await writeContract("create_expense", [
      nativeToScVal(publicKey, { type: "address" }),
      nativeToScVal(title, { type: "string" }),
      nativeToScVal(Number(amount), { type: "i64" }),
      nativeToScVal(category, { type: "string" }),
    ]);

    setTitle("");
    setAmount("");
    setCategory("Food");
    loadExpenses();
  }

  async function handleDelete(id) {
    await writeContract("delete_expense", [
      nativeToScVal(publicKey, { type: "address" }),
      nativeToScVal(id, { type: "u64" }),
    ]);
    loadExpenses();
  }

  const total = useMemo(
    () => expenses.reduce((a, b) => a + Number(b.amount), 0),
    [expenses]
  );

  const format = (n) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-xl font-bold">💳 Keuangan</h1>

          {!isWalletConnected ? (
            <button onClick={connectWallet} className="bg-indigo-600 text-white px-3 py-1 rounded-xl">
              Connect
            </button>
          ) : (
            <button onClick={disconnectWallet} className="text-sm text-gray-500">
              Disconnect
            </button>
          )}
        </div>

        {/* BALANCE */}
        {isWalletConnected && (
          <>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-2xl mb-5">
              <p className="text-sm opacity-80">Saldo</p>
              <h2 className="text-2xl font-bold">{format(total)}</h2>
              <p className="text-xs mt-2">{publicKey.slice(0,6)}...</p>
            </div>

            {/* FORM */}
            <div className="bg-white p-4 rounded-xl shadow mb-5">
              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Judul"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />

              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Jumlah (+income / -expense)"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />

              <select
                className="w-full border p-2 mb-3 rounded"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>

              <button
                onClick={handleCreate}
                className="w-full bg-indigo-600 text-white py-2 rounded"
                disabled={txLoading}
              >
                {txLoading ? "Processing..." : "Tambah"}
              </button>
            </div>

            {/* LIST */}
            <div className="space-y-2">
              {expenses.length === 0 ? (
                <p className="text-center text-gray-400">Belum ada data</p>
              ) : (
                expenses.map((e) => (
                  <div key={e.id} className="bg-white p-3 rounded shadow flex justify-between">
                    <div>
                      <p className="font-medium">{e.title}</p>
                      <p className="text-xs text-gray-400">{e.category}</p>
                    </div>

                    <div className="text-right">
                      <p className={e.amount > 0 ? "text-green-500":"text-red-500"}>
                        {e.amount > 0 ? "+" : ""}{format(e.amount)}
                      </p>

                      <button
                        onClick={()=>handleDelete(e.id)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
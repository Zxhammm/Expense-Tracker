#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, String, Vec, Address};

#[contracttype]
#[derive(Clone)]
pub struct Expense {
    pub id: u64,
    pub title: String,
    pub amount: i64,
    pub category: String,
}

#[contracttype]
pub enum DataKey {
    Expenses(Address),
    Counter(Address),
}

#[contract]
pub struct ExpenseContract;

#[contractimpl]
impl ExpenseContract {

    // ======================
    // GET
    // ======================
    pub fn get_expenses(env: Env, user: Address) -> Vec<Expense> {
        env.storage()
            .instance()
            .get(&DataKey::Expenses(user))
            .unwrap_or(Vec::new(&env))
    }

    // ======================
    // CREATE
    // ======================
    pub fn create_expense(
        env: Env,
        user: Address,
        title: String,
        amount: i64,
        category: String,
    ) {
        user.require_auth();

        let mut expenses: Vec<Expense> = env.storage()
            .instance()
            .get(&DataKey::Expenses(user.clone()))
            .unwrap_or(Vec::new(&env));

        let mut id: u64 = env.storage()
            .instance()
            .get(&DataKey::Counter(user.clone()))
            .unwrap_or(0);

        id += 1;

        env.storage()
            .instance()
            .set(&DataKey::Counter(user.clone()), &id);

        expenses.push_back(Expense {
            id,
            title,
            amount,
            category,
        });

        env.storage()
            .instance()
            .set(&DataKey::Expenses(user), &expenses);
    }

    // ======================
    // DELETE
    // ======================
    pub fn delete_expense(env: Env, user: Address, id: u64) {
        user.require_auth();

        let mut expenses: Vec<Expense> = env.storage()
            .instance()
            .get(&DataKey::Expenses(user.clone()))
            .unwrap_or(Vec::new(&env));

        for i in 0..expenses.len() {
            if expenses.get(i).unwrap().id == id {
                expenses.remove(i);
                env.storage().instance().set(&DataKey::Expenses(user), &expenses);
                return;
            }
        }
    }
}














/* --- CONTOH SCRIPT ---

pub fn get_notes(env: Env) -> Vec<Note> {
    // 1. ambil data notes dari storage
    return env.storage().instance().get(&NOTE_DATA).unwrap_or(Vec::new(&env));
}

// Fungsi untuk membuat note baru
pub fn create_note(env: Env, title: String, content: String) -> String {
    // 1. ambil data notes dari storage
    let mut notes: Vec<Note> = env.storage().instance().get(&NOTE_DATA).unwrap_or(Vec::new(&env));
    
    // 2. Buat object note baru
    let note = Note {
        id: env.prng().gen::<u64>(),
        title: title,
        content: content,
    };
    
    // 3. tambahkan note baru ke notes lama
    notes.push_back(note);
    
    // 4. simpan notes ke storage
    env.storage().instance().set(&NOTE_DATA, &notes);
    
    return String::from_str(&env, "Notes berhasil ditambahkan");
}

// Fungsi untuk menghapus notes berdasarkan id
pub fn delete_note(env: Env, id: u64) -> String {
    // 1. ambil data notes dari storage 
    let mut notes: Vec<Note> = env.storage().instance().get(&NOTE_DATA).unwrap_or(Vec::new(&env));

    // 2. cari index note yang akan dihapus menggunakan perulangan
    for i in 0..notes.len() {
        if notes.get(i).unwrap().id == id {
            notes.remove(i);

            env.storage().instance().set(&NOTE_DATA, &notes);
            return String::from_str(&env, "Berhasil hapus notes");
        }
    }

    return String::from_str(&env, "Notes tidak ditemukan")
}


*/
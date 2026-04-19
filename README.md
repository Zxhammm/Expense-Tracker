# Expense Tracker DApp (Stellar Soroban)

**Expense Tracker DApp** is a decentralized financial tracking application built on the Stellar blockchain using the Soroban Smart Contract SDK. This application allows users to manage their income and expenses securely, transparently, and without relying on centralized systems.

---

## Project Description

Expense Tracker DApp is a full-stack decentralized application (DApp) designed to help users record and monitor their financial activities directly on the blockchain. Unlike traditional finance apps that rely on centralized databases, this system leverages smart contracts to ensure that all data is stored in a secure, immutable, and transparent manner.

The backend is powered by a Soroban smart contract written in Rust, which handles all business logic such as storing, retrieving, and deleting financial records. The frontend is built using React.js, providing a clean and responsive user interface for interacting with the blockchain.

Each user’s data is uniquely associated with their wallet address, ensuring that:
- Only the owner can access and modify their data
- No third party can tamper with records
- Data integrity is guaranteed by the blockchain

All transactions are permanently recorded on-chain, making them verifiable and resistant to manipulation.

---

## Project Vision

Our goal is to redefine personal finance management by introducing decentralization and transparency into everyday financial tracking tools.

We envision a system that is:

- **Decentralized**: Eliminates reliance on centralized servers and third-party control
- **Trustless**: Operates entirely through smart contract logic without requiring trust in a central authority
- **Secure**: Uses cryptographic wallet authentication to protect user data
- **Immutable**: Ensures that recorded transactions cannot be altered or forged
- **Accessible**: Provides a simple and intuitive interface for all users
- **Transparent**: Allows users to verify their own data directly on the blockchain

---

## Key Features

### 1. Expense & Income Management
- Add both income (+) and expense (-) transactions
- Store essential data including:
  - Title (description)
  - Amount (positive or negative)
  - Category
- Categorization system:
  - Food
  - Transport
  - Shopping
  - Salary
  - Other

---

### 2. Blockchain-Based Storage
- All data is stored on the Stellar blockchain via Soroban smart contracts
- Each user has isolated storage linked to their wallet address
- Automatic ID generation using a per-user counter
- No centralized database involved

---

### 3. Real-Time Data Retrieval
- Fetch all transactions in a single smart contract call
- Instant synchronization between frontend and blockchain state
- Efficient data structure for rendering in UI

---

### 4. Secure Transaction Deletion
- Delete transactions using their unique ID
- Requires wallet authentication (`require_auth()`)
- Immediate update to blockchain storage

---

### 5. Wallet Integration & Authentication
- Connect and disconnect Stellar wallet بسهولة
- Uses public key as unique user identifier
- Secure authorization via blockchain signature
- Ensures only the owner can perform write operations

---

### 6. Balance Calculation
- Automatically calculates total balance
- Based on sum of all transactions:
  - Positive values = Income
  - Negative values = Expenses
- Displayed in real-time on the dashboard

---

### 7. Clean and Responsive UI
- Built with React.js and Tailwind CSS
- Minimalist and user-friendly interface
- Mobile-friendly layout
- Visual indicators:
  - Green = Income
  - Red = Expense

---

## Contract Details

- **Contract Address**:  
  `CA4I47KYOIAXI452PMM4BBZKKLHHPSCYCRA2DVJZYTUBQVZ2CP5JOWGB`

![Smart Contract](smartcontract.png)

---

## Frontend Preview

![Frontend Preview](frontend.png)

---
### Data Structure

```rust
pub struct Expense {
    pub id: u64,
    pub title: String,
    pub amount: i64,
    pub category: String,
}

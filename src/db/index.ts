import { Dexie, type Table } from 'dexie'
import type {
    Account,
    Bank,
    CreditCard,
    InstallmentPlan,
    Movement,
    MovementLine,
    Settings,
    Wallet,
} from './model.ts'

export const db = new Dexie('money-vault') as Dexie & {
  banks: Table<Bank, string>
  accounts: Table<Account, string>
  creditCards: Table<CreditCard, string>
  wallets: Table<Wallet, string>
  movements: Table<Movement, string>
  movementLines: Table<MovementLine, string>
  installmentPlans: Table<InstallmentPlan, string>
  settings: Table<Settings, string>
}

// Solo se declaran la llave primaria y los campos por los que se busca.
// Para cambiar el esquema se agrega db.version(2); nunca se edita una versión publicada.
db.version(1).stores({
  banks: 'id',
  accounts: 'id, bankId, cardId',
  creditCards: 'id, bankId',
  wallets: 'id, accountId',
  movements: 'id, [date+createdAt]',
  movementLines: 'id, movementId, accountId, walletId',
  installmentPlans: 'id, cardAccountId, walletId',
  settings: 'id',
})

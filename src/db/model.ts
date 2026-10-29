// Montos en centavos enteros: 2849.66 → 284966. Nunca decimales para dinero.
export type Cents = number

// Fechas como texto ISO: '2026-10-15' (un día) o '2026-10-15T14:30:00.000Z' (un momento).
export type IsoDate = string

export type Currency = 'GTQ' | 'USD'

export interface Bank {
  id: string
  name: string
}

interface AccountBase {
  id: string
  name: string
  currency: Currency
  archived: boolean
}

// Cada tipo de cuenta solo admite su combinación de banco y tarjeta.
// El saldo de una tarjeta es negativo cuando se debe: −50000 = deuda de 500.00.
export type Account = AccountBase &
  (
    | { type: 'cash'; bankId: null; cardId: null }
    | { type: 'savings' | 'checking'; bankId: string; cardId: null }
    | { type: 'credit_card'; bankId: string; cardId: string }
  )

export interface CreditCard {
  id: string
  bankId: string
  name: string
  limit: Cents
  cutoffDay: number // día del mes, 1-31
  paymentDay: number
}

interface WalletBase {
  id: string
  accountId: string
  name: string
  targetAmount: Cents | null
  createdAt: IsoDate
}

export type Wallet = WalletBase &
  (
    | { status: 'active'; completedAt: null }
    | { status: 'completed'; completedAt: IsoDate }
  )

export interface Movement {
  id: string
  date: IsoDate // el día del movimiento: '2026-10-15'
  createdAt: IsoDate // el momento de la captura; ordena los del mismo día
  type:
    | 'opening'
    | 'income'
    | 'expense'
    | 'allocation'
    | 'transfer'
    | 'card_payment'
    | 'installment_charge'
    | 'wallet_close'
  description: string
}

export interface MovementLine {
  id: string
  movementId: string
  accountId: string
  walletId: string | null // null = Sin asignar
  amount: Cents // con signo: + entra, − sale
}

export interface InstallmentPlan {
  id: string
  cardAccountId: string
  walletId: string
  description: string
  totalAmount: Cents
  installmentCount: number
  installmentAmount: Cents // lo que cobra el banco; la última cuota absorbe los centavos
  startDate: IsoDate
}

export interface Settings {
  id: 'app' // una sola fila
  exchangeRate: number // quetzales por 1 USD, p. ej. 7.75
}

import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";
import {BankingAccount} from "./BankingAccount";


export class CheckingAccount extends BankingAccount{
    accountHistory: Transaction[];

    constructor(public balance: number, public currentDate: Date, public accountType: string){
        super(balance, currentDate, accountType);
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountType = accountType;
    }

}
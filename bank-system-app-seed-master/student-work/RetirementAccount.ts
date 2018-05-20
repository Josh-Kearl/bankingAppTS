import {Account} from "../common/interfaces/Account";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";
import {BankingAccount} from "./BankingAccount";

export class RetirementAccount extends BankingAccount {
    constructor(public balance: number, public currentDate: Date, public accountHolderBirthDate: Date, public accountType: string){
        super(balance, currentDate, accountType);
        this.balance = balance;
        this.currentDate = currentDate;
        this.accountHolderBirthDate = accountHolderBirthDate;
        this.accountType = accountType;
    }



}
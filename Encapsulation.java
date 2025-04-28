class SavingsAccount {
    private double currentAmount;

    public void addMoney(double money) {
        if(money > 0) currentAmount += money;
    }

    public double checkBalance() {
        return currentAmount;
    }
}

public class Encapsulation {
    public static void main(String[] args) {
        SavingsAccount myAccount = new SavingsAccount();
        myAccount.addMoney(500);
        System.out.println(myAccount.checkBalance());
    }
}
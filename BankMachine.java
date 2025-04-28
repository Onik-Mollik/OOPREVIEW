import java.util.Scanner;

public class BankMachine {
    private double accountFunds = 1000.0;

    public void addFunds(double amount) {
        accountFunds += amount;
    }

    public void removeFunds(double amount) {
        if (amount <= accountFunds) {
            accountFunds -= amount;
        } else {
            System.out.println("Not enough money in account!");
        }
    }

    public void displayBalance() {
        System.out.println("Available Funds: " + accountFunds);
    }

    public static void main(String[] args) {
        BankMachine cashMachine = new BankMachine();
        Scanner inputReader = new Scanner(System.in);

        while(true) {
            System.out.println("\n1. Add Money 2. Take Out Money 3. Check Balance 4. Quit");
            int option = inputReader.nextInt();

            switch(option) {
                case 1:
                    System.out.println("Enter amount:");
                    cashMachine.addFunds(inputReader.nextDouble());
                    break;
                case 2:
                    System.out.println("Enter amount:");
                    cashMachine.removeFunds(inputReader.nextDouble());
                    break;
                case 3:
                    cashMachine.displayBalance();
                    break;
                case 4:
                    System.exit(0);
            }
        }
    }
}
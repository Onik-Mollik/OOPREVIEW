import java.util.Scanner;

public class calculator {
    public static void main(String[] args) {
        Scanner reader = new Scanner(System.in);

        System.out.println("Enter first number:");
        double a = reader.nextDouble();

        System.out.println("Enter second number:");
        double b = reader.nextDouble();

        System.out.println("Choose operation (+, -, *, /):");
        char operator = reader.next().charAt(0);

        double answer = 0;

        switch(operator) {
            case '+': answer = a + b; break;
            case '-': answer = a - b; break;
            case '*': answer = a * b; break;
            case '/':
                if(b != 0)
                    answer = a / b;
                else
                    System.out.println("Cannot divide by zero!");
                break;
            default: System.out.println("Invalid operation");
        }

        System.out.println("Result: " + answer);
    }
}
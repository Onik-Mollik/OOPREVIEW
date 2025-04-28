class Car {
    String color;
    int speed;

    void drive() {
        System.out.println(color + " car driving at " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.color = "Red";
        myCar.speed = 100;
        myCar.drive();
    }
}
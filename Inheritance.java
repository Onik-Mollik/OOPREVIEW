class cow {
    protected String type = "cow";

    void display() {
        System.out.println("This is a cow.");
    }
}

class Dog extends cow {
    void bark() {
        System.out.println(type + " says Woof!");
    }
}

public class Inheritance {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.display();
        d.bark();
    }
}
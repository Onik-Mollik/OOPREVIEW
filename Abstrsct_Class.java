abstract class Creature {
    abstract void speak();

    void rest() {
        System.out.println("Resting...");
    }
}

class Canine extends Creature {
    void speak() {
        System.out.println("Woof Woof");
    }
}

public class Abstrsct_Class{
    public static void main(String[] args) {
        Canine myPet = new Canine();
        myPet.speak();
        myPet.rest();
    }
}
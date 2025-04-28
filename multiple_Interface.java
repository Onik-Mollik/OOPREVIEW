interface CanFly {
    void takeFlight();
}

interface CanSwim {
    void goSwimming();
}

class Waterfowl implements CanFly, CanSwim {
    public void takeFlight() {
        System.out.println("Waterfowl is flying...");
    }

    public void goSwimming() {
        System.out.println("Waterfowl is swimming...");
    }
}

public class multiple_Interface {
    public static void main(String[] args) {
        Waterfowl bird = new Waterfowl();
        bird.takeFlight();
        bird.goSwimming();
    }
}
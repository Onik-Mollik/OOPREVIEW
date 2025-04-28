class Person {
    private String name;


    public Person(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }


    public void setName(String newName) {
        if (newName != null && !newName.isEmpty()) {
            name = newName;
        }
    }
}

public class Main {
    public static void main(String[] args) {

        Person person = new Person("Alice");


        System.out.println("Name: " + person.getName());


        person.setName("Bob");

      
        System.out.println("Updated name: " + person.getName());
    }
}
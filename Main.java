import model.User;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        DatabaseManager dbManager = new DatabaseManager();

        // Create and add a new user
        User newUser = new User("Rahim", "Rahim@example.com");
        boolean added = dbManager.addUser(newUser);
        System.out.println("User added: " + added);
        System.out.println("New user ID: " + newUser.getId());

        // Get all users
        List<User> users = dbManager.getAllUsers();
        System.out.println("\nAll Users:");
        users.forEach(System.out::println);

        // Get a specific user
        if (!users.isEmpty()) {
            int userId = users.get(0).getId();
            User user = dbManager.getUserById(userId);
            System.out.println("\nUser with ID " + userId + ":");
            System.out.println(user);

            // Update the user
            user.setEmail("newemail@example.com");
            boolean updated = dbManager.updateUser(user);
            System.out.println("\nUser updated: " + updated);

            // Verify update
            User updatedUser = dbManager.getUserById(userId);
            System.out.println("Updated user:");
            System.out.println(updatedUser);

          /*  // Delete the user
            boolean deleted = dbManager.deleteUser(userId);
            System.out.println("\nUser deleted: " + deleted);

            // Verify deletion
            User deletedUser = dbManager.getUserById(userId);
            System.out.println("User after deletion: " + deletedUser);

           */
        }
    }
}
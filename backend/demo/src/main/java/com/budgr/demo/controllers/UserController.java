package com.budgr.demo.controllers;

import com.budgr.demo.dto.BalanceDTO;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.UserRepository;
import com.budgr.demo.services.ExpenseService;
import com.budgr.demo.services.IncomeService;
import com.budgr.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {

        this.userService = userService;

    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /*@PostMapping("/login")
    public User loginUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return userService.loginUser(email, password);
    }*/

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    /*@GetMapping("/{id}/balance")
    public BalanceDTO getUserBalance(@PathVariable Long id) {
        User user = userService.findById(id); // <-- make sure this returns User, not Long
        Long remaining = userService.getUserBalance(user.getId());

        return new BalanceDTO(
                user.getId(),
                remaining
        );
    }*/

    @GetMapping("/me")
    public User getCurrentUser(@AuthenticationPrincipal UserDetails principal) {
        if (principal == null) return null;
        return userService.findByEmail(principal.getUsername()).orElse(null);
    }







}

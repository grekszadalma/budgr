package com.budgr.demo.services;

import com.budgr.demo.models.Budget;
import com.budgr.demo.models.Expense;
import com.budgr.demo.models.User;
import com.budgr.demo.repositories.BudgetRepository;
import com.budgr.demo.repositories.ExpenseRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock ExpenseRepository expenseRepository;
    @Mock BudgetRepository budgetRepository;
    @Mock CurrentUserService currentUserService;

    @InjectMocks ExpenseService expenseService;

    @Test
    void createExpense_sets_user_date_and_budget_when_category_present() {
        User user = new User();
        user.setId(UUID.randomUUID());
        when(currentUserService.get()).thenReturn(user);

        Budget food = new Budget();
        food.setId(UUID.randomUUID());
        food.setName("Food");

        when(budgetRepository.findByUserAndName(user, "Food")).thenReturn(Optional.of(food));
        when(expenseRepository.save(any(Expense.class))).thenAnswer(inv -> inv.getArgument(0));

        Expense saved = expenseService.createExpense("Carrefour", 12.5, "Lunch", "Food");

        assertThat(saved.getUser()).isSameAs(user);
        assertThat(saved.getCompany()).isEqualTo("Carrefour");
        assertThat(saved.getAmount()).isEqualTo(12.5);
        assertThat(saved.getDescription()).isEqualTo("Lunch");
        assertThat(saved.getDate()).isNotNull();
        assertThat(saved.getBudget()).isSameAs(food);

        verify(budgetRepository).findByUserAndName(user, "Food");
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void createExpense_does_not_set_budget_when_category_null() {
        User user = new User();
        when(currentUserService.get()).thenReturn(user);

        when(expenseRepository.save(any(Expense.class))).thenAnswer(inv -> inv.getArgument(0));

        Expense saved = expenseService.createExpense("Carrefour", 12.5, "Lunch", null);

        assertThat(saved.getBudget()).isNull();
        verifyNoInteractions(budgetRepository);
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void createExpense_does_not_set_budget_when_category_blank() {
        User user = new User();
        when(currentUserService.get()).thenReturn(user);

        when(expenseRepository.save(any(Expense.class))).thenAnswer(inv -> inv.getArgument(0));

        Expense saved = expenseService.createExpense("Carrefour", 12.5, "Lunch", "   ");

        assertThat(saved.getBudget()).isNull();
        verifyNoInteractions(budgetRepository);
        verify(expenseRepository).save(any(Expense.class));
    }

    @Test
    void createExpense_throws_when_category_not_found() {
        User user = new User();
        when(currentUserService.get()).thenReturn(user);

        when(budgetRepository.findByUserAndName(user, "Food")).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                expenseService.createExpense("Carrefour", 12.5, "Lunch", "Food")
        ).isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Budget not found");

        verify(budgetRepository).findByUserAndName(user, "Food");
        verifyNoInteractions(expenseRepository); // pas de save si budget introuvable
    }

    @Test
    void getAllExpenses_delegates_to_repository() {
        List<Expense> expected = List.of(new Expense(), new Expense());
        when(expenseRepository.findAll()).thenReturn(expected);

        List<Expense> result = expenseService.getAllExpenses();

        assertThat(result).isSameAs(expected);
        verify(expenseRepository).findAll();
    }

    @Test
    void getExpensesByUserEmail_delegates_to_repository() {
        when(expenseRepository.findByUserEmail("x@y.com")).thenReturn(List.of(new Expense()));

        List<Expense> result = expenseService.getExpensesByUserEmail("x@y.com");

        assertThat(result).hasSize(1);
        verify(expenseRepository).findByUserEmail("x@y.com");
    }

    @Test
    void getExpencesByUser_delegates_to_repository() {
        User user = new User();
        List<Expense> expected = List.of(new Expense());
        when(expenseRepository.findAllByUser(user)).thenReturn(expected);

        List<Expense> result = expenseService.getExpencesByUser(user);

        assertThat(result).isSameAs(expected);
        verify(expenseRepository).findAllByUser(user);
    }

    @Test
    void removeExpense_deletes_by_current_user_and_id() {
        UUID userId = UUID.randomUUID();
        UUID expenseId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        when(currentUserService.get()).thenReturn(user);

        expenseService.removeExpense(expenseId);

        verify(expenseRepository).deleteExpenseByUserIdAndId(userId, expenseId);
    }

    @Test
    void getExpensesForBudgetThisMonth_calls_repo_with_user_and_budgetName_and_dates() {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        when(currentUserService.get()).thenReturn(user);

        when(expenseRepository.findMonthlyExpensesByUserAndBudget(eq(userId), eq("Food"), any(), any()))
                .thenReturn(List.of(new Expense()));

        List<Expense> result = expenseService.getExpensesForBudgetThisMonth("Food");

        assertThat(result).hasSize(1);

        ArgumentCaptor<LocalDateTime> startCap = ArgumentCaptor.forClass(LocalDateTime.class);
        ArgumentCaptor<LocalDateTime> endCap = ArgumentCaptor.forClass(LocalDateTime.class);

        verify(expenseRepository).findMonthlyExpensesByUserAndBudget(eq(userId), eq("Food"), startCap.capture(), endCap.capture());

        assertThat(startCap.getValue()).isBefore(endCap.getValue());
    }

    @Test
    void getExpensesForCurrentMonth_calls_repo_with_user_and_dates() {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        when(currentUserService.get()).thenReturn(user);

        when(expenseRepository.findMonthlyExpensesByUser(eq(userId), any(), any()))
                .thenReturn(List.of(new Expense(), new Expense()));

        List<Expense> result = expenseService.getExpensesForCurrentMonth();

        assertThat(result).hasSize(2);

        ArgumentCaptor<LocalDateTime> startCap = ArgumentCaptor.forClass(LocalDateTime.class);
        ArgumentCaptor<LocalDateTime> endCap = ArgumentCaptor.forClass(LocalDateTime.class);

        verify(expenseRepository).findMonthlyExpensesByUser(eq(userId), startCap.capture(), endCap.capture());
        assertThat(startCap.getValue()).isBefore(endCap.getValue());
    }
}

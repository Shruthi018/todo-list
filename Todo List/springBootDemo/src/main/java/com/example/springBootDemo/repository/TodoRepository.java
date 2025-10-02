package com.example.springBootDemo.repository;

import com.example.springBootDemo.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

// CRUD - Create Read Update Delete
public interface TodoRepository extends JpaRepository<Todo, Long> {

}

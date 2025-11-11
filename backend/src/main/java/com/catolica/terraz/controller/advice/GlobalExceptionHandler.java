package com.catolica.terraz.controller.advice;

import com.catolica.terraz.exception.tractowner.TractOwnerDeletionConflictException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.URI;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(TractOwnerDeletionConflictException.class)
    public ResponseEntity<ProblemDetail> handleTractOwnerDeletionConflict(TractOwnerDeletionConflictException ex, HttpServletRequest req) {
        var pd = ProblemDetail.forStatus(HttpStatus.CONFLICT);
        pd.setTitle("Conflito de deleção");
        pd.setDetail(ex.getMessage());
        pd.setType(URI.create("urn:error:owner-has-dependents"));
        pd.setInstance(URI.create(req.getRequestURI()));
        pd.setProperty("code", ex.code());
        pd.setProperty("conflict", ex.details());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(pd);
    }
}

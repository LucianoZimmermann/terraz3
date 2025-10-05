package com.catolica.terraz.repository;

import com.catolica.terraz.model.Tract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TractRepository extends JpaRepository<Tract, Long> {}

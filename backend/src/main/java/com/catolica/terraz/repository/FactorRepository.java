package com.catolica.terraz.repository;

import com.catolica.terraz.model.Factor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactorRepository extends JpaRepository<Factor, Long> {}

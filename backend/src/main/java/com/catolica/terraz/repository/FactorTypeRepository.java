package com.catolica.terraz.repository;

import com.catolica.terraz.enums.FactorTypeEnum;
import com.catolica.terraz.model.FactorType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FactorTypeRepository extends JpaRepository<FactorType, Long> {
    Optional<FactorType> findByFactorTypeEnum(FactorTypeEnum factorTypeEnum);
}

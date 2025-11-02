package com.catolica.terraz.repository;

import com.catolica.terraz.model.ThirdParty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThirdPartyRepository extends JpaRepository<ThirdParty, Long> {

    @Query("select tp from ThirdParty tp join fetch tp.factorType")
    List<ThirdParty> findAllWithFactorType();
}

package com.catolica.terraz.repository;

import com.catolica.terraz.model.Factor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FactorRepository extends JpaRepository<Factor, Long> {

    @Query("""
           select f
           from Factor f
           where f.quote.id = :quoteId
             and f.factorType.id = :factorTypeId
           """)
    Factor findByQuoteIdAndFactorTypeId(Long quoteId, Long factorTypeId);

    List<Factor> findByQuoteId(Long quoteId);
}

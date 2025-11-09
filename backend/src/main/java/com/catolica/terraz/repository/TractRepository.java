package com.catolica.terraz.repository;

import com.catolica.terraz.model.Tract;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TractRepository extends JpaRepository<Tract, Long> {
    @Query("select count(t) from Tract t where t.tractOwner.id = :ownerId")
    long countByTractOwnerId(@Param("ownerId") Long ownerId);

    @Query("select t.id from Tract t where t.tractOwner.id = :ownerId")
    List<Long> findIdsByTractOwnerId(@Param("ownerId") Long ownerId);

    @Modifying
    @Query("delete from Tract t where t.tractOwner.id = :ownerId")
    int deleteByTractOwnerId(@Param("ownerId") Long ownerId);
}

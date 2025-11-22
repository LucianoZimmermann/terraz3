package com.catolica.terraz.repository;

import com.catolica.terraz.dto.tract.TractAddressItem;
import com.catolica.terraz.model.Tract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TractRepository extends JpaRepository<Tract, Long> {

    long countByTractOwnerId(Long ownerId);
    void deleteByTractOwnerId(Long ownerId);

    @Query("""
    select new com.catolica.terraz.dto.tract.TractAddressItem(
        t.id,
        t.street,
        t.cep
    )
    from Tract t
    where t.tractOwner.id = :ownerId
    order by t.id
""")
    List<TractAddressItem> findTractAddressesByOwnerId(@Param("ownerId") Long ownerId);
}

package com.catolica.terraz.repository;

import com.catolica.terraz.model.TractOwner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TractOwnerRepository extends JpaRepository<TractOwner, Long> {}

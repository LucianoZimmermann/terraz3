package com.catolica.terraz.dto.tractowner;

import com.catolica.terraz.dto.tract.TractAddressItem;

import java.util.List;

public record TractOwnerDeletionConflictDetails(
        Long ownerId,
        long tractsCount,
        List<TractAddressItem> tracts
) {}

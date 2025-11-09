package com.catolica.terraz.dto;

import java.util.List;

public record TractOwnerDeletionConflictDTO(
        Long ownerId,
        long tractsCount,
        List<Long> tractIds
) {}

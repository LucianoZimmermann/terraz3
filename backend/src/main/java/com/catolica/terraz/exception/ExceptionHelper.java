package com.catolica.terraz.exception;

import com.catolica.terraz.dto.tract.TractAddressItem;
import com.catolica.terraz.dto.tractowner.TractOwnerDeletionConflictDetails;
import com.catolica.terraz.exception.tractowner.TractOwnerDeletionConflictException;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public final class ExceptionHelper {
    private ExceptionHelper() {
    }

    public static TractOwnerDeletionConflictException ownerDeletionConflict(
            Long ownerId, long tractsCount, List<TractAddressItem> tracts) {
        var details = new TractOwnerDeletionConflictDetails(ownerId, tractsCount, tracts);
        return new TractOwnerDeletionConflictException(details);
    }

    public static EntityNotFoundException notFoundException (String entity, Long id){
        return new EntityNotFoundException(entity + id + " não encontrado");
    }
}

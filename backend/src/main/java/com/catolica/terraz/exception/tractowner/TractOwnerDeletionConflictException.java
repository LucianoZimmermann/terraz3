package com.catolica.terraz.exception.tractowner;

import com.catolica.terraz.dto.tractowner.TractOwnerDeletionConflictDetails;
import com.catolica.terraz.exception.ApiException;

public final class TractOwnerDeletionConflictException extends ApiException {
    private final TractOwnerDeletionConflictDetails details;

    public TractOwnerDeletionConflictException(TractOwnerDeletionConflictDetails details) {
        super("OWNER_HAS_DEPENDENTS", "Owner possui dependentes");
        this.details = details;
    }

    public TractOwnerDeletionConflictDetails details() {
        return details;
    }
}

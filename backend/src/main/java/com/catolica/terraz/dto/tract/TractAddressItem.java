package com.catolica.terraz.dto.tract;

import lombok.*;

@Builder
public record TractAddressItem(Long tractId, String street, String cep) {}

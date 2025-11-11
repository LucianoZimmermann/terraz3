package com.catolica.terraz.dto;

import lombok.*;

@Builder
public record TractAddressItem(Long tractId, String street, String cep) {}

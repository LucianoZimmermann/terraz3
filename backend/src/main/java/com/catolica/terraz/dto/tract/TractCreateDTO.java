package com.catolica.terraz.dto.tract;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TractCreateDTO {

    @NotNull
    private Float squareMeters;

    private Long tractOwnerId;

    @NotNull
    private Long neighborhoodId;

    private String street;

    private String number;

    private String city;

    private String state;

    private String cep;
}

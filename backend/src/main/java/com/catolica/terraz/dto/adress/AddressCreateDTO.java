package com.catolica.terraz.dto.adress;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressCreateDTO {

    private String street;

    private String number;

    private String city;

    @Size(max = 2)
    private String state;

    private String cep;

    @NotNull
    private Long neighborhoodId;
}

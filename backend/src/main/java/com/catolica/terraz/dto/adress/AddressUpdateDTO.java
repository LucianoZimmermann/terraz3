package com.catolica.terraz.dto.adress;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AddressUpdateDTO {
    private Long id;

    private String street;
    private String number;
    private String city;
    private String state;
    private String cep;
    private Long neighborhoodId;
}

package com.catolica.terraz.dto.adress;

import com.catolica.terraz.dto.NeighborhoodDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDTO {
  private Long id;
  private String street;
  private String number;
  private String city;
  private NeighborhoodDTO neighborhood;
  private String state;
  private String cep;
}

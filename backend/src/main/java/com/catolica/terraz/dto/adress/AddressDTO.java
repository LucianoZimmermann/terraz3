package com.catolica.terraz.dto;

import com.catolica.terraz.model.Neighborhood;
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
  private Neighborhood neighborhood;
  private String state;
  private String cep;
}

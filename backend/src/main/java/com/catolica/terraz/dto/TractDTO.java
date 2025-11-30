package com.catolica.terraz.dto;

import com.catolica.terraz.dto.tractowner.TractOwnerDTO;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TractDTO {
  private Long id;
  private Float squareMeters;
  private String street;
  private String number;
  private String city;
  private String neighborhood;
  private String state;
  private String cep;
  private TractOwnerDTO tractOwner;
}

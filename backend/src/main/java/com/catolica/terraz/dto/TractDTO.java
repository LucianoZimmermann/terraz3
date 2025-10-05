package com.catolica.terraz.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TractDTO {
  private Long id;
  private Float squareMeters;
  private AddressDTO address;
  private TractOwnerDTO tractOwner;
}

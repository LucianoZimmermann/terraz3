package com.catolica.terraz.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceFactorDTO {
  private Long id;
  private Double factor;
}

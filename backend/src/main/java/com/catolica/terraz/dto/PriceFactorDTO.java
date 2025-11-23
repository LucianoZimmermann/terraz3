package com.catolica.terraz.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PriceFactorDTO {
  private Long id;
  private BigDecimal factor;
}

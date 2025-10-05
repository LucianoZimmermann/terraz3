package com.catolica.terraz.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NeighborhoodDTO {
  private Long id;
  private String name;
  private BigDecimal priceFactor;
}

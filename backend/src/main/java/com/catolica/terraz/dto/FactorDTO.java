package com.catolica.terraz.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FactorDTO {
  private Long id;
  private Long quoteId;
  private Long thirdPartyId;
  private BigDecimal price;
  private Long factorTypeId;
}

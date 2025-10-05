package com.catolica.terraz.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FactorDTO {
  private Long id;
  private Long quoteId;
  private Long thirdPartyId;
  private Double materialCost;
  private Double laborCost;
  private Long factorTypeId;
}

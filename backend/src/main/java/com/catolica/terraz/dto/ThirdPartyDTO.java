package com.catolica.terraz.dto;

import com.catolica.terraz.model.FactorType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ThirdPartyDTO {
  private Long id;
  private String name;
  private String cnpj;
  private FactorType factorTypeId;
}

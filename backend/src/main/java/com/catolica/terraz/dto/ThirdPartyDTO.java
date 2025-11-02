package com.catolica.terraz.dto;

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
  private FactorTypeDTO factorType;
}

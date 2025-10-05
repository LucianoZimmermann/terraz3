package com.catolica.terraz.dto;

import com.catolica.terraz.enums.FactorTypeEnum;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FactorTypeDTO {
  private Long id;
  private FactorTypeEnum factorTypeEnum;
}

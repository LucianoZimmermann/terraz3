package com.catolica.terraz.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TractOwnerDTO {
  private Long id;
  private String name;
  private String cpf;
}

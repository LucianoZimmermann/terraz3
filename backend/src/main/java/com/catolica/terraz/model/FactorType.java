package com.catolica.terraz.model;

import com.catolica.terraz.enums.FactorTypeEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "factor_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FactorType {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "factor_type")
  private FactorTypeEnum factorTypeEnum;
}

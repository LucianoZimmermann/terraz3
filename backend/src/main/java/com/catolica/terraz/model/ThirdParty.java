package com.catolica.terraz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "third_parties")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ThirdParty {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @Column(nullable = false)
  private String name;

  private String cnpj;

  @NotNull
  @Column(nullable = false)
  private String phone;

  private String contactName;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "factor_type_id")
  private FactorType factorType;
}

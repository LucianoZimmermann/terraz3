package com.catolica.terraz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "factors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Factor {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "quote_id")
  private Quote quote;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "third_party_id")
  private ThirdParty thirdParty;

  @NotNull private BigDecimal price;

  @NotNull
  @ManyToOne
  @JoinColumn(name = "factor_type_id")
  private FactorType factorType;
}

package com.catolica.terraz.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.*;

@Entity
@Table(name = "quotes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "tract_id")
  private Tract tract;

  @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL, orphanRemoval = true)
  @NotNull
  private List<Factor> factorList;

  private BigDecimal totalFactorsPrice;

  private BigDecimal lotCount;

  private BigDecimal tractOwnerLotCount;

  private BigDecimal pricePerLot;

  private BigDecimal totalProfit;

  private BigDecimal totalLiquidProfit;

  private BigDecimal markup;

  @NotNull private LocalDateTime createDate;
}
